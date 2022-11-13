/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from 'next';
import { useMetaData } from '../../lib/hooks/useMetaData';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import LoadingPage from '../../src/util/loading';
import ErrorPage from '../../src/util/error';
import EventCard from '../../components/EventCard';
import { EventDocument } from '../../src/models/Event';

const index: NextPage = () => {
	useMetaData('Events', 'Events Page', '/events');

	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch('/api/events')
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);
				setLoading(false);
			});
	}, []);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!data) {
		return <ErrorPage />;
	}

	return (
		<>
			<Layout>
				<div className="container">
					<h1 className="text-4xl font-bold mb-5">All Events</h1>
					<div className="grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{(data as EventDocument[]).map((event, i) => {
							return (
								<EventCard event={event} key={i} />
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default index;