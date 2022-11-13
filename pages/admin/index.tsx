import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../src/util/ironConfig';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import dbConnect from '../../src/util/dbConnect';

const AdminHome: NextPage = () => {
	return (
		<>
			<Layout>
				<div className="relative">
					<div className="absolute top-10 left-14 sm:left-20 text-white">
						<div className="flex flex-wrap w-56 sm:w-96">
							<h1 className="text-3xl pb-2 font-bold text-black">
								Admin home.
							</h1>
							<p className="text-xl text-black">
								Welcome to the admin page.
							</p>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
	dbConnect();

	const user = req.session.user;

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

export default AdminHome;