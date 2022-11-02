import { useState, FC } from 'react';
// import Image from 'next/image';

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
		<>
			<div className="slider-container">
				{images.map((image, i) => {
					return (
						<div
							key={i}
							className={
								images[current].id === image.id ? 'fade' : 'slide fade'
							}
						>
							<div className="image">
								<img
									src={image.url}
									alt={image.name}
									width="100%"
									height={300}
								/>
							</div>
						</div>
					);
				})}
				<button
					className="prev"
					onClick={prev}
				>
					&lt;
				</button>
				<button
					className="next"
					onClick={next}
				>
					&gt;
				</button>
			</div>
		</>
	);
};

export default Carousel;
