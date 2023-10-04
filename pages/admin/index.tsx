import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../src/util/ironConfig';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import AdminPageCard from '../../components/AdminPageCard';
import { AdminProps } from '../../src/types/index';
import { useMetaData } from '../../lib/hooks/useMetaData';

const pages: { name: string, url: string, svg: string; }[] = [
	{
		name: 'Evenement',
		url: '/admin/evenementen',
		svg: '/assets/icons/calendar.svg',
	},
	{
		name: 'News',
		svg: '/assets/icons/news.svg',
		url: '/admin/news',
	},
	{
		name: 'Bestelgeschiedenis',
		svg: '/assets/icons/order.svg',
		url: '/admin/bestellingen',
	},
	{
		name: 'Sponsors',
		svg: '/assets/icons/handshake.svg',
		url: '/admin/sponsors',
	},
	{
		name: 'Webshop',
		svg: '/assets/icons/box.svg',
		url: '/admin/webshop',
	},
	// {
	// 	name: 'Settings',
	// 	svg: '/assets/icons/settings.svg',
	// 	url: '/admin/settings',
	// },
];

const AdminIndex: NextPage = () => {
	return (
		<>
			{useMetaData('Admin-menu', 'Admin-menu', '/admin')}
			<Layout>
				<div className='container mb-12'>
					<h1 className='text-5xl font-bold mb-5'>Admin-menu</h1>
					<p className='text-xl'>
						Selecteer een pagina om te beheren.
					</p>
					<div className='mt-4 xl:flex xl:flex-row xl:gap-12 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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

// eslint-disable-next-line require-await
export const getServerSideProps = withIronSessionSsr(async function ({ req }): Promise<AdminProps> {
	const user = req.session.user;

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

	return {
		props: { user: req.session.user },
	};
}, ironOptions);

export default AdminIndex;