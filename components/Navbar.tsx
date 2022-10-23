import { FC } from 'react';
import Image from 'next/image';

const Navbar: FC = () => {
	return (
		<nav className="bg-white text-black shadow-lg p-5 flex flex-row sm:justify-evenly justify-between">
			<Image
				src="/assets/logo.png"
				width="70"
				height="70"
				onClick={() => (window.location.href = '/')}
			/>
			<span className="sm:hidden block float-right">
				<Image
					src="/assets/icons/hamburger.svg"
					width={160}
					height={87}
				/>
			</span>
			<div className="hidden sm:block">
				<h1>Heading</h1>
				<div>
					<h2>peace</h2>
					<h2>peace</h2>
					<h2>peace</h2>
				</div>
			</div>
			<div className="hidden sm:block">
				<h1>Heading</h1>
				<div>
					<h2>peace</h2>
					<h2>peace</h2>
					<h2>peace</h2>
				</div>
			</div>
			<div className="hidden sm:block">
				<h1>Heading</h1>
				<div>
					<h2>peace</h2>
					<h2>peace</h2>
					<h2>peace</h2>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
