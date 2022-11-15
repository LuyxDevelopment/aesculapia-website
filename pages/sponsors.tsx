import { NextPage, NextPageContext } from 'next';
import SponsorCard from '../components/SponsorCard';
import { ISponsor } from '../src/models/Sponsor';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import ErrorPage from '../components/Error';

interface Props {
	data: (ISponsor & { _id: string; })[];
}

const Index: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData('Sponsors', 'Sponsors Page', '/sponsors')}
			<Layout>
				{!data && (
					<ErrorPage />
				)}
				{data && (
					<div className='container mb-12'>
						<h1 className='text-4xl font-bold mb-5'>Sponsors</h1>
						<p className='text-xl'>
							These sponsors help fund our mission.
						</p>
						<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
							{data.map((sponsor, i) => {
								return (
									<SponsorCard sponsor={sponsor} key={i} />
								);
							})}
						</div>
					</div>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = async (context: NextPageContext): Promise<{ props: unknown; }> => {
	context.res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);
	const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/sponsors`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await req.json();

	return {
		props: {
			data: data.data,
		},
	};
};

export default Index;