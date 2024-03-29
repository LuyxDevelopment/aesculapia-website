import { withIronSessionSsr } from 'iron-session/next';
import { NextPage, NextPageContext } from 'next';
import OrderPage from '../../../components/OrderPage';
import { AdminProps } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';
import { Stripe } from 'stripe';
import { IEntry } from '../../../src/models/Event';

interface Props {
	order: Stripe.PaymentIntent & { metadata: { entry: IEntry; }; };
}

const AdminOrdersDynamic: NextPage<Props> = ({ order }) => {
	return (
		<OrderPage order={order}></OrderPage>
	);
};

export default AdminOrdersDynamic;

export const getServerSideProps = withIronSessionSsr(async function ({ req, resolvedUrl }): Promise<AdminProps> {
	// const orderRequest = await fetch(
	// 	`${process.env.NEXT_PUBLIC_DOMAIN}/api/stripe/payouts/${req}`,
	// );

	// const res = (await req.json()) as ResponseData<EventDocument>;

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
				destination: `/admin/login?from=${encodeURIComponent(resolvedUrl)}`,
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