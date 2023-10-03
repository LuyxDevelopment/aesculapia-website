import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';

import ErrorPage from '../../../components/Error';
import Layout from '../../../components/Layout';
import OrderCard from '../../../components/OrderCard';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { AdminProps, ResponseData } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';
import { Stripe } from 'stripe';

interface Props {
	data: Stripe.PaymentIntent[];
}

const AdminOrderIndex: NextPage<Props> = ({ data }) => {

	return (
		<>
			{useMetaData('Bestelgeschiedenis', 'Bestelgeschiedenis', '/admin/bestellingen')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<>
						<div className='container flex flex-row'>
							<div className='mb-12'>
								<h1 className='text-4xl font-bold mb-5'>Bestelgeschiedenis</h1>
								<div className='grid grid-cols-1 divide-y w-[35rem] sm:w-[40rem] md:w-[39rem] lg:w-[60rem]'>
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
						</div>
					</>
				)}
			</Layout>
		</>
	);
};

export default AdminOrderIndex;

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async function ({ req, res, resolvedUrl }): Promise<AdminProps<Stripe.PaymentIntent[]>> {
	const user = req.session.user;

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

	const payoutRequest = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stripe/orders`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const orderResponse = await payoutRequest.json() as ResponseData<Stripe.PaymentIntent[]>;

	return {
		props: {
			user: req.session.user,
			data: orderResponse.data,
		},
	};
}, ironOptions);