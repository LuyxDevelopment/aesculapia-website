import Image from 'next/image';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import Carousel, { ImageData } from '../components/Carousel';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';
import Carousel2 from '../components/Carousel2';

const images: ImageData[] = [
	{
		name: 'hello',
		id: 1,
		url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
	},
	{
		name: 'hello',
		id: 2,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=2`,
	},
	{
		name: 'hello',
		id: 3,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=3`,
	},
];

const events = [
	{
		_id: '1',
		title: 'Event 1',
		description: 'A Charity live event with many famous singers!',
		banner: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=Event`,
		endsAtTimestamp: Date.now() + 1000,
	},
	{
		_id: '2',
		title: 'Event 2',
		description: 'Longer Event Description',
		banner: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=Event`,
		endsAtTimestamp: Date.now() + 2000,
	},
	{
		_id: '3',
		title: 'Event 3',
		description: 'Even Longer Event Description',
		banner: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=Event`,
		endsAtTimestamp: Date.now() + 3000,
	},
];

const Index: NextPage = () => {
	const [current, setCurrent] = useState(0);

	const next = (): void => setCurrent((current + 1) % images.length);
	const prev = (): void => setCurrent((current - 1 + images.length) % images.length);
	
	return (
		<>
			{useMetaData('Home', 'Home Page', '/')}
			<Layout>
				<div className='h-screen w-screen bg-gray-800'>
					<Carousel2 images={images} fullScreen={true} />
					<div className='absolute top-36 left-20 xl:top-36 xl:left-48 text-gray-50'>
						<div className='flex flex-wrap w-56 sm:w-96'>
							<h1 className='text-5xl pb-6 font-bold break-normal'>
								Welkom op de website van Aesculapia!
							</h1>
							<p className='text-xl break-normal'>
								De studentenvereniging voor geneeskundestudenten aan de
								Universiteit Antwerpen.
							</p>
						</div>
					</div>
				</div>
				<div className='container mt-24'>
					<div className='my-6 flex flex-col sm:flex-row justify-between items-center'>
						<div>
							<h1 className='font-semibold text-4xl'>Wie zijn wij?</h1>
							<p className='italic'>
								We zijn een groep studenten met zoveel talent!
							</p>
						</div>
						<div className='px-5'></div>
						<Image
							src={
								process.env.NEXT_PUBLIC_DOMAIN +
								'/api/og?description=group%20photo%201'
							}
							width={1200}
							height={630}
							className='w-60 sm:w-72'
							alt='Alt'
						/>
					</div>
					<div className='mt-20'>
						<div className='flex flex-col-reverse sm:flex-row justify-between items-center'>
							<Image
								src={
									process.env.NEXT_PUBLIC_DOMAIN +
									'/api/og?description=group%20photo%202'
								}
								width={1200}
								height={630}
								className='w-60 sm:w-72'
								alt='Alt'
							/>
							<div className='px-5'></div>
							<div>
								<h1 className='font-semibold text-4xl'>
									Waar streven we naar?
								</h1>
								<p className='italic'>De wereld verbeteren!</p>
							</div>
						</div>
					</div>
					<div className='mt-32 mb-32'>
						<h1 className='text-center text-4xl font-bold mb-5'>
							Komende evenementen
						</h1>
						<div className='flex flex-col sm:flex-row items-center justify-evenly mb-5 text-gray-100 gap-20 sm:gap-0'>
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
													text: 'Purchase tickets!',
													href: `/events/${event._id}`,
													tw: 'text-red-500',
												},
											]}
											newSpace={true}
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
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Index;
