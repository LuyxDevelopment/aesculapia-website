import Image from 'next/image';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import Carousel, { ImageData } from '../components/Carousel';
import Dropdown from '../components/Dropdown';

const images: ImageData[] = [
	{
		name: 'hello',
		id: 1,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=1`,
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
	return (
		<>
			{useMetaData('Home', 'Home Page', '/')}
			<Layout>
				<div className="relative">
					<div className="absolute top-10 left-14 sm:left-20 text-black">
						<div className="flex flex-wrap w-56 sm:w-96">
							<h1 className="text-5xl pb-6 font-bold text-white">
								Welkom op de website van Aesculapia!
							</h1>
							<p className="text-xl text-white">
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
				<div className="container mt-24">
					<div className="my-6 flex flex-col sm:flex-row justify-between items-center">
						<div>
							<h1 className="font-semibold text-4xl">Wie zijn wij?</h1>
							<p className="italic">
								We zijn een groep studenten met zoveel talent!
							</p>
						</div>
						<div className="px-5"></div>
						<Image
							src={
								process.env.NEXT_PUBLIC_DOMAIN +
								'/api/og?description=group%20photo%201'
							}
							width={1200}
							height={630}
							className="w-60 sm:w-72"
							alt="Alt"
						/>
					</div>
					<div className="mt-20">
						<div className="flex flex-col-reverse sm:flex-row justify-between items-center">
							<Image
								src={
									process.env.NEXT_PUBLIC_DOMAIN +
									'/api/og?description=group%20photo%202'
								}
								width={1200}
								height={630}
								className="w-60 sm:w-72"
								alt="Alt"
							/>
							<div className="px-5"></div>
							<div>
								<h1 className="font-semibold text-4xl">
									Waar streven we naar?
								</h1>
								<p className="italic">De wereld verbeteren!</p>
							</div>
						</div>
					</div>
					<div className="mt-32 mb-32">
						<h1 className="text-center text-4xl font-bold mb-5">
							Komende evenementen
						</h1>
						<div className="flex flex-col sm:flex-row items-center justify-evenly mb-5 text-white">
							{events.map((event, i) => {
								return (
									<div key={i}>
										<Dropdown
											direction="bottom"
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
											tw="pl-14 mb-5"
										>
											<div
												className="flex flex-col items-center justify-center w-56 h-24 hover:scale-110 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer mb-3"
												style={{
													backgroundImage: `url(${event.banner})`,
													backgroundRepeat: 'no-repeat',
													backgroundSize: '100% 100%',
													backgroundPosition: 'center',
												}}
											>
												<h1 className="font-bold text-xl">{event.title}</h1>
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
