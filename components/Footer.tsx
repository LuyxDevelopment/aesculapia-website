import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: FC = () => {
	return (
		<footer className='flex flex-col p-10 bg-red-500 text-gray-100'>
			<div className='lg:flex lgflex-row justify-around pb-3'>
				<Image
					className='m-4'
					src='/assets/logo.png'
					alt='Logo'
					width='100'
					height='100'
				/>
				<div className='w-fit my-auto'>
					<Image
						src='/images/footer.jpg'
						width='600'
						height='100'
						alt='Footer Image'
					/>
				</div>
				<div className='flex flex-col m-5'>
					<h1 className='text-md md:text-3xl font-bold hover:no-underline transition ease-in-out duration-150'>
						Over ons
					</h1>
					<h2 className='lg:text-lg'>aesculapia@uantwerpen.be</h2>
					<h2 className='lg:text-lg'>Universiteitsplein 1 Antwerpen 2610, Belgium</h2>
					<h2 className='lg:text-lg'>Ondernemingsnummer: 0642590158</h2>
				</div>
			</div>
			<div className='py-8 flex flex-row items-center justify-center'>
				<span className='px-1'>
					<Link href='https://www.facebook.com/aesculapia/'>
						<Image
							src='/assets/icons/facebook.svg'
							width={50}
							height={50}
							alt='Facebook'
						/>
					</Link>
				</span>
				<span className='px-1'>
					<Link href='https://www.instagram.com/_aesculapia_'>
						<Image
							src='/assets/icons/instagram.svg'
							width={50}
							height={50}
							alt='Instagram'
						/>
					</Link>
				</span>
			</div>
			<h2 className='text-center pb-6 text-3xl'>Aesculapia</h2>
		</footer>
	);
};

export default Footer;