import { NextPage } from 'next';
import Layout from './Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import MoonLoader from 'react-spinners/MoonLoader';

interface Props {
	pageName: string;
}

const InProgress: NextPage<Props> = ({ pageName }) => {
	return (
		<>
			<Layout>
				{useMetaData('Pagina in uitvoering', 'Pagina in uitvoering', pageName)}
				<div className='relative'>
					<div className='absolute top-10 left-14 sm:left-20'>
						<div className='flex flex-wrap w-56 sm:w-96 text-gray-800'>
							<h1 className='text-2xl lg:text-5xl pb-2 font-bold'>
								Deze pagina is in ontwikkeling.
							</h1>
							<p className='text-xl'>
								Kom snel terug.
							</p>
						</div>
					</div>
				</div>
				<div className='grid place-items-center justify-center items-center h-full'>
					<MoonLoader
						color={'#ef4444'}
						loading={true}
						size={100}
						speedMultiplier={0.5}
						aria-label='Loading Spinner'
						data-testid='loader'
					/>
				</div>
			</Layout>
		</>
	);
};

export default InProgress;