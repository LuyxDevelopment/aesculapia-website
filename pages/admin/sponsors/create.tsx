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

const AdminCreateSponsors: NextPage<{ user: { email: string, has2faEnabled: boolean; }; }> = ({ user }) => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });

	const router = useRouter();

	const onSubmit = async (data: FieldValues, event?: BaseSyntheticEvent): Promise<void> => {
		event?.preventDefault();

		try {
			const req = await fetch('/api/sponsors', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					imageURL: data.imageurl,
					name: data.name,
					url: data.url,
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
					text: 'Product is succesvol aangemaakt!',
				});

				await router.push('/admin/webshop/');
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
			{useMetaData('Aesculapia Admin | Sponsors', 'Aesculapia Admin | Sponsors', '/admin')}
			<Layout>
				<div className='container relative'>
					<div className='top-10 left-14 sm:left-20'>
						<div className='flex flex-wrap w-56 sm:w-96'>
							<h1 className='text-5xl pb-2 font-bold text-black'>
								Een sponsor toevoegen.
							</h1>
							<p className='text-xl text-black'>
								Voeg een bedrijfssponsor toe voor weergave op de homepage.
							</p>
						</div>
						<div className='flex flex-wrap h-auto text-xl mt-3'>
							<form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
								<div className='flex flex-wrap -mx-3'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-product-name'>
											Naam sponsor
										</label>
										<input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-product-name' type='text' placeholder='Luyx' minLength={1} maxLength={64} required {...register('name', { required: true })} />
									</div>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-product-price'>
											Sponsor afbeelding URL
										</label>
										<input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-product-price' type='text' placeholder='https://images.com/image.png' {...register('imageurl', { required: true })} />
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-image-url'>
											Sponsor Media URL
										</label>
										<input className='appearance-none block w-96 bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-image-url' type='text' placeholder='https://instagram.com/aesculapia' minLength={1} maxLength={1024} required {...register('url', { required: true })} />
									</div>
								</div>
								<div>
									<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-900'>
										<input className='cursor-pointer' type='submit' value='Maak'></input>
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

export default AdminCreateSponsors;