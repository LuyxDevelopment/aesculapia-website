import { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { FieldValues, useForm } from 'react-hook-form';
import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import { CloseIcon } from './Icons';
import Cookies from 'js-cookie';
import Toast, { clearMessage } from './Toast';

interface Props {
	paymentIntent: string;
}

interface Customer {
	name: string;
	email: string;
	payment_intent: string;
}

interface Member {
	name: string;
	lidNumber: number;
}

const CheckoutForm: FC<Props> = ({ paymentIntent }) => {
	const {
		register: registerMemberValidate,
		handleSubmit: handleSubmitMemberValidate,
		formState: { errors: memberValidateErrors },
	} = useForm();

	const onSubmitMemberValidate = async (
		data: FieldValues,
		event?: BaseSyntheticEvent,
	): Promise<void> => {
		event?.preventDefault();

		setMember(prevMember => ({
			...prevMember,
			member: {
				name: data.name,
				lidNumber: data.lidNumber,
			},
		}));

		setStep(3);
	};

	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });

	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();

	const { register, handleSubmit, formState: { errors } } = useForm();

	const [memberValidateMenu, setMemberValidateMenu] = useState(false);

	const [step, setStep] = useState(1);
	const [customer, setCustomer] = useState<Customer | Record<string, null>>({});
	const [member, setMember] = useState<Member | Record<string, null>>({});
	const [isLoading, setIsLoading] = useState(false);

	const nameSubmit = (data: FieldValues, e: BaseSyntheticEvent): void => {
		e.preventDefault();

		setCustomer(prevCustomer => ({
			...prevCustomer,
			customer: {
				name: data.fullName,
				email: data.email,
				payment_intent: paymentIntent,
			},
		}));

		setStep(2);
	};

	useEffect(() => {
		if (step === 3 && member.lidNumber) {
			const items = JSON.parse(Cookies.get('cart') ?? '[]');
			if (!items.length) return;

			fetch('/api/stripe/payment_intent', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ items: items, id: paymentIntent, memberId: member.lidNumber }),
			})
				.then((res) => res.json())
				.then((data) => data)
				.catch(console.error);
		}
	}, [step]);

	const onSubmit = async (e: BaseSyntheticEvent): Promise<void> => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsLoading(true);

		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/order`,
			},
			redirect: 'if_required',
		});

		if (result.error?.type === 'card_error' || result.error?.type === 'validation_error') {
			setIsLoading(false);
			return setMessage({ type: 'error', text: result.error.message ?? 'Validation error.' });
		} else if (result.error) {
			setIsLoading(false);
			return setMessage({ type: 'error', text: 'An unexpected error occurred.' });
		}

		const req = await fetch('/api/stripe/customer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ customer }),
		});

		if (req.status === 400) {
			setIsLoading(false);
			return setMessage({ type: 'error', text: 'We were unable to validate your information.' });
		}

		setIsLoading(false);
		await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/order?payment_intent=${result.paymentIntent?.id}&payment_intent_client_secret=${result.paymentIntent?.client_secret}&redirect_status=${result.paymentIntent?.status}`);
	};

	return (
		<>
			<div className='container'>
				<div className='flex flex-row justify-start items-center font-bold gap-2 text-slate-500 mb-6'>
					<p onClick={(): void => setStep(1)} className={step === 1 ? 'text-black hover:cursor-pointer' : 'hover:cursor-pointer'}>Billing</p>
					<hr className='w-10'></hr>
					<p onClick={(): void => setStep(2)} className={step === 2 ? 'text-black hover:cursor-pointer' : 'hover:cursor-pointer'}>Membership</p>
					<hr className='w-10'></hr>
					<p onClick={(): void => setStep(2)} className={step === 3 ? 'text-black hover:cursor-pointer' : 'hover:cursor-pointer'}>Payment</p>
				</div>
				{step === 1 && (
					<form id='address-form' onSubmit={handleSubmit((data, event) => nameSubmit(data, event!))}>
						<label>
							Volledige Naam
						</label>
						<input
							className='appearance-none block w-full bg-[#F1F1F1] text-gray-700 rounded-lg py-3 px-4 mb-3 leading-tight border-[3.2px] border-white focus:border-[#F58989] focus:outline-[#FBD0D0] '
							id='full-name'
							type='text'
							placeholder='Voor- en achternaam'
							minLength={1}
							required
							{...register('fullName', {
								required: true, pattern: {
									value: /^[a-zA-Z]+\s[a-zA-Z]+\s?$/,
									message: 'Geef alleen je voor- en achternaam op.',
								},
							})}
						/>
						<label>
							E-mail
						</label>
						<input
							className='block w-full bg-[#F1F1F1] text-gray-700 rounded-lg py-3 px-4 mb-3 leading-tight border-[3.2px] border-white focus:border-[#F58989] focus:outline-[#FBD0D0] '
							type='email'
							placeholder='e-mailadres'
							minLength={1}
							required
							{...register('email', {
								required: true, pattern: {
									value: /\S+@\S+\.\S+/,
									message: 'Voer een geldig e-mailadres in.',
								},
							})}
						/>
						<button type='submit' disabled={isLoading || !stripe || !elements} className='bottom-0 bg-[#F1F1F1] shadow-md flex items-center justify-center rounded-lg p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out'>
							Volgende
						</button>
					</form>
				)}
				{step === 2 && (
					<>
						<div className='my-4'>
							<div className='flex flex-wrap h-auto text-xl mt-3'>
								<form
									onSubmit={handleSubmitMemberValidate((data, event) => onSubmitMemberValidate(data, event))}
								>
									<div className='flex flex-wrap -mx-3'>
										<div className='w-full md:w-1/3 px-3'>
											<label
												className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
												htmlFor='grid-lidnummer'
											>
												Naam
											</label>
											<input
												className='appearance-none block w-full bg-gray-200 text-gray-700 border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white'
												id='grid-lidnummer'
												type='text'
												placeholder='Bob Johnson'
												required
												{...registerMemberValidate('name', { required: true })}
											/>
										</div>
										<div className='w-full md:w-1/3 px-3'>
											<label
												className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
												htmlFor='grid-ldc'
											>
												Lidnummer
											</label>
											<input
												className='appearance-none block w-full bg-gray-200 text-gray-700 border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white'
												id='grid-lidnummer'
												type='text'
												placeholder='A1232452'
												required
												{...registerMemberValidate('memberNumber', { required: true })}
											/>
										</div>
										<button type='submit' disabled={isLoading || !stripe || !elements} className='bottom-0 bg-[#F1F1F1] shadow-md flex items-center justify-center rounded-lg p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out'>
											Nextv
										</button>
									</div>
								</form>
								<div className='flex-row flex gap-2 mt-2'>
									<button onClick={(): void => setStep(1)} disabled={isLoading || !stripe || !elements} className='bottom-0 bg-[#F1F1F1] shadow-md flex items-center justify-center rounded-lg p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out'>
										Terug
									</button>
									<button type='submit' onClick={(): void => setStep(3)} disabled={isLoading || !stripe || !elements} className='bottom-0 bg-[#F1F1F1] shadow-md flex items-center justify-center rounded-lg p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out'>
										Skip
									</button>
								</div>
							</div>
						</div>
					</>
				)}
				{step === 3 && (
					<form id='payment-form' onSubmit={onSubmit} className='my-5'>
						<PaymentElement id='payment-element' options={{ layout: 'tabs', business: { name: 'Aesculapia' } }} />
						<div className='flex-row flex gap-2 mt-2'>
							<button disabled={isLoading || !stripe || !elements} type='submit' className='bottom-0 bg-red-500 text-gray-50 font-semibold shadow-md flex items-center justify-center rounded-lg p-2 hover:bg-red-700 transition-all duration-300 ease-in-out'>
								{isLoading ? <MoonLoader
									color={'#fff'}
									loading={true}
									size={20}
									speedMultiplier={0.5}
									aria-label='Loading Spinner'
									data-testid='loader'
								/> : 'Nu Betalen'}
							</button>
							<button onClick={(): void => setStep(2)} disabled={isLoading || !stripe || !elements} className='bottom-0 bg-[#F1F1F1] shadow-md flex items-center justify-center rounded-lg p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out'>
								Terug
							</button>
						</div>
					</form>
				)}
				<p className="mt-20"><span className="font-bold text-xl">Price</span> $</p>
			</div>
			{message.text !== '' && (
				<Toast
					type={message.type}
					title={message.type[0].toUpperCase() + message.type.slice(1)}
					description={message.text}
				/>
			)}
		</>
	);
};

export default CheckoutForm;