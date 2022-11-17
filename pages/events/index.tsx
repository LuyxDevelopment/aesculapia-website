import { NextPage, NextPageContext } from 'next';
import { EventDocument } from '../../src/models/Event';
import { BaseProps, ResponseData } from '../../src/types/index';
import InProgress from '../../components/InProgress';

const EventsIndex: NextPage = () => {
	return (
		<InProgress pageName='events'></InProgress>
	);
};

export const getServerSideProps = async ({ res }: NextPageContext): Promise<BaseProps<EventDocument>> => {
	res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/events`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await request.json() as ResponseData<EventDocument | EventDocument[]>;

	return {
		props: {
			data: data.data,
		},
	};
};

export default EventsIndex;