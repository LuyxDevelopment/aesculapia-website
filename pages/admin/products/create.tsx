import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { BaseSyntheticEvent } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Layout from '../../../components/Layout';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { AdminProps } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';

const AdminCreateProducts: NextPage<{ user: { email: string, has2faEnabled: boolean; }; }> = ({ user }) => {

	useMetaData('Aesculapia', 'Products', '/admin');

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
				console.log('ok');
			} else if (req.status === 401) {
				console.log('error');
			}
		} catch (error) {
			// for debugging purposes
			console.error(error);
		}
	};

	return (
		<>
			<Layout>
				<div className='container relative'>
					<div className='top-10 left-14 sm:left-20 text-white'>
						<div className='flex flex-wrap w-56 sm:w-96'>
							<h1 className='text-3xl pb-2 font-bold text-black'>
								Create a Product.
							</h1>
							<p className='text-xl text-black'>
								Create a product to sell here.
							</p>
						</div>
						<div className='flex flex-wrap h-auto text-xl mt-3'>
							<form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
								<div className="flex flex-wrap -mx-3">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-product-name">
											Product Name
										</label>
										<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-name" type="text" placeholder="Chocolate" minLength={1} maxLength={64} required {...register('name', { required: true })} />
									</div>
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-product-price">
											Product Price
										</label>
										<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-price" type="text" placeholder="5.31" {...register('price', { required: true })} />
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-2">
									<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-image-url">
											Image URL
										</label>
										<input className="appearance-none block w-96 bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-image-url" type="text" placeholder="https://example.com/image.png (square images recommended)" minLength={1} maxLength={1024} required {...register('imageurl', { required: true })} />
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-stock">
											Product Stock
										</label>
										<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white" id="grid-stock" type="text" placeholder="10" defaultValue={0} min={0} required {...register('stock', { required: true })} />
									</div>
								</div>
								<div>
									<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-900'>
										<input className="cursor-pointer" type='submit' value='Create'></input>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
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