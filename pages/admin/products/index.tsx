import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import ProductCard from '../../../components/ProductCard';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { ProductDocument } from '../../../src/models/Product.js';
import ErrorPage from '../../../src/util/error';
import { ironOptions } from '../../../src/util/ironConfig';
import LoadingPage from '../../../src/util/loading';

const AdminProducts: NextPage = () => {
	useMetaData('Admin', 'Admin products', '/admin');

	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch('/api/products')
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);
				setLoading(false);
			});
	}, []);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!data) {
		return <ErrorPage />;
	}

	return (
		<>
			<Layout>
				<div className="container">
					<h1 className="text-4xl font-bold mb-5">All Products</h1>
					<div className="grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{(data as ProductDocument[]).map((product, i) => {
							return (
								<ProductCard product={product} key={i} />
							);
						})}
					</div>
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

export default AdminProducts;
