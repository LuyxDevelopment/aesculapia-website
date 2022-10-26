import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			{useMetaData('Aesculapia', 'Home Page', '/')}
			<Layout>
				<h1>Hello men</h1>
			</Layout>
		</>
	);
};

export default Home;
