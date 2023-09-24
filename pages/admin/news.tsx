import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';
import InProgress from '../../components/InProgress';
import { NewsDocument } from '../../src/models/News';
import { AdminProps } from '../../src/types/index';
import { ironOptions } from '../../src/util/ironConfig';

const AdminNewsIndex: NextPage = () => {
	return (
		<InProgress pageName='news'></InProgress>
	);
};

export default AdminNewsIndex;

// eslint-disable-next-line require-await
export const getServerSideProps = withIronSessionSsr(async function ({ req, resolvedUrl }): Promise<AdminProps<NewsDocument>> {
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

	return {
		props: { user: req.session.user },
	};
}, ironOptions);