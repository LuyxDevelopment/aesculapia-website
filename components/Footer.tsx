/* eslint-disable @next/next/no-img-element */
import type { FC } from 'react';

const Footer: FC = () => {
	return (
		<footer className='flex flex-col p-10 bg-red-500 text-white'>
			<div className='flex flex-row justify-around pb-3'>
				<img
					src='/assets/logo.png'
					alt='Logo'
					width='100'
					height='100'
				/>
				<div className='felx flex-col'>
					<h1 className='text-xl font-bold hover:no-underline transition ease-in-out duration-150'>Over ons</h1>
					<h2>Email:</h2>
					<h2>Contact:</h2>
					<h2>Info:</h2>
					<h2>Adres:</h2>
					<h2>Ondernemingsnummer: </h2>
				</div>
			</div>
			<div className='py-8 flex flex-row items-center justify-center'>
				<span className='px-1'>
					<img
						src='/assets/icons/facebook.svg'
						width={50}
						height={50}
						alt='Facebook'
					/>
				</span>
				<span className='px-1'>
					<img
						src='/assets/icons/linkedin.svg'
						width={50}
						height={50}
						alt='LinkedIn'
					/>
				</span>
				<span className='px-1'>
					<img
						src='/assets/icons/youtube.svg'
						width={50}
						height={50}
						alt='YouTube'
					/>
				</span>
				<span className='px-1'>
					<img
						src='/assets/icons/instagram.svg'
						width={50}
						height={50}
						alt='Instagram'
					/>
				</span>
			</div>
			<h1 className='text-center pb-6'>Aesculapia</h1>
		</footer>
	);
};

export default Footer;
