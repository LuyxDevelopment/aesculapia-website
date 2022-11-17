import { NextPage } from 'next';
import InProgress from '../components/InProgress';

const SongIndex: NextPage = () => {
	return (
		<InProgress pageName='song'></InProgress>
	);
};

export default SongIndex;