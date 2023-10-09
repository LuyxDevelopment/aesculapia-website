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
		<div className='flex flex-col justify-center bg-red-100 p-5 rounded-md mb-10'>
			<img src={event.bannerURL} alt='Event Banner Image'></img>
			<div className='text-center content-center'>
				<h1 className='pb-3 pt-3 text-3xl font-bold'>{event.name}</h1>
				<h2 className='mb-3 rounded-lg bg-red-500 p-2 text-gray-50 text-xl font-bold'>
					<span className='cursor-pointer p-1 font-medium'>
						{startDate}
					</span>
					<span className='font-medium text-gray-700'>until</span>
					<span className='cursor-pointer p-1 font-medium'>
						{endDate}
					</span>
				</h2>
				<p className='px-2 pb-3 text-lg'>{event.description}</p>
			</div>
			<h1 className='text-3xl font-bold'>Informatie over deelname</h1>
			<div className='flex flex-col font-semibold text-lg my-3'>
				<p>
					Ingangskosten:{' '}
					<span className='text-gray-500'>
						{event.entry.entryCost > 0 ? event.entry.entryCost: 'GRATIS'}
					</span>
				</p>
				<p>
					Capaciteit:{' '}
					<span className='text-gray-500'>
						{event.entry.eventCapacity}
					</span>
				</p>
				<p>
					Geregistreerd :{' '}
					<span className='text-gray-500'>
						{event.entry.registeredCount}
					</span>
				</p>
				<p>
					Overige:{' '}
					<span className='text-gray-500'>
						{event.entry.eventCapacity - event.entry.registeredCount}
					</span>
				</p>
			</div>
		</div>
	);
};

export default EventPage;
