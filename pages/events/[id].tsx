import type { NextPage, NextPageContext } from 'next';
import Layout from '../../components/Layout';
import { useMetaData } from '../../lib/hooks/useMetaData';
import { EventDocument, IEvent } from '../../src/models';
import { BaseProps, ResponseData } from '../../src/types';
import EventPage from '../../components/EventPage';

interface Props {
	data: IEvent & { _id: string; };
}

const EventDynamic: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData(data.name, data.description, `/events/${data._id}`)}
			<Layout>
				<div className='container'>
					<EventPage event={data} />
				</div>
			</Layout>
		</>
	);
};

export const getServerSideProps = async ({ query }: NextPageContext & { query: { id: string } }): Promise<BaseProps<EventDocument>> => {
	const req = await fetch(
		`${process.env.NEXT_PUBLIC_DOMAIN}/api/events/${query.id}`,
	);

	const res = (await req.json()) as ResponseData<EventDocument>;

	return {
		props: {
			data: res.data,
		},
	};
};

export default EventDynamic;
