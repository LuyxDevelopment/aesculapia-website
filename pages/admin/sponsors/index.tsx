import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import InProgress from '../../../components/InProgress';
import { AdminProps } from '../../../src/types/index';
import { SponsorDocument } from '../../../src/models/Sponsor';

const AdminSponsorsIndex: NextPage = InProgress;

export const getServerSideProps = withIronSessionSsr(async function (context: GetServerSidePropsContext): Promise<AdminProps<SponsorDocument>> {
	const user = context.req?.session.user;

	context.res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/sponsors`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await request.json();

	if (user?.email) {
		const request = await fetch('http://localhost:3000/api/auth/2fa/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const json = await request.json();

		if (json.data) return {
			props: {
				user: { email: user.email, has2faEnabled: true, completed2fa: false },
				otpAuthUri: json.data,
			},
		};
		return {
			props: {
				user: {
					email: user.email,
					has2faEnabled: false,
					completed2fa: false,
				},
				otpAuthUri: '',
				data: data.data,
			},
		};
	}

	if (!user) {
		return {
			props: {
				user: { email: '', has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: '/admin/login',
				permanent: false,
			},
		};
	}

	if (!user.has2faEnabled) {
		return {
			props: {
				user: { email: user.email, has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: '/admin/settings',
				permanent: false,
			},
		};
	}

	return {
		props: {
			user: context.req.session.user,
			data: data.data,
		},
	};
}, ironOptions);

export default AdminSponsorsIndex;
