import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/CheckoutForm';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const Checkout: NextPage = () => {
	const [clientSecret, setClientSecret] = useState('');

	useEffect(() => {
		const item = window.localStorage.getItem('cart');
		if (!item) return;
		fetch('/api/stripe/create_payment_intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items: item }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.data));
	}, [setClientSecret]);


	return (
		<Layout>
			{clientSecret && (
				<Elements options={{clientSecret, appearance: { theme: 'flat', variables: { colorPrimary: '#EF4444' } }}} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
			{!clientSecret && (
				<p>no client secret</p>
			)}
		</Layout>
	);
};

export default Checkout;