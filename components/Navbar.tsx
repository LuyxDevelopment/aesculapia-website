import { FC } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Dropdown, { DropdownItem } from './Dropdown';
import { NavBarPage } from '../src/types';

const shopping: DropdownItem[] = [
	{
		text: 'Webshop',
		href: '/webshop',
	},
	{
		text: 'Kassa',
		href: '/kassa',
	},
];

const about: DropdownItem[] = [
	{
		text: 'Clublied',
		href: '/clublied',
	},
	{
		text: 'Lidkaart',
		href: '/lidkaart',
	},
	{
		text: 'Praesidium',
		href: '/praesidium',
	},
];

const pages: NavBarPage[] = [
	{
		name: 'Evenementen',
		url: '/evenementen',
	},
	{
		name: 'Knuppeltje',
		url: '/knuppeltje',
	},
	{
		name: 'Sponsors',
		url: '/sponsors',
	},
];

const mobilePages: NavBarPage[] = [
	{
		name: 'Home',
		url: '/',
	},
	{
		name: 'Clublied',
		url: '/clublied',
	},
	{
		name: 'Knuppeltje',
		url: '/knuppeltje',
	},
	{
		name: 'Evenementen',
		url: '/evenementen',
	},
	{
		name: 'Lidkaart',
		url: '/lidkaart',
	},
	{
		name: 'Webshop',
		url: '/webshop',
	},
	{
		name: 'Praesidium',
		url: '/praesidium',
	},
	{
		name: 'Sponsors',
		url: '/sponsors',
	},
	// {
	// 	name: '🛒',
	// 	url: '/cart',
	// },
];

const Navbar: FC = () => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<>
			<nav
				className={
					'bg-red-500 text-gray-100 shadow-lg p-3 flex flex-row justify-between sm:justify-evenly items-center'
				}
			>
				<div className='cursor-pointer'>
					<Image
						src='/assets/logo.png'
						width='50'
						height='60'
						alt='Logo'
						onClick={(): string => (window.location.href = '/')}
					/>
				</div>
				<div className='hidden sm:flex sm:flex-row sm:items-center sm:justify-evenly font-extrabold'>
					{pages.map((page, i) => {
						return (
							<h1
								className='cursor-pointer bg-red-500 hover:bg-red-600 font-bold py-2 px-3 ml-1 mr-1 rounded-lg transition-all duration-300 ease-in-out'
								onClick={(): string => (window.location.href = page.url)}
								key={i}
							>
								{page.name}
							</h1>
						);
					})}
					<Dropdown
						direction='bottom'
						items={about}
						tw='z-10'
					>
						<div className='flex flex-row gap-0 hover:bg-red-600 rounded-lg transition-all duration-300 ease-in-out pr-3'>
							<h1 className='cursor-pointer font-bold py-2 px-3 ml-1'>
								About
							</h1>
							<Image
								src='/assets/icons/down.svg'
								width={15}
								height={15}
								alt='Dropdown arrow'
							/>
						</div>
					</Dropdown>
					<Dropdown
						direction='bottom'
						items={shopping}
						tw='z-10'
					>
						<div className='flex flex-row gap-0 hover:bg-red-600 rounded-2xl transition-all duration-300 ease-in-out pr-3'>
							<h1 className='cursor-pointer font-bold py-2 px-3 ml-1 h-full'>
								Shopping
							</h1>
							<Image
								src='/assets/icons/down.svg'
								width={15}
								height={15}
								alt='Dropdown arrow'
							/>
						</div>
					</Dropdown>
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
				<div className='animate-translate_top flex flex-col items-center justify-center sm:hidden bg-gray-200 shadow-xl p-3 font-extrabold mt-5 z-10'>
					{mobilePages.map(({ name, url }, i) => {
						return (
							<h1
								className='cursor-pointer hover:underline transition-all duration-300 ease-in-out'
								onClick={(): string => (window.location.href = url)}
								key={i}
							>
								{name}
							</h1>
						);
					})}
				</div>
			)}
		</>
	);
};

export default Navbar;