import { FC } from 'react';
import { Stripe } from 'stripe';
import { useHydrationSafeDate } from '../lib/hooks/useHydrationSafeDate';
import Image from 'next/image';

interface Props {
	order: Stripe.PaymentIntent;
}

const OrderPage: FC<Props> = ({   order }) => {
	const created = useHydrationSafeDate(order.created);

	return (
		<div className='flex flex-col justify-center'>
			<div
				style={{
					background: `url(${order.metadata}) no-repeat center`,
					backgroundSize: 'cover',
					width: '100%',
					height: '11rem',
				}}
			></div>
			<div className='text-center'>
				<h1 className='pb-3 pt-3 text-3xl font-bold'>{order.id}</h1>
				<h2 className='mb-3 rounded-lg bg-red-500 p-2'>
					<span className='font-medium'>From</span>
					<span className='cursor-pointer bg-gray-100 p-1 text-lg font-medium text-gray-700 hover:underline'>
						{created}
					</span>
				</h2>
				<p className='px-2 pb-3 text-lg'>{order.description}</p>
			</div>
			<h1 className='text-3xl font-bold'>Customer Info</h1>
			<div className='flex flex-col font-semibold text-lg my-3'>
				<p>
					Name:{' '}
					<span className='text-gray-500 italic underline'>
						{order.entry.paidEntry ? 'Yes' : 'No'}
					</span>
				</p>
				<p>
					Billing Address:{' '}
					<span className='text-gray-500 italic underline'>
						{order.entry.entryCost}
					</span>
				</p>
				<p>
					Currency:{' '}
					<span className='text-gray-500 italic underline'>
						{order.currency}
					</span>
				</p>
				<p>
					Registered:{' '}
					<span className='text-gray-500 italic underline'>
						{order.entry.registeredCount}
					</span>
				</p>
				<p>
					Remaining:{' '}
					<span className='text-gray-500 italic underline'>
						{order.entry.eventCapacity - order.entry.registeredCount}
					</span>
				</p>
			</div>
		</div>
	);
};

export default OrderPage;
