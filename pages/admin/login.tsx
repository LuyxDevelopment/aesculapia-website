import { BaseSyntheticEvent, useState } from 'react';
import Layout from '../../components/Layout';
import Toast from '../../components/Toast';
import { useMetaData } from '../../lib/hooks/useMetaData';
import { useForm } from 'react-hook-form';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../src/util/ironConfig';
import { useRouter } from 'next/router';

type FieldValues = {
	email: string;
	password: string;
} | { [x: string]: unknown; };

export default function AdminLogin(): JSX.Element {
	const [isAllowed, setIsAllowed] = useState(false);
	const [twoFactorAuthCode, setTwoFactorAuthCode] = useState('');
	const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string; }>({ type: 'success', text: '' });
	const [isVisible, setIsVisible] = useState(false);
	const router = useRouter();

	const [twoFactorAuthValid, setTwoFactorAuthValid] = useState(false);

	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = async (data: FieldValues, event?: BaseSyntheticEvent): Promise<void> => {
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
				await router.push('/admin/settings');
				setMessage({ type: 'info', text: 'You must enable 2FA to login!' });
			}
		} catch (error) {
			// for debugging purposes
			console.error(error);
			setMessage({ type: 'error', text: 'An unexpected error occured!' });
			clearMessage();
		}
	};

	const submit2FA = async (): Promise<void> => {
		const req = await fetch('/api/auth/2fa/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code: twoFactorAuthCode }),
		});

		const data = await req.json();

		if (data.data) return setTwoFactorAuthValid(true);
		setTwoFactorAuthValid(false);
	};

	const clearMessage = (): NodeJS.Timeout =>
		setTimeout(() => {
			setMessage({ type: 'success', text: '' });
		}, 3000);

	return (
		<>
			{useMetaData('Login', 'nonstop language', '/admin/login')}
			<Layout>
				<div className='select-none'>

					{!isAllowed && (
						<form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
							<div className='flex flex-col items-center text-center font-bold'>
								<div className='pb-3'>
									<label className='font-bold text-2xl'>Email</label>
									<br />
									<input
										type='email'
										placeholder='user@example.com'
										className={
											errors.email
												? 'border-2 border-red-600 rounded-md w-52 h-10 pl-2'
												: 'border-2 rounded-md w-52 h-10 pl-2'
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
										placeholder='********'
										className={
											errors.password
												? 'border-2 border-red-600 rounded-md w-52 h-10 pl-2'
												: 'border-2 rounded-md w-52 h-10 pl-2'
										}
										{...register('password', { required: true })}
									/>
									<span
										className='-ml-6 cursor-pointer'
										onClick={(): void => setIsVisible(!isVisible)}
									>
										{isVisible ? '👁' : '👁'}
									</span>
									{errors.password && (
										<p className='font-semibold text-red-600'>
											Password is required.
										</p>
									)}
								</div>
								<button
									type='submit'
									className='w-20 h-10 bg-emerald-500 text-white font-bold text-md rounded-lg hover:bg-emerald-700'
								>
									Login
								</button>
							</div>
						</form>
					)}
					{isAllowed && (
						<div>
							<label className='font-bold text-2xl'>2FA Code</label>
							<br />
							<input type="text" onChange={(e): void => setTwoFactorAuthCode(e.target.value)} />
							<button className='bg-green-500' onClick={submit2FA}>enter</button>
							<p className='text-black'>{twoFactorAuthValid ? 'Valid code.' : 'Invalid code.'}</p>
						</div>
					)}

				</div>
				{message.text !== '' && (
					<Toast type={message.type} title={message.type[0].toUpperCase() + message.type.slice(1)} description={message.text} />
				)}
			</Layout>
		</>
	);
}

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