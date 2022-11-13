import { NextPage } from 'next';
import Layout from '../components/Layout';

const NotFound: NextPage = () => {
	return (
		<>
			<Layout>
				<div className="h-96 grid grid-cols gap-4 place-content-center text-black">
					<h1 className="text-7xl font-bold">404</h1>
					<p className="text-lg">Looks like you lost your way.</p>
					<button className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={(): string => (window.location.href = '/')}>Back home</button>
				</div>
			</Layout>
		</>
	);
};

export default NotFound;