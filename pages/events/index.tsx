import { NextPage, NextPageContext } from 'next';
import { useMetaData } from '../../lib/hooks/useMetaData';
import Layout from '../../components/Layout';
import ErrorPage from '../../components/Error';
import EventCard from '../../components/EventCard';
import { EventDocument, IEvent } from '../../src/models/Event';
import { BaseProps, ResponseData } from '../../src/types/index';

interface Props {
	data: (IEvent & { _id: string; })[];
}

const EventsIndex: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData('Events', 'Events Page', '/events')}
			<Layout>
				{!data && (
					<ErrorPage />
				)}
				{data && (
					<div className='container'>
						<h1 className='text-4xl font-bold mb-5'>All Events</h1>
						<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
							{data.map((event, i) => {
								return (
									<EventCard event={event} key={i} />
								);
							})}
						</div>
					</div>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<BaseProps<EventDocument>> => {
	context.res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);
	const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/events`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await req.json() as ResponseData<EventDocument | EventDocument[]>;

	return {
		props: {
			data: data.data,
		},
	};
};

export default EventsIndex;