import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { BaseSyntheticEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Layout from '../../../components/Layout';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { AdminProps } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';
import { useRouter } from 'next/router';
import Toast, { clearMessage } from '../../../components/Toast';

const AdminCreateMembers: NextPage<{ user: { email: string, has2faEnabled: boolean; }; }> = ({ user }) => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });

	const router = useRouter();

	const onSubmit = async (data: FieldValues, event?: BaseSyntheticEvent): Promise<void> => {
		event?.preventDefault();

		try {
			const req = await fetch('/api/members', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: data.name,
					email: data.email,
					paymentMethod: data.paymentmethod,
					memberId: data.memberid,
					ldc: data.ldc,
				}),
			}).catch(e => {
				console.log(e);
				setMessage({
					type: 'error',
					text: 'Er was een fout bij het maken van het product.',
				});
			});

			if (req && req.ok) {
				setMessage({
					type: 'success',
					text: 'Lid succesvol aangemaakt!',
				});

				await router.push('/admin/leden');
			}
		} catch (error) {
			console.error(error);
			setMessage({
				type: 'error',
				text: 'Er is een onverwachte fout opgetreden.',
			});

			clearMessage(setMessage);
		}
	};

	return (
		<>
			{useMetaData(
				'Aesculapia Admin | Webshop',
				'Aesculapia Admin | Webshop',
				'/admin',
			)}
			<Layout>
				<div className='container relative mb-8'>
					<div className='top-10 left-14 sm:left-20'>
						<div className='flex flex-wrap w-56 sm:w-96'>
							<h1 className='text-5xl pb-2 font-bold text-black'>
								Maak een lid.
							</h1>
							<p className='text-xl text-black'>
								Maak een product om op de webshop te verkopen.
							</p>
						</div>
						<div className='flex flex-wrap h-auto text-xl mt-3'>
							<form
								onSubmit={handleSubmit((data, event) => onSubmit(data, event))}
							>
								<div className='flex flex-wrap -mx-3'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
											htmlFor='grid-member-name'
										>
											Naam lid
										</label>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
											id='grid-member-name'
											type='text'
											placeholder='Bob Johnson'
											minLength={1}
											maxLength={64}
											required
											{...register('name', { required: true })}
										/>
									</div>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
											htmlFor='grid-member-price'
										>
											Email
										</label>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
											id='grid-member-price'
											type='text'
											placeholder='example@gmail.com'
											required
											{...register('email', { required: true })}
										/>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
										<label
											className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
											htmlFor='grid-image-url'
										>
											Betaalwijze
										</label>
										<input
											className='appearance-none block w-96 bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											id='grid-image-url'
											type='text'
											placeholder='bancontact, cash'
											minLength={1}
											maxLength={1024}
											required
											{...register('paymentmethod', { required: true })}
										/>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-6'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
											htmlFor='grid-lidnummer'
										>
											Lidnummer
										</label>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white'
											id='grid-lidnummer'
											type='text'
											placeholder='#12345'
											required
											{...register('memberid', { required: true })}
										/>
									</div>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
											htmlFor='grid-ldc'
										>
											LDC
										</label>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white'
											id='grid-ldc'
											type='text'
											placeholder='A1232452'
											required
											{...register('ldc', { required: true })}
										/>
									</div>
								</div>
								<div className='pb-9'>
									<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800'>
										<input
											className='cursor-pointer'
											type='submit'
											value='Maak'
										></input>
									</button>
								</div>
							</form>
						</div>
					</div>
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

// eslint-disable-next-line require-await
export const getServerSideProps = withIronSessionSsr(async function ({ req, resolvedUrl }): Promise<AdminProps> {
	const user = req?.session.user;

	if (!user) {
		return {
			props: {
				user: { email: '', has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: `/admin/login?from=${encodeURIComponent(resolvedUrl)}`,
				permanent: false,
			},
		};
	}

	return {
		props: { user: req.session.user },
	};
}, ironOptions);

export default AdminCreateMembers;