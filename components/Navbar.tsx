import { FC } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { NavBarPage } from '../src/types';

const pages: NavBarPage[] = [
	{
		name: 'Home',
		url: '/',
	},
	{
		name: 'Knuppeltje',
		url: '/knuppeltje',
	},
	{
		name: 'Events',
		url: '/events',
	},
	{
		name: 'News',
		url: '/news',
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
	{
		name: '🛒',
		url: '/cart',
		svg: '/assets/icons/shopping-cart.svg',
	},
];

const Navbar: FC = () => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<>
			<nav
				className={'bg-red-500 text-white shadow-lg p-3 flex flex-row justify-between sm:justify-evenly items-center'}>
				<div className="cursor-pointer">
					<Image
						src="/assets/logo.png"
						width="50"
						height="60"
						alt="Logo"
						onClick={(): string => (window.location.href = '/')}
					/>
				</div>
				<div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-evenly font-extrabold">
					{pages.map(({ name, url, svg }, i) => {
						return (
							<>
								{svg ?
									<Image className='cursor-pointer m2-1 mr-2' src={svg} width={20} height={20} alt="Navbar button" key={i} onClick={(): string => (window.location.href = url)}/>
									: <h1
										className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 ml-1 mr-1 rounded-2xl transition-all duration-300 ease-in-out"
										onClick={(): string => (window.location.href = url)}
										key={i}>
										{name}
									</h1>}
							</>
						);
					})}
				</div>
				<span
					className="block float-right sm:hidden cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out"
					onClick={(): void => setShowMenu(!showMenu)}
				>
					<Image
						src="/assets/icons/hamburger.svg"
						width={35}
						height={35}
						alt="Navbar"
					/>
				</span>
			</nav>
			{showMenu && (
				<div className="animate-translate_top flex flex-col items-center justify-center sm:hidden bg-gray-200 shadow-xl p-3 font-extrabold mt-5">
					{pages.map(({ name, url }, i) => {
						return (
							<h1
								className="cursor-pointer hover:underline transition-all duration-300 ease-in-out"
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
