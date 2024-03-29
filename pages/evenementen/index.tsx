import { NextPage, NextPageContext } from 'next';
import { EventDocument, IEvent } from '../../src/models/Event';
import { BaseProps, ResponseData } from '../../src/types/index';
import EventCard from '../../components/EventCard';
import Layout from '../../components/Layout';
import { useMetaData } from '../../lib/hooks/useMetaData';

interface Props {
	data: (IEvent & { _id: string; })[];
}

const EventsIndex: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData('Evenementen', 'Evenementen', '/evenementen')}
			<Layout>
				<div className='container mb-10'>
					<div className='flex flex-col items-center justify-center space-y-5'>
						{data.map((event, i) => {
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

	const response = (await request.json()) as ResponseData<EventDocument | EventDocument[]>;

	return {
		props: {
			data: response.data,
		},
	};
};

export default EventsIndex;
