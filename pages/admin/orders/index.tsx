import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';

import ErrorPage from '../../../components/Error';
import Layout from '../../../components/Layout';
import OrderCard from '../../../components/OrderCard';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { IOrder, OrderDocument } from '../../../src/models/Order';
import { Product } from '../../../src/models/Product';
import { AdminProps, ResponseData } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';

interface Props {
	data: (IOrder & { _id: string })[];
}

const AdminOrderIndex: NextPage<Props> = ({ data }) => {

	return (
		<>
			{useMetaData('Admin Orders', 'Admin Orders Page', '/admin/orders')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<>
						<div className="container flex flex-row">
							<div className="mb-12">
								<h1 className="text-4xl font-bold mb-5">Winkelwagen</h1>
								<div className="grid grid-cols-1 divide-y w-[35rem] sm:w-[40rem] md:w-[39rem] lg:w-[60rem]">
									{data.map((order, i) => {
										return (
											<OrderCard
												order={order}
												key={i}
											></OrderCard>
										);
									})}
								</div>
							</div>
							<div className="flex flex-row">
								<div className="sticky top-0 z-50">
									<h1 className="text-4xl font-bold mb-5">Winkelwagen</h1>
								</div>
							</div>
						</div>
					</>
				)}
			</Layout>
		</>
	);
};

export default AdminOrderIndex;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }): Promise<AdminProps<OrderDocument>> {
	const user = req.session.user;

	res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const orderRequest = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/orders`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const orderResponse = await orderRequest.json(); // as ResponseData<OrderDocument | OrderDocument[]>;

	orderResponse.data?.push({_id: 'slkhdbfskdbfa', delivered: true, email: 'bla@gmail.com', firstName: 'Ricky', lastName: 'Mooky', issuedAt: Date.now(), product: [{imageURL:'urmom',name:'urmom',price:500,stock: 5}], receivedAt: Date.now()});
	orderResponse.data?.push({_id: 'slkhdbfskdbfa', delivered: false, email: 'bla@gmail.com', firstName: 'Fyry', lastName: 'Mooky', issuedAt: Date.now(), product: [{imageURL:'urmom',name:'urmom',price:500,stock: 5}], receivedAt: Date.now()});
	orderResponse.data?.push({_id: 'slkhdbfskdbfa', delivered: true, email: 'bla@gmail.com', firstName: 'Seppy', lastName: 'Mooky', issuedAt: Date.now(), product: [{imageURL:'urmom',name:'urmom',price:500,stock: 5}], receivedAt: Date.now()});
	orderResponse.data?.push({_id: 'slkhdbfskdbfa', delivered: false, email: 'bla@gmail.com', firstName: 'Deccy', lastName: 'Mooky', issuedAt: Date.now(), product: [{imageURL:'urmom',name:'urmom',price:500,stock: 5}], receivedAt: Date.now()});
	
	
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
				data: orderResponse.data,
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
		props: { 
			user: req.session.user,
			data: orderResponse.data,
		},
	};
}, ironOptions);