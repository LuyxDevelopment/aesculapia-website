import Image from 'next/image';
import { FC } from 'react';
import { useHydrationSafeDate } from '../lib/hooks/useHydrationSafeDate';
import { IEvent } from '../src/models/Event';

interface Props {
	event: IEvent & { _id: string };
}

const EventCard: FC<Props> = ({ event }) => {
	const startDate = useHydrationSafeDate(event.startsAtTimestamp);
	const endDate = useHydrationSafeDate(event.endsAtTimestamp);
	return (
		<div
			className="hover:scale-90 transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 flex flex-row-reverse items-center justify-around bg-gradient-to-l from-orange-500 to-red-600 h-auto w-full p-5 rounded-md"
			onClick={(): string => (window.location.href = `/events/${event._id}`)}
		>
			<Image
				src={event.bannerURL}
				width="250"
				height="250"
				className="rounded-lg"
				alt={event.name}
			/>
			<div className="text-white flex flex-col flex-wrap">
				<h1 className="text-2xl font-bold pt-3">{event.name}</h1>
				<h2 className="text-xl font-semibold pt-3">{event.description}</h2>
				<p className="font-bold text-white text-lg pt-3">
					Starts At:{' '}
					<span className="hover:underline text-gray-700 font-medium text-lg cursor-pointer bg-gray-100 p-1">
						{startDate}
					</span>
				</p>
				<p className="font-bold text-white text-lg pt-3">
					Ends At:{' '}
					<span className="hover:underline text-gray-700 font-medium text-lg cursor-pointer bg-gray-100 p-1">
						{endDate}
					</span>
				</p>
			</div>
		</div>
	);
};

export default EventCard;
