import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../src/util/ironConfig';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import AdminPageCard from '../../components/AdminPageCard';

const pages: { name: string, url: string, svg: string; }[] = [
	{
		name: 'Events',
		url: '/admin/events',
		svg: '/assets/icons/events',
	},
	{
		name: 'Orders',
		svg: '/assets/icons/orders',
		url: '/admin/orders',
	},
	{
		name: 'Products',
		svg: '/assets/icons/products',
		url: '/admin/products',
	},
	{
		name: 'Sponsors',
		svg: '/assets/icons/sponsors',
		url: '/admin/sponsors',
	},
];

const AdminIndex: NextPage = () => {
	return (
		<>
			<Layout>
				<div className='container mb-12'>
					<h1 className='text-4xl font-bold mb-5'>Admin Menu</h1>
					<p className='text-xl'>
						Select a panel to edit.
					</p>
					<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{pages.map(({ name, svg, url }, i) => {
							return (
								<AdminPageCard name={name} svg={svg} url={url} key={i} />
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	);
};

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
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

export default AdminIndex;