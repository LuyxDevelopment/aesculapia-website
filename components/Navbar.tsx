//TODO: Make hamburger icon work

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar: FC = () => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<>
			<nav className="bg-white text-black shadow-lg p-5 flex flex-row justify-between sm:justify-evenly items-center">
				<Image
					src="/assets/logo.png"
					width="70"
					height="70"
					alt="Logo"
					onClick={() => (window.location.href = '/')}
				/>
				<div className="hidden sm:flex sm:flex-row sm:space-x-10 font-extrabold">
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Song
					</h1>
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Products
					</h1>
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Calendar
					</h1>
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Sponsors
					</h1>
				</div>
				<span
					className="block float-right sm:hidden cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out"
					onClick={() => setShowMenu(!showMenu)}
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
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Song
					</h1>
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Products
					</h1>
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Calendar
					</h1>
					<h1 className="cursor-pointer hover:underline transition-all duration-300 ease-in-out">
						Sponsors
					</h1>
				</div>
			)}
		</>
	);
};

export default Navbar;
