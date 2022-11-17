import { NextPage } from 'next';

const ErrorPage: NextPage = () => {
	return (
		<div className='h-96 grid grid-cols gap-4 place-content-center text-black'>
			<h1 className='text-5xl font-bold'>
				Er is een fout opgetreden.
			</h1>
			<p className='text-xl'>
				Laat het een beheerder weten.
			</p>
		</div>
	);
};

export default ErrorPage;