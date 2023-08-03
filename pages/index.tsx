import Image from 'next/image';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import { ImageData } from '../components/Carousel';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';
import Carousel2 from '../components/Carousel2';

const images: ImageData[] = [
	{
		name: 'Aesculapia Group',
		id: 1,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/group.jpg`,
	},
	{
		name: 'hello',
		id: 2,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/stairs.jpg`,
	}
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
					<Carousel2 images={images} />
					<div className='bg-gray-900 bg-opacity-50 p-4 rounded-md absolute top-2/3 lg:top-3/4 lg:left-1/3 lg:right-1/3 text-gray-50 z-10'>
						<div className='flex flex-wrap mx-auto text-center'>
							<h1 className='text-3xl lg:text-7xl pb-6 font-bold break-normal'>
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
							<p className='text-lg italic'>
								We zijn een studentenvereniging van en voor studenten Geneeskunde in Antwerpen. Wij zijn er zodat studenten zich naast hun studies ook kunnen ontspannen en elkaar beter leren kennen. Zo liggen we aan de basis van vele hechte vriendschappen. Dit door onze bijna wekelijkse activiteiten van TD’s en cantussen tot lezingen en meer. Verder ondersteunen we studenten ook bij hun studie onder andere door onze survivalgids.
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
