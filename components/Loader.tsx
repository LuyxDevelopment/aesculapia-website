import { NextPage } from 'next';
import Layout from './Layout';
import HashLoader from 'react-spinners/HashLoader';

const Loader: NextPage = () => {
	return (
		<>
			<Layout>
				<div className="grid place-items-center h-96">
					<HashLoader
						color={'#e00d20'}
						loading={true}
						size={75}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			</Layout>
		</>
	);
};

export default Loader;