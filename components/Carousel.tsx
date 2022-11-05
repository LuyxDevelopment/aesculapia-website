import { useState, FC, useEffect } from 'react';
import Image from 'next/image';

export interface ImageData {
	name: string;
	id: number;
	url: string;
}

const Carousel: FC<{ images: ImageData[] }> = ({ images }) => {
	const [current, setCurrent] = useState(0);

	const next = () => setCurrent((current + 1) % images.length);
	const prev = () => setCurrent((current - 1 + images.length) % images.length);

	return (
		<div className="py-5 flex flex-row items-stretch justify-center text-white">
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
				onClick={prev}
				className="text-4xl font-bold bg-red-400 w-12 rounded-r-lg"
			>
				{'>'}
			</button>
		</div>
	);
};

export default Carousel;
