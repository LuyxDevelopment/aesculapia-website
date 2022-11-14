import Image from 'next/image';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import Carousel, { ImageData } from '../components/Carousel';
import AOS from '../components/AOS';
import Dropdown from '../components/Dropdown';
import { ironOptions } from '../src/util/ironConfig';

const images: ImageData[] = [
	{
		name: 'hello',
		id: 1,
		url: 'http://localhost:3000/api/og?description=1',
	},
	{
		name: 'hello',
		id: 2,
		url: 'http://localhost:3000/api/og?description=2',
	},
	{
		name: 'hello',
		id: 3,
		url: 'http://localhost:3000/api/og?description=3',
	},
];

const events = [
	{
		_id: '1',
		title: 'Event 1',
		description: 'A Charity live event with many famous singers!',
		banner: 'http://localhost:3000/api/og?description=Event',
		endsAtTimestamp: Date.now() + 1000,
	},
	{
		_id: '2',
		title: 'Event 2',
		description: 'Longer Event Description',
		banner: 'http://localhost:3000/api/og?description=Event',
		endsAtTimestamp: Date.now() + 2000,
	},
	{
		_id: '3',
		title: 'Event 3',
		description: 'Even Longer Event Description',
		banner: 'http://localhost:3000/api/og?description=Event',
		endsAtTimestamp: Date.now() + 3000,
	},
];

const Home: NextPage = () => {
	return (
		<>
			{useMetaData('Aesculapia', 'Home Page', '/')}
			<Layout>
				<div className='relative'>
					<div className='absolute top-10 left-14 sm:left-20 text-white'>
						<div className='flex flex-wrap w-56 sm:w-96'>
							<h1 className='text-3xl pb-2 font-bold'>
								Welkom op de website van Aesculapia!
							</h1>
							<p className='text-xl'>
								De studentenvereniging voor geneeskundestudenten aan de
								Universiteit Antwerpen.
							</p>
						</div>
					</div>
					<div>
						<Carousel
							images={images}
							fullScreen={true}
						/>
					</div>
				</div>
				<div className='container mt-24'>
					<AOS dir='rl'>
						<div className='my-6 flex flex-col sm:flex-row justify-between items-center'>
							<div>
								<h1 className='font-semibold text-4xl'>Who are we?</h1>
								<p className='italic'>
									We are a group of students with so much talent!
								</p>
							</div>
							<div className='px-5'></div>
							<Image
								src='http://localhost:3000/api/og?description=group%20photo%201'
								width={1200}
								height={630}
								className='w-60 sm:w-72'
								alt='Alt'
							/>
						</div>
					</AOS>
					<div className='mt-20'>
						<AOS dir='lr'>
							<div className='flex flex-col-reverse sm:flex-row justify-between items-center'>
								<Image
									src='http://localhost:3000/api/og?description=group%20photo%202'
									width={1200}
									height={630}
									className='w-60 sm:w-72'
									alt='Alt'
								/>
								<div className='px-5'></div>
								<div>
									<h1 className='font-semibold text-4xl'>
										What are we aiming for?
									</h1>
									<p className='italic'>Making the world a better place!</p>
								</div>
							</div>
						</AOS>
					</div>
					<div className='mt-32 mb-32'>
						<AOS dir='tb'>
							<h1 className='text-center text-4xl font-bold mb-5'>
								Our upcoming events
							</h1>
							<div className='flex flex-col sm:flex-row items-center justify-evenly mb-5 text-white'>
								{events.map((event, i) => {
									return (
										<div key={i}>
											<Dropdown
												direction='bottom'
												items={[
													{
														text: event.description,
													},
													{
														text: `Ends at: ${new Date(
															event.endsAtTimestamp,
														).toDateString()}`,
													},
													{
														text: 'Take me there!',
														href: `/events/${event._id}`,
														tw: 'text-red-500',
													},
												]}
												newSpace={true}
												tw='pl-14'
											>
												<div
													className='flex flex-col items-center justify-center w-56 h-24 hover:scale-110 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer mb-3'
													style={{
														backgroundImage: `url(${event.banner})`,
														backgroundRepeat: 'no-repeat',
														backgroundSize: '100% 100%',
														backgroundPosition: 'center',
													}}
												>
													<h1 className='font-bold text-xl'>{event.title}</h1>
												</div>
											</Dropdown>
										</div>
									);
								})}
							</div>
						</AOS>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Home;
