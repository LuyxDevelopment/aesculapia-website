import { useState, FC, useEffect } from 'react';
import Image from 'next/image';

export interface ImageData {
	name: string;
	id: number;
	url: string;
}

interface Props {
	images: ImageData[];
	fullScreen?: boolean;
}

const Carousel: FC<Props> = ({ images, fullScreen }) => {
	const [current, setCurrent] = useState(0);

	const next = () => setCurrent((current + 1) % images.length);
	const prev = () => setCurrent((current - 1 + images.length) % images.length);

	return (
		<div
			className={`py-5 flex flex-row items-stretch justify-center text-white ${
				fullScreen ? 'h-screen' : ''
			}`}
		>
			<button
				onClick={prev}
				className="text-4xl font-bold bg-red-400 w-12 rounded-l-lg"
			>
				{'<'}
			</button>
			<img
				src={images[current].url}
				width="90%"
				height="100vh"
			/>
			<button
				onClick={next}
				className="text-4xl font-bold bg-red-400 w-12 rounded-r-lg"
			>
				{'>'}
			</button>
		</div>
	);
};

export default Carousel;
