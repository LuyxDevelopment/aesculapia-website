import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import { OrderDocument } from '../../../src/models/Order.js';
import OrderCard from '../../../components/OrderCard';
import Loader from '../../../components/Loader';
import ErrorPage from '../../../components/Error';

const AdminOrderIndex: NextPage = () => {
	useMetaData('Admin', 'Admin Orders', '/admin');

	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch('/api/orders')
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);
				setLoading(false);
			});
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (!data) {
		return <ErrorPage />;
	}

	return (
		<>
			<Layout>
				<div className='container'>
					<h1 className='text-4xl font-bold mb-5'>All Orders</h1>
					<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{(data as OrderDocument[]).map((order, i) => {
							return (
								<OrderCard order={order} key={i} />
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default AdminOrderIndex;

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