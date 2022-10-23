import Image from 'next/image';
import type { FC } from 'react';

const Footer: FC = () => {
	return (
		<footer className="flex flex-col p-10 bg-red-500 text-white">
			<div className="flex flex-row justify-around pb-3">
				<Image
					src="/assets/logo.png"
					alt="Logo"
					width="100"
					height="100"
				/>
				<div className="felx flex-col">
					<h1 className="f-header">1</h1>
					<h2>1</h2>
					<h2>2</h2>
					<h2>3</h2>
					<h2>4</h2>
				</div>
				<div className="felx flex-col">
					<h1 className="f-header">2</h1>
					<h2>1</h2>
					<h2>2</h2>
					<h2>3</h2>
					<h2>4</h2>
				</div>
			</div>
			<div className="py-8 flex flex-row items-center justify-center space-x-5">
				<Image
					src="/assets/icons/facebook.svg"
					width={50}
					height={50}
				/>
				<Image
					src="/assets/icons/linkedin.svg"
					width={50}
					height={50}
				/>
				<Image
					src="/assets/icons/youtube.svg"
					width={50}
					height={50}
				/>
				<Image
					src="/assets/icons/instagram.svg"
					width={50}
					height={50}
				/>
			</div>
			<h1 className="text-center pb-6">Aesculapia</h1>
		</footer>
	);
};

export default Footer;
