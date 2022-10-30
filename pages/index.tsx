import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			{useMetaData('Aesculapia', 'Home Page', '/')}
			<Layout>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>
				<h1 className="pb-10">Hello men</h1>v
			</Layout>
		</>
	);
};

export default Home;
