import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/CheckoutForm';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import Cookies from 'js-cookie';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout: NextPage = () => {
	const [clientSecret, setClientSecret] = useState('');
	const [paymentIntent, setPaymentIntent] = useState('');

	useEffect(() => {
		const items = JSON.parse(Cookies.get('cart') ?? '[]');
		if (!items.length) return;

		fetch('/api/stripe/create_payment_intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items: items }),
		})
			.then((res) => res.json())
			.then((data) => {
				setPaymentIntent(data.data.id);
				setClientSecret(data.data.clientSecret);
			}).catch(console.error);
	}, []);

	return (
		<>
			{useMetaData('Kassa', 'Kassa', '/kassa')}
			<Layout>
				{clientSecret.length ? (
					<Elements options={{ clientSecret, appearance: { theme: 'flat', variables: { colorPrimary: '#EF4444' } }, loader: 'always' }} stripe={stripePromise}>
						<CheckoutForm paymentIntent={paymentIntent} />
					</Elements>
				) :
					(<div className='container'>
						<h1 className='text-5xl my-5'>Je winkelwagentje is leeg.</h1>
						<p className='text-2xl'> Maak een selectie in de <button className='text-red-500 hover:text-red-600 duration-300' onClick={(): string => window.location.href = '/webshop'}>webshop</button>.</p>
					</div>)}
			</Layout>
		</>
	);
};

export default Checkout;