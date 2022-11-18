import { NextPage, NextPageContext } from 'next';
import { EventDocument } from '../../src/models/Event';
import { BaseProps, ResponseData } from '../../src/types/index';
import EventCard from '../../components/EventCard';
import Layout from '../../components/Layout';
import { useMetaData } from '../../lib/hooks/useMetaData';

interface Props {
	events: EventDocument[];
}

const EventsIndex: NextPage<Props> = ({ events }) => {
	return (
		<>
			{useMetaData('Events', 'Events', '/events')}
			<Layout>
				<div className="container">
					<div className="flex flex-col items-center justify-center space-y-5">
						{events.map((event, i) => {
							return (
								<EventCard
									event={event}
									key={i}
								/>
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	);
};

export const getServerSideProps = async ({
	res,
}: NextPageContext): Promise<BaseProps<EventDocument>> => {
	res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/events`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const response = (await request.json()) as ResponseData<
		EventDocument | EventDocument[]
	>;

	return {
		props: {
			//@ts-ignore
			events: response.data,
		},
	};
};

export default EventsIndex;
