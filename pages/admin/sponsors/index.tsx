import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import { AdminProps } from '../../../src/types/index';
import { ISponsor, SponsorDocument } from '../../../src/models/Sponsor';
import Layout from '../../../components/Layout';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import ErrorPage from '../../../components/Error';
import SponsorCard from '../../../components/SponsorCard';

interface Props {
	data: (ISponsor & { _id: string; })[];
}

const AdminSponsorsIndex: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData('Sponsors', 'Sponsors Page', '/sponsors')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<div className='container mb-12'>
						<div className='my-2'>
							<h1 className='text-5xl font-bold mb-5'>Sponsors</h1>
							<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-900' onClick={(): void => { window.location.href = '/admin/sponsors/create'; }}>
								Sponsor toevoegen
							</button>
						</div>
						<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
							{data.map((sponsor, i) => {
								return (
									<SponsorCard
										sponsor={sponsor}
										key={i}
									/>
								);
							})}
						</div>
					</div>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, resolvedUrl }): Promise<AdminProps<SponsorDocument>> {
	const user = req?.session.user;

	res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/sponsors`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await request.json();

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

	return {
		props: {
			user: req.session.user,
			data: data.data,
		},
	};
}, ironOptions);

export default AdminSponsorsIndex;
