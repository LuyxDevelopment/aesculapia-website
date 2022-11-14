//TODO: Make hamburger icon work

import { FC } from 'react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
	isAdmin: boolean;
}

const Navbar: FC<Props> = ({ isAdmin }) => {
	const [showMenu, setShowMenu] = useState(false);
	console.log(isAdmin);
	return (
		<>
			<nav className={(isAdmin ? 'bg-red-500 ' : 'bg-white ') + 'text-black shadow-lg p-3 flex flex-row justify-between sm:justify-evenly items-center'} >
				<div className='cursor-pointer'>
					<Image
						src='/assets/logo.png'
						width='60'
						height='60'
						alt='Logo'
						onClick={(): string => (window.location.href = '/')}
					/>
				</div>
				<div className='hidden sm:flex sm:flex-row sm:space-x-10 font-extrabold'>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out' onClick={(): string => (window.location.href =  '/')}>
						Home
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out' onClick={(): string => (window.location.href = isAdmin ? '/admin/products' : '/products')}>
						Products
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out' onClick={(): string => (window.location.href = isAdmin ? '/admin/events' : '/events')}>
						Events
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out' onClick={(): string => (window.location.href = isAdmin ? '/admin/news' : '/news')}>
						News
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out' onClick={(): string => (window.location.href = isAdmin ? '/admin/song' : '/song')}>
						Song
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out' onClick={(): string => (window.location.href = isAdmin ? '/admin/sponsors' : '/sponsors')}>
						Sponsors
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out' onClick={(): string => (window.location.href = '/admin')}>
						Admin
					</h1>
				</div>
				<span
					className='block float-right sm:hidden cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out'
					onClick={(): void => setShowMenu(!showMenu)}
				>
					<Image
						src='/assets/icons/hamburger.svg'
						width={35}
						height={35}
						alt='Navbar'
					/>
				</span>
			</nav>
			{showMenu && (
				<div className='animate-translate_top flex flex-col items-center justify-center sm:hidden bg-gray-200 shadow-xl p-3 font-extrabold mt-5'>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out'>
						Song
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out'>
						Products
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out'>
						Events
					</h1>
					<h1 className='cursor-pointer hover:underline transition-all duration-300 ease-in-out'>
						Sponsors
					</h1>
				</div>
			)}
		</>
	);
};

export default Navbar;
