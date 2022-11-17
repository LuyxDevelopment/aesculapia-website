import { NextPage } from 'next';
import InProgress from '../components/InProgress';

const NewsIndex: NextPage = () => {
	return (
		<InProgress pageName='news'></InProgress>
	);
};

export default NewsIndex;