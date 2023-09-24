import Image from 'next/image';
import type { NextPage, NextPageContext } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import { ImageData } from '../components/Carousel';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';
import Carousel2 from '../components/Carousel2';
import { EventDocument } from '../src/models/Event';
import { BaseProps, ResponseData } from '../src/types/index.js';

const images: ImageData[] = [
	{
		name: 'Aesculapia Group',
		id: 1,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/group2.jpg`,
	},
	{
		name: 'hello',
		id: 2,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/party1.jpg`,
	},
	{
		name: 'Party 1',
		id: 2,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/group1.jpg`,
	},
	{
		name: 'Party 2',
		id: 2,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/party2.jpg`,
	}
];

const Index: NextPage<{ data: EventDocument[]; }> = ({ data }) => {
	const [current, setCurrent] = useState(0);

	const next = (): void => setCurrent((current + 1) % images.length);
	const prev = (): void => setCurrent((current - 1 + images.length) % images.length);

	return (
		<>
			{useMetaData('Home', 'Home Page', '/')}
			<Layout>
				<div className='h-96 lg:h-1/3 w-screen'>
					<Carousel2 images={images} />
					<div className='bg-gray-900 bg-opacity-50 p-4 rounded-md absolute top-80 lg:top-2/3 lg:left-1/3 lg:right-1/3 text-gray-50 z-10'>
						<div className='flex flex-wrap mx-auto text-center'>
							<h1 className='text-3xl md:text-5xl lg:text-5xl xl:text-6xl pb-6 font-bold break-normal'>
								Welkom op de website van Aesculapia!
							</h1>
							<p className='text-xl break-normal'>
								De studentenvereniging voor geneeskundestudenten aan de
								Universiteit Antwerpen.
							</p>
						</div>
					</div>
				</div>
				<div className='container md:w-3/4 mx-auto md:mt-72 lg:mt-[20vw]'>
					<div className='my-6 flex flex-col sm:flex-row justify-between items-center'>
						<div className='lg:m-5'>
							<h1 className='font-semibold text-4xl'>Wie zijn wij?</h1>
							<p className='text-lg italic'>
								We zijn een studentenvereniging van en voor studenten Geneeskunde in Antwerpen. Wij zijn er zodat studenten zich naast hun studies ook kunnen ontspannen en elkaar beter leren kennen. Zo liggen we aan de basis van vele hechte vriendschappen. Dit door onze bijna wekelijkse activiteiten van TD’s en cantussen tot lezingen en meer. Verder ondersteunen we studenten ook bij hun studie onder andere door onze survivalgids.
							</p>
						</div>
						<div className='px-5'></div>
						<Image
							src={process.env.NEXT_PUBLIC_DOMAIN + '/images/group1.jpg'}
							width={1200}
							height={630}
							className='w-60 lg:w-96 rounded-md mt-16'
							alt='Alt'
						/>
					</div>
					<div className='mt-32 mb-32'>
						<h1 className='text-center text-4xl font-bold mb-10'>
							Komende evenementen
						</h1>
						<div className='flex flex-col sm:flex-row items-center justify-evenly mb-5 text-gray-100 gap-20 sm:gap-0'>
							{data.map((event, i) => {
								return (
									<div key={i}>
										<Dropdown
											direction='bottom'
											items={[
												{
													text: event.description,
												},
												{
													text: `Eindigt bij: ${new Date(
														event.endsAtTimestamp,
													).toDateString()}`,
												},
												{
													text: 'Purchase tickets!',
													href: `/evenements/${event._id}`,
													tw: 'text-red-500',
												},
											]}
											newSpace={true}
										>
											<div className='flex flex-col items-center justify-center w-56 h-24 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer mb-3'											>
												<Image
													className='shadow-lg'
													src={event.bannerURL}
													width={100}
													height={100}
													alt={event.name}
												/>
												<h1 className='font-bold text-xl text-gray-900'>{event.name}</h1>
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

export const getServerSideProps = async ({ res }: NextPageContext): Promise<BaseProps<EventDocument>> => {
	res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const request = await fetch(
		`${process.env.NEXT_PUBLIC_DOMAIN}/api/events`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		},
	);

	const data = (await request.json()) as ResponseData<EventDocument | EventDocument[]>;

	return {
		props: {
			data: data.data,
		},
	};
};

