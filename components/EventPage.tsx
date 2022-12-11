import { FC } from 'react';
import { IEvent } from '../src/models';
import { useHydrationSafeDate } from '../lib/hooks/useHydrationSafeDate';
import Image from 'next/image';

interface Props {
	event: IEvent & { _id: string };
}

const EventPage: FC<Props> = ({ event }) => {
	const startDate = useHydrationSafeDate(event.startsAtTimestamp);
	const endDate = useHydrationSafeDate(event.endsAtTimestamp);
	return (
		<div className="flex flex-col justify-center">
			<div
				style={{
					background: `url(${event.bannerURL}) no-repeat center`,
					backgroundSize: 'cover',
					width: '100%',
					height: '11rem',
				}}
			></div>
			<div className="text-center">
				<h1 className="pb-3 pt-3 text-3xl font-bold">{event.name}</h1>
				<h2 className="mb-3 rounded-3xl bg-red-500 p-2">
					<span className="font-medium">From</span>
					<span className="cursor-pointer bg-gray-100 p-1 text-lg font-medium text-gray-700 hover:underline">
						{startDate}
					</span>
					<span className="font-medium">to</span>
					<span className="cursor-pointer bg-gray-100 p-1 text-lg font-medium text-gray-700 hover:underline">
						{endDate}
					</span>
				</h2>
				<p className="px-2 pb-3 text-lg">{event.description}</p>
			</div>
			<h1 className="text-3xl font-bold">Entry Info</h1>
			<div className="flex flex-col font-semibold text-lg my-3">
				<p>
					Paid:{' '}
					<span className="text-gray-500 italic underline">
						{event.entry.paidEntry ? 'Yes' : 'No'}
					</span>
				</p>
				<p>
					Entry Cost:{' '}
					<span className="text-gray-500 italic underline">
						{event.entry.entryCost}
					</span>
				</p>
				<p>
					Capacity:{' '}
					<span className="text-gray-500 italic underline">
						{event.entry.eventCapacity}
					</span>
				</p>
				<p>
					Registered:{' '}
					<span className="text-gray-500 italic underline">
						{event.entry.registeredCount}
					</span>
				</p>
				<p>
					Remaining:{' '}
					<span className="text-gray-500 italic underline">
						{event.entry.eventCapacity - event.entry.registeredCount}
					</span>
				</p>
			</div>
		</div>
	);
};

export default EventPage;
