import { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements, AddressElement } from '@stripe/react-stripe-js';

interface Props {
	clientSecret: string;
}

const CheckoutForm: FC<Props> = ({ clientSecret }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState('');
	const [step, setStep] = useState(1);
	const [customer, setCustomer] = useState({});
	const [customerId, setCustomerId] = useState('');
	const [paymentIntent, setPaymentIntent] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) return;

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) return;

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
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

	useEffect(() => {
		if (!stripe) return;

		if (!clientSecret) return;

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => setPaymentIntent(paymentIntent!.id));
	}, [clientSecret, stripe]);

	const handleSubmit = async (e: BaseSyntheticEvent): Promise<void> => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsLoading(true);

		console.log(elements);

		fetch('/api/stripe/customer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ customer }),
		})
			.then(req => req.json())
			.then(data => {

			});

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
			<div className="container">
				<div className="flex flex-row justify-start items-center font-bold gap-2 text-slate-500 mb-6">
					<p onClick={(): void => setStep(1)} className={step === 1 ? 'text-black hover:cursor-pointer' : 'hover:cursor-pointer'}>Billing</p>
					<hr className="w-10"></hr>
					<p onClick={(): void => setStep(2)} className={step === 2 ? 'text-black hover:cursor-pointer' : 'hover:cursor-pointer'}>Payment</p>
					<hr className="w-10"></hr>
					<p onClick={(): void => setStep(3)} className={step === 3 ? 'text-black hover:cursor-pointer' : 'hover:cursor-pointer'}>Review</p>
				</div>
				{step === 1 && (
					<form id='address-form'>
						<h3>Shipping</h3>
						<AddressElement id='address-element' options={{ mode: 'billing' }} onChange={(event): void => {
							if (event.isNewAddress) {
								console.log('new address');
								return setCustomer(prevCustomer => ({
									...prevCustomer,
									customer: {
										name: event.value.name,
										address: {
											city: event.value.address.city,
											state: event.value.address.state,
											country: event.value.address.country,
											line1: event.value.address.line1,
											postal_code: event.value.address.postal_code,
										},
										payment_intent: paymentIntent,
									}}));
							}
						//if (event.complete) {
							// console.log(event.value);
							// 	return setCustomer(prevCustomer => ({
							// 		...prevCustomer,
							// 		customer: {
							// 			name: event.value.name,
							// 			address: {
							// 				city: event.value.address.city,
							// 				state: event.value.address.state,
							// 				country: event.value.address.country,
							// 				line1: event.value.address.line1,
							// 				postal_code: event.value.address.postal_code,
							// 			},
							// 			payment_intent: paymentIntent,
							// 		}}));
							//}
						//}
						}} />
						<button disabled={isLoading || !stripe || !elements} onClick={(): void => setStep(2)}>
							<span id='button-text'>
								{isLoading ? <div className='spinner' id='spinner'></div> : 'Next'}
							</span>
						</button>
					</form>
				)}
				{step === 2 && (
					<form id='payment-form' onSubmit={handleSubmit}>
						<PaymentElement id='payment-element' options={{ fields: { billingDetails: { address: { postalCode: 'never' } } }, layout: 'tabs', business: { name: 'Aesculapia' }}} />
						<button disabled={isLoading || !stripe || !elements} id='submit'>
							<span id='button-text'>
								{isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
							</span>
						</button>
						<button onClick={(): void => setStep(1)} disabled={isLoading || !stripe || !elements} id='back'>
							<span id='button-text'>
								{isLoading ? <div className='spinner' id='spinner'></div> : 'Back'}
							</span>
						</button>
					</form>
				)}
				{message && <div id='payment-message'>{message}</div>}
			</div>
		</>
	);
};

export default CheckoutForm;