import { FC } from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Loader: FC = () => {
	return (
		<>
			<div className='grid place-items-center h-96'>
				<HashLoader
					color={'#e00d20'}
					loading={true}
					size={75}
					aria-label='Loading Spinner'
					data-testid='loader'
				/>
			</div>
		</>
	);
};

export default Loader;