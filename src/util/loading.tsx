import { NextPage } from 'next';
import Layout from '../../components/Layout';

const LoadingPage: NextPage = () => {
	return (
		<>
			<Layout>
				<div className="relative">
					<div className="absolute top-10 left-14 sm:left-20 text-white">
						<div className="flex flex-wrap w-56 sm:w-96">
							<h1 className="text-3xl pb-2 font-bold text-black">
								Page Loading.
							</h1>
							<p className="text-xl text-black">
								Please be patient.
							</p>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default LoadingPage;