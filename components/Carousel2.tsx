import { useState, FC } from 'react';
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

	const next = (): void => {
		const image = document.getElementById('bgimage');
		setCurrent((current + 1) % images.length);
		image!.style.backgroundImage = `url(${images[current].url})`;
	};
	
	const prev = (): void => {
		const image = document.getElementById('bgimage');
		setCurrent((current - 1 + images.length) % images.length);
		image!.style.backgroundImage = `url(${images[current].url})`;
	};

	return (
		<div id='bgimage' className='h-full w-full bg-cover bg-no-repeat bg-center'
			style={{ backgroundImage: `url(${images[0].url})` }}>
			<button
				onClick={prev}
				className='text-4xl h-full font-bold bg-transparent hover:bg-gray-800 hover:bg-opacity-20 transition-all ease-in-out duration-300 w-36 rounded-l-lg'
			>
				<Image
					src='/assets/icons/left.svg'
					width={50}
					height={50}
					alt='Left'
				/>
			</button>
			<button
				onClick={next}
				className='text-4xl font-bold bg-transparent hover:bg-gray-800 hover:bg-opacity-20 transition-all ease-in-out duration-300 w-36 rounded-r-lg float-right h-full'
			>
				<Image className='z-10'
					src='/assets/icons/right.svg'
					width={50}
					height={50}
					alt='Right'
				/>
			</button>
		</div>
	);
};

export default Carousel;
