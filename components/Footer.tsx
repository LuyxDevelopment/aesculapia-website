import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const Footer: FC = () => {
	return (
		<footer className="flex flex-col p-10 bg-red-500 text-white">
			<div className="flex flex-row justify-around pb-3">
				<Image
					src="/assets/logo.png"
					width="100"
					height="100"
				/>
				<div className="felx flex-col">
					<h1 className="f-header">Penises</h1>
					<h2>lol</h2>
					<h2>lol</h2>
					<h2>lol</h2>
					<h2>lol</h2>
				</div>
				<div className="felx flex-col">
					<h1 className="f-header">Penises</h1>
					<h2>lol</h2>
					<h2>lol</h2>
					<h2>lol</h2>
					<h2>lol</h2>
				</div>
			</div>
			<div className="py-8 flex flex-row items-center justify-center space-x-5">
				<h1>dickord</h1>
				<h1>dickord</h1>
				<h1>dickord</h1>
			</div>
			<h1 className="text-center pb-6">aesculpia inc penis</h1>
		</footer>
	);
};

export default Footer;
