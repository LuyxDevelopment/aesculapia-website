import { NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../../src/util/ironConfig';
import InProgress from '../../../components/InProgress';
import { AdminProps } from '../../../src/types/index';
import { EventDocument } from '../../../src/models/Event';

const AdminEventsIndex: NextPage = () => {
	return (
		<InProgress pageName='events'></InProgress>
	);
};

export default AdminEventsIndex;

export const getServerSideProps = withIronSessionSsr(async function ({ req }): Promise<AdminProps<EventDocument>> {
	const user = req.session.user;

	if (user?.email) {
		const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/2fa/generate`, {
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
				user: { email: user.email, has2faEnabled: false, completed2fa: false },
				otpAuthUri: '',
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
		props: { user: req.session.user },
	};
}, ironOptions);