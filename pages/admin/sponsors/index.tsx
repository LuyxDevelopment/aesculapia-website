import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import InProgress from '../../../components/InProgress';
import { AdminProps } from '../../../src/types/index';
import { SponsorDocument } from '../../../src/models/Sponsor';

const AdminSponsorsIndex: NextPage = () => {
	return (
		<InProgress pageName='sponsors'></InProgress>
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
