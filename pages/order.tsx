import { Elements } from '@stripe/react-stripe-js';
import Layout from '../components/Layout';
import { loadStripe } from '@stripe/stripe-js';
import PaymentStatus from '../components/PaymentStatus';
import { NextPage } from 'next';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Order: NextPage = () => {
	return (
		<Layout>
			<Elements stripe={stripePromise}>
				<PaymentStatus />
			</Elements>
		</Layout>
	);
};

export default Order;