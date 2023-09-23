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

const Carousel: FC<Props> = ({ images }) => {
	const [current, setCurrent] = useState(0);

	const next = (): void => {
		const image = document.getElementById('bgimage');
		setCurrent((current + 1) % images.length);
	};

	const prev = (): void => {
		const image = document.getElementById('bgimage');
		setCurrent((current - 1 + images.length) % images.length);
	};

	return (
		<div id='bgimage' className='sm:mb-10 flex flex-row h-1/2 sm:h-full w-auto mt-8 sm:mt-0'>
			<button
				onClick={prev}
				className='flex text-4xl h-full font-bold bg-transparent items-center hover:bg-gray-800 hover:bg-opacity-20 transition-all ease-in-out duration-300 w-10 lg:w-36 rounded-l-lg'
			>
				<Image className='z-10 absolute left-10 hidden lg:block'
					src='/assets/icons/left.svg'
					width={50}
					height={50}
					alt='Left'
				/>
			</button>
			<div className='h-1/3'>
				<Image src={images[current].url} width={1080} height={740} alt={'hello'} className='w-screen' />
			</div>
			<button
				onClick={next}
				className='flex text-4xl h-full font-bold bg-transparent items-center hover:bg-gray-800 hover:bg-opacity-20 transition-all ease-in-out duration-300 w-10 lg:w-36 rounded-r-lg'
			>
				<Image className='z-10 absolute right-10 hidden lg:block'
					src='/assets/icons/right.svg'
					width={50}
					height={50}
					alt='Right'
				/>
			</button>
		</div >
	);
};

export default Carousel;