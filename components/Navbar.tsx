import { FC } from 'react';
import Image from 'next/image';

const Navbar: FC = () => {
	return (
		<nav className="bg-white text-black shadow-lg p-3 flex flex-row justify-evenly">
			<Image
				src="/assets/logo.png"
				width="70"
				height="70"
			/>
			<div className="flex flex-col">
				<h1>Heading</h1>
				<div>
					<h2>peace</h2>
					<h2>peace</h2>
					<h2>peace</h2>
				</div>
			</div>
			<div className="flex flex-col">
				<h1>Heading</h1>
				<div>
					<h2>peace</h2>
					<h2>peace</h2>
					<h2>peace</h2>
				</div>
			</div>
			<div className="flex flex-col">
				<h1>Heading</h1>
				<div>
					<h2>peace</h2>
					<h2>peace</h2>
					<h2>peace</h2>
				</div>
			</div>
			<div className="flex flex-col">
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
