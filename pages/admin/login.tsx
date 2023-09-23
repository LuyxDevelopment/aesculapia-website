import { NextPage } from 'next';
import { BaseSyntheticEvent, useState } from 'react';
import Layout from '../../components/Layout';
import Toast, { clearMessage } from '../../components/Toast';
import { useMetaData } from '../../lib/hooks/useMetaData';
import { useForm } from 'react-hook-form';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../src/util/ironConfig';
import { useRouter } from 'next/router';

type FieldValues =
	| {
		email: string;
		password: string;
	}
	| { [x: string]: unknown; };

const Index: NextPage = () => {
	const [isAllowed, setIsAllowed] = useState(false);
	const [twoFactorAuthCode, setTwoFactorAuthCode] = useState('');
	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });
	const [isVisible, setIsVisible] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (
		data: FieldValues,
		event?: BaseSyntheticEvent,
	): Promise<void> => {
		event?.preventDefault();
		try {
			const req = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: data.email, password: data.password }),
			});
			if (req.ok) {
				setIsAllowed(true);
				setMessage({ type: 'info', text: 'Please put in your 2FA code!' });
			} else if (req.status === 401) {
				await router.push('/admin');
				setMessage({ type: 'info', text: 'You must enable 2FA to login!' });
			} else if (req.status === 400) {
				setMessage({ type: 'error', text: 'Invalid email or password!' });
				clearMessage(setMessage);
			}
		} catch (error) {
			setMessage({ type: 'error', text: 'An unexpected error occured!' });
			clearMessage(setMessage);
		}
	};

	const submit2FA = async (): Promise<void> => {
		if (twoFactorAuthCode.length < 6) {
			setMessage({ type: 'error', text: 'Invalid code!' });
			clearMessage(setMessage);
			return;
		}
		const req = await fetch('/api/auth/2fa/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code: twoFactorAuthCode }),
		});

		const data = await req.json();

		if (data.data) {
			router.push((router.query.from && decodeURIComponent(router.query.from as string)) ?? '/admin/');
			setMessage({ type: 'success', text: 'Valid code!' });
			clearMessage(setMessage);
			return;
		}
		setMessage({ type: 'error', text: 'Invalid code!' });
		clearMessage(setMessage);
		return;

	};

	return (
		<>
			{useMetaData('Aesculapia Admin | Login', 'Login Page', '/admin/login')}
			<Layout>
				<div className='select-none m-10'>
					{!isAllowed && (
						<form
							onSubmit={handleSubmit((data, event) => onSubmit(data, event))}
						>
							<div className='flex flex-col items-center text-center font-bold'>
								<div className='pb-3'>
									<label className='font-bold text-2xl'>Email</label>
									<br />
									<input
										type='email'
										placeholder='user@example.com'
										className={
											errors.email
												? 'border-2 border-red-600 rounded-lg w-52 h-10 pl-2'
												: 'border-2 rounded-lg w-52 h-10 pl-2'
										}
										{...register('email', { required: true })}
									/>
									{errors.email && (
										<p className='font-semibold text-red-600'>
											Email is required.
										</p>
									)}
								</div>
								<div className='pb-3'>
									<label className='font-bold text-2xl'>Password</label>
									<br />
									<input
										type={isVisible ? 'text' : 'password'}
										placeholder='*********'
										className={
											errors.password
												? 'border-2 border-red-600 rounded-lg w-52 h-10 pl-2'
												: 'border-2 rounded-lg w-52 h-10 pl-2'
										}
										{...register('password', { required: true })}
									/>
									<span
										className='-ml-6 cursor-pointer'
										onClick={(): void => setIsVisible(!isVisible)}
									>
										{!isVisible ? '👁' : '✖'}
									</span>
									{errors.password && (
										<p className='font-semibold text-red-600'>
											Password is required.
										</p>
									)}
								</div>
								<button
									type='submit'
									className='w-20 h-10 bg-emerald-500 text-gray-50 font-bold text-md rounded-lg hover:bg-emerald-700'
								>
									Login
								</button>
							</div>
						</form>
					)}
					{isAllowed && (
						<div>
							<label className='font-bold text-2xl'>
								Please fill-in your 2FA Code
							</label>
							<br />
							<br />
							<input
								type='text'
								placeholder='XXXXXX'
								className={'border-2 rounded-lg w-52 h-10 pl-2'}
								onChange={(e): void => setTwoFactorAuthCode(e.target.value)}
							/>
							<button
								className='bg-emerald-500 text-gray-50 h-10 rounded-lg ml-3 w-16 font-semibold'
								onClick={submit2FA}
							>
								Submit
							</button>
						</div>
					)}
				</div>
				{message.text !== '' && (
					<Toast
						type={message.type}
						title={message.type[0].toUpperCase() + message.type.slice(1)}
						description={message.text}
					/>
				)}
			</Layout>
		</>
	);
};

export default Index;

export const getServerSideProps = withIronSessionSsr(function ({ req }) {
	const user = req.session.user;

	if (user?.email) {
		return {
			redirect: {
				destination: '/admin/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}, ironOptions);
