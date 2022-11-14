import { NextPage } from 'next';
import Layout from './Layout';

const ErrorPage: NextPage = () => {
	return (
		<div className='h-96 grid grid-cols gap-4 place-content-center text-black'>
			<h1 className='text-3xl font-bold'>
							An error has occurred.
			</h1>
			<p className='text-xl'>
							Please let an administrator know.
			</p>
		</div>
	);
};

export default ErrorPage;