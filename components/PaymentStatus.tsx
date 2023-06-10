import { useState, useEffect, FC } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import OrderCartItem from './OrderCartItem';

interface PaymentData {
	amount: number,
	last4: number,
	postalCode: string,
	country: string,
	type: string,
	customer: {
		name: string,
		email: string,
	},
}

const PaymentStatus: FC = () => {
	const stripe = useStripe();
	const [data, setData] = useState<PaymentData>({
		amount: 0,
		last4: 1234,
		postalCode: '',
		country: '',
		type: '',
		customer: {
			email: '',
			name: '',
		},
	});
	const [cart, setCart] = useState([]);
	const [message, setMessage] = useState('');
	const [redirect, setRedirect] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) return setRedirect(true);
		if (typeof window === undefined) return setRedirect(true);
		if (!window.localStorage.getItem('cart')) return setRedirect(true);

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }) => {
				switch (paymentIntent?.status) {
					case 'succeeded':
						setMessage('Success! Payment received.');
						fetch('/api/stripe/payment_success', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ paymentIntent: paymentIntent.id, items: window.localStorage.getItem('cart') }),
						}).then((req) => {
							if (req.ok) window.localStorage.setItem('cart', '[]');
							return req.json();
						}).then(data => {
							setData({
								amount: data.data.amount,
								last4: data.data.last4,
								postalCode: data.data.postal_code!,
								country: data.data.country!,
								type: data.data.type,
								customer: data.data.customer,
							});
							setCart(data.data.cart);
						});
						break;

					case 'processing':
						setMessage('Payment processing. We\'ll update you when payment is received.');
						break;

					case 'requires_payment_method':
						setMessage('Payment failed. Please try another payment method.');
						setRedirect(true);
						break;

					default:
						setMessage('Something went wrong.');
						setRedirect(true);
						break;
				}
			});
	}, [router, stripe]);

	return (
		<>
			{redirect && (
				<div className='grid place-items-center absolute inset-0 z-50 bg-black bg-opacity-80 w-full h-full rounded-lg'>
					<div className='relative w-[25rem] h-11/12 right-0 left-0 z-51 bg-gray-200 rounded-lg'>
						<div className='mt-2 mb-2 grid place-items-center text-center'>
							<h2 className='text-xl'>{message || 'It looks like your checkout expired.'}</h2>
							<div className='flex gap-3'>
								<button onClick={(): void => {
									router.push('/cart');
								}} className='bottom-0 h-10 w-30 bg-red-500 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-700 transition-all duration-300 ease-in-out'>
									<p>Back to cart</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{!redirect && (
				<div className='container flex flex-row text-black'>
					<div>
						<h1 className='text-2xl font-bold'>{message}</h1>
						<p>Thank you for ordering, {data.customer.name}!</p>
						<p>A confirmation email has been sent to <b>{data.customer.email}</b>.</p>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
									>

									</th>
									<th
										scope='col'
										className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
									>
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
									>
										Amount
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '
									>
										Price
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200'>
								{cart.map((item, i) => {
									return (
										<OrderCartItem
											item={item}
											key={i}
										/>
									);
								})}
								<tr>
									<td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
									</td>
									<td className='px-6 py-4 text-gray-800 whitespace-nowrap'>
									</td>
									<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
										<p className='font-bold'>Total</p>
									</td>
									<td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
										<p>€{(data.amount / 100).toFixed(2)}</p>
									</td>

								</tr>
							</tbody>
						</table>
						<div>
							<p className='font-bold'>Payment Details</p>
							<p>Paid with {data.type}</p>
							<p>**** **** **** {data.last4}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PaymentStatus;