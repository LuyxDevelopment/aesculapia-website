import { NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../../src/util/ironConfig';
import { AdminProps } from '../../../src/types/index';
import { EventDocument, IEvent } from '../../../src/models/Event';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import Layout from '../../../components/Layout';
import ErrorPage from '../../../components/Error';
import AdminEventCard from '../../../components/AdminEventCard';

interface Props {
	data: (IEvent & { _id: string; })[];
}

const AdminEventsIndex: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData('Admin Orders', 'Admin Orders Page', '/admin/orders')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<>
						<div className='container flex flex-row'>
							<div className='mb-12'>
								<div className='flex flex-col items-start justify-start mb-7'>
									<h1 className='text-4xl font-bold mb-5'>Winkelwagen</h1>
									<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-900' onClick={(): void => { window.location.href = '/admin/events/create'; }}>
										Event creëren
									</button>
								</div>
								<div className='grid grid-cols-1 gap-y-5 divide-y w-[35rem] sm:w-[40rem] md:w-[39rem] lg:w-[60rem]'>
									{data.map((event, i) => {
										return (
											<AdminEventCard
												event={event}
												key={i}
											></AdminEventCard>
										);
									})}
								</div>
							</div>
						</div>
					</>
				)}
			</Layout>
		</>
	);
};

export default AdminEventsIndex;

export const getServerSideProps = withIronSessionSsr(async function ({ req, resolvedUrl }): Promise<AdminProps<EventDocument>> {
	const user = req.session.user;

	if (!user) {
		return {
			props: {
				user: { email: '', has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: `/admin/login?from=${encodeURIComponent(resolvedUrl)}`,
				permanent: false,
			},
		};
	}

	const eventRequest = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/events`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const eventResponse = await eventRequest.json();

	return {
		props: {
			user: req.session.user,
			data: eventResponse.data,
		},
	};
}, ironOptions);