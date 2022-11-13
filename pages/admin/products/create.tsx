import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Layout from '../../../components/Layout';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { ironOptions } from '../../../src/util/ironConfig';

const AdminCreateProducts: NextPage = () => {

	useMetaData('Aesculapia', 'Products', '/admin');

	return (
		<>
			<Layout>
				<div className="relative">
					<div className="absolute top-10 left-14 sm:left-20 text-white">
						<div className="flex flex-wrap w-56 sm:w-96">
							<h1 className="text-3xl pb-2 font-bold text-black">
								Create a Product.
							</h1>
							<p className="text-xl text-black">
								Create a product to sell here.
							</p>
						</div>
					</div>
				</div>
				<div className='container relative'>
					<form name='product' method='post'>
						<div>
							<label>Product Name</label>
							<input type='text' name='name' className='shadow-md' required />
						</div>
						<div>
							<label>Product Description</label>
							<input type='text' name='description' className='shadow-md' required />
						</div>
						<div>
							<label>Product Image URL</label>
							<input type='text' name='imageURL' className='shadow-md' required />
						</div>
						<div>
							<label>Product Price</label>
							<input type='number' name='price' className='shadow-md' required />
						</div>
						<div>
							<label>Product Stock</label>
							<input type='number' name='stock' className='shadow-md' required />
						</div>
						<div>
							<input type="submit" value="Create" formAction='http://localhost:3000/api/products' formTarget='_parent'></input>
						</div>
					</form>
				</div>

			</Layout>
		</>
	);
};

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
	const user = req.session.user;

	if (user?.email) {
		const request = await fetch('http://localhost:3000/api/auth/2fa/generate', {
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