import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import type { NextPage } from 'next';
import Carousel, { ImageData } from '../components/Carousel';
import { useEffect } from 'react';

const images: ImageData[] = [
	{
		name: 'hello',
		id: 1,
		url: 'http://localhost:3000/api/og?description=man',
	},
	{
		name: 'hello',
		id: 2,
		url: 'http://localhost:3000/api/og?description=manandwomen',
	},
	{
		name: 'hello',
		id: 3,
		url: 'http://localhost:3000/api/og?description=manandwomenandkids',
	},
];

const Home: NextPage = () => {
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show-aos');
				} else {
					entry.target.classList.remove('show-aos');
				}
			});
		});
		const hidden = document.querySelectorAll('.hidden-aos');
		hidden.forEach((el) => observer.observe(el));
	});
	return (
		<>
			{useMetaData('Aesculapia', 'Home Page', '/')}
			<Layout>
				<div className="relative">
					<div className="absolute top-10 left-14 sm:left-20 text-white">
						<div className="flex flex-wrap w-96">
							<h1 className="text-3xl pb-2 font-bold">
								Welcome to the website of Aesculapia!
							</h1>
							<p className="text-xl">
								The student's association for medical students at the University
								of Antwrep.
							</p>
						</div>
					</div>
					<div className="h-[100vh]">
						<Carousel images={images} />
					</div>
				</div>
				<div className="mt-6 hidden-aos">
					<h1>About us</h1>
				</div>
			</Layout>
		</>
	);
};

export default Home;
