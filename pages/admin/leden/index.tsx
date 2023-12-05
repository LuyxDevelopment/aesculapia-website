import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import { AdminProps } from '../../../src/types/index';
import Layout from '../../../components/Layout';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import ErrorPage from '../../../components/Error';
import { IMember, MemberDocument } from '../../../src/models/Member';
import MemberCard from '../../../components/MemberCard';

interface Props {
	data: (IMember & { _id: string; })[];
}

const AdminMembersIndex: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData('Leden', 'Leden', '/admin/leden')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<div className='container mb-12'>
						<div className='my-2'>
							<h1 className='text-5xl font-bold mb-5'>Leden</h1>
							<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-900' onClick={(): void => { window.location.href = '/admin/leden/create'; }}>
								Lid toevoegen
							</button>
						</div>
						<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3'>
							{data.map((member, i) => {
								return (
									<MemberCard
										member={member}
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

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, resolvedUrl }): Promise<AdminProps<MemberDocument>> {
	const user = req?.session.user;

	res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/members`, {
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

export default AdminMembersIndex;
