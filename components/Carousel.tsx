import { useState, FC } from 'react';
import Image from 'next/image';

export interface ImageData {
	name: string;
	id: number;
	url: string;
}

export interface CarouselProps {
	images: ImageData[];
	height: string;
}

const Carousel: FC<{ props: CarouselProps }> = ({ props }) => {
	const [current, setCurrent] = useState(0);

	const next = () => setCurrent((current + 1) % props.images.length);
	const prev = () =>
		setCurrent((current - 1 + props.images.length) % props.images.length);

	return (
		<div className="py-5 flex flex-row items-stretch justify-center h-full text-white">
			<button
				onClick={prev}
				className="text-4xl font-bold bg-red-400 w-12 rounded-l-lg"
			>
				{'<'}
			</button>
			<img
				src={props.images[current].url}
				width="90%"
				height={props.height}
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
