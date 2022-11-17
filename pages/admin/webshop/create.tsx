import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { BaseSyntheticEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Layout from '../../../components/Layout';
import Toast from '../../../components/Toast';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { AdminProps } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';

const AdminCreateProducts: NextPage<{ user: { email: string, has2faEnabled: boolean; }; }> = ({ user }) => {
	const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string; }>({ type: 'success', text: '' });
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = async (data: FieldValues, event?: BaseSyntheticEvent): Promise<void> => {
		event?.preventDefault();
		console.log(data);
		try {
			const req = await fetch('/api/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					imageURL: data.imageurl,
					name: data.name,
					price: data.price,
					stock: data.stock,
					user,
				}),
			});
			if (req.ok) {
				setMessage({ type: 'success', text: 'Product was successfully created!' });
			} else if (req.status === 401) {
				setMessage({ type: 'error', text: 'There was an error creating the product.' });
			}
		} catch (error) {
			console.error(error);
			setMessage({ type: 'error', text: 'An unexpected error occured.' });
			clearMessage();
		}
	};

	const clearMessage = (): NodeJS.Timeout =>
		setTimeout(() => {
			setMessage({ type: 'success', text: '' });
		}, 3000);

	return (
		<>
			{useMetaData('Aesculapia Admin | Webshop', 'Aesculapia Admin | Webshop', '/admin')}
			<Layout>
				<div className='container relative mb-8'>
					<div className='top-10 left-14 sm:left-20 text-white'>
						<div className='flex flex-wrap w-56 sm:w-96'>
							<h1 className='text-5xl pb-2 font-bold text-black'>
								Maak een product.
							</h1>
							<p className='text-xl text-black'>
								Maak een product om op de webshop te verkopen.
							</p>
						</div>
						<div className='flex flex-wrap h-auto text-xl mt-3'>
							<form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
								<div className="flex flex-wrap -mx-3">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-product-name">
											Productnaam
										</label>
										<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-name" type="text" placeholder="Chocolate" minLength={1} maxLength={64} required {...register('name', { required: true })} />
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-product-price">
											Product Prijs
										</label>
										<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-price" type="number" step={.01} placeholder="5.31" {...register('price', { required: true })} />
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-2">
									<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-image-url">
											Afbeelding URL
										</label>
										<input className="appearance-none block w-96 bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-image-url" type="text" placeholder="https://example.com/image.png (square images recommended)" minLength={1} maxLength={1024} required {...register('imageurl', { required: true })} />
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-stock">
											Product Voorraad
										</label>
										<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white" id="grid-stock" type="text" placeholder="10" defaultValue={0} min={0} required {...register('stock', { required: true })} />
									</div>
								</div>
								<div className='pb-9'>
									<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-900'>
										<input className="cursor-pointer" type='submit' value='Maak'></input>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				{message.text !== '' && (
					<Toast type={message.type} title={message.type[0].toUpperCase() + message.type.slice(1)} description={message.text} />
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }): Promise<AdminProps> {
	const user = req.session.user;

	if (user?.email) {
		const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/2fa/generate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const json = await request.json();

		if (json.data) return {
			props: {
				user: { email: user.email, has2faEnabled: true, completed2fa: false },
				otpAuthUri: json.data,
			},
		};
		return {
			props: {
				user: { email: user.email, has2faEnabled: false, completed2fa: false },
				otpAuthUri: '',
			},
		};
	}

	if (!user) {
		return {
			props: {
				user: { email: '', has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: '/admin/login',
				permanent: false,
			},
		};
	}

	if (!user.has2faEnabled) {
		return {
			props: {
				user: { email: user.email, has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: '/admin/settings',
				permanent: false,
			},
		};
	}

	return {
		props: { user: req.session.user },
	};
}, ironOptions);

export default AdminCreateProducts;