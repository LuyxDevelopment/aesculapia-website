import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import type { NextPage } from 'next';
import Carousel, { ImageData } from '../components/Carousel';

const images: ImageData[] = [
	{
		name: 'hello',
		id: 1,
		url: 'https://cdn.discordapp.com/emojis/881231953876107295.png?quality=lossless',
	},
	{
		name: 'hello',
		id: 2,
		url: 'https://cdn.discordapp.com/emojis/871536829516644352.png',
	},
	{
		name: 'hello',
		id: 3,
		url: 'https://cdn.discordapp.com/attachments/913973764830658620/1019645714646704158/20220914_102753.jpg',
	},
	{
		name: 'hello',
		id: 4,
		url: 'https://cdn.discordapp.com/attachments/913973764830658620/1016714902234206370/unknown.png',
	},
];

const Home: NextPage = () => {
	return (
		<>
			{useMetaData('Aesculapia', 'Home Page', '/')}
			<Layout>
				<div style={{ width: '100%', height: '100vh' }}>
					<Carousel images={images} />
				</div>
			</Layout>
		</>
	);
};

export default Home;
