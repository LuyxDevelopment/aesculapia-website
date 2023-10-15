import React, { FC, useEffect, useState } from 'react';
import { Stripe } from 'stripe';
import { useHydrationSafeDate } from '../lib/hooks/useHydrationSafeDate';

interface Props {
	order: Stripe.PaymentIntent;
}

const OrderCard: FC<Props> = ({ order }) => {
	const created = useHydrationSafeDate(order.created * 1000);

	const [name, setName] = useState('Unknown');
	const [address, setAddress] = useState('Unknown');
	const [billingDetails, setBillingDetails] = useState<Partial<Stripe.PaymentMethod.BillingDetails>>();

	useEffect(() => {
		const customer = order.customer as Stripe.Customer;
		const paymentMethod = order.payment_method as Stripe.PaymentMethod;

		if (paymentMethod && paymentMethod.billing_details) {
			setBillingDetails(paymentMethod.billing_details);
		}

		if (customer && customer.name) {
			setName(customer.name);
		} else if (paymentMethod && paymentMethod.billing_details) {
			setName(paymentMethod.billing_details.name!);
		}

		if (customer && customer.address) {
			setAddress(customer.address.line1 ?? 'Unknown');
		}

	}, [order.customer, order.payment_method]);

	return (
		<div className={`flex ${order.metadata.delivered ? 'bg-green-200' : 'bg-red-100'} rounded-lg mb-5 cursor-pointer`} onClick={(): string => (window.location.href = `/admin/orders/${order.id}`)}>
			<div className='flex-col mt-2 mb-2 ml-2'>
				<h1 className='text-xl font-bold'>Order ID: {order.id}</h1>
				<p>{`Order Name: ${name} ${billingDetails?.email ?? ''}`}</p>
				<p>{`Address: ${address}`}</p>
				<p>{`Created At: ${created}`}</p>
				<p className='font-bold'>{`${order.metadata.delivered ? 'Delivered' : 'Not Delivered'}`}</p>
				{order.metadata.receivedAt ? <p>Received At: {order.metadata.receivedAt}</p> : <></>}
			</div>
			<div className='flex-col absolute ml-[31rem] sm:ml-[36rem] md:ml-[35rem] lg:ml-[50rem] mt-2 mb-2'>
				<p className='text-lg'>Total: €{order.amount / 100}</p>
			</div>
		</div>
	);
};

export default OrderCard;
