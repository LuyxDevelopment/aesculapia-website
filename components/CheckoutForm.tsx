import { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm: FC = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) return;

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) return;

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			console.log(paymentIntent);
			switch (paymentIntent?.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e: BaseSyntheticEvent): Promise<void> => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout`,
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message ?? 'Validation error.');
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	return (
		<>
			<form id="payment-form" onSubmit={handleSubmit}>
				<PaymentElement id="payment-element" options={{ layout: 'tabs', business: { name: 'Aesculapia' }}} className="container" />
				<button disabled={isLoading || !stripe || !elements} id="submit">
					<span id="button-text">
						{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
					</span>
				</button>
				{message && <div id="payment-message">{message}</div>}
			</form>
		</>
	);
};

export default CheckoutForm;