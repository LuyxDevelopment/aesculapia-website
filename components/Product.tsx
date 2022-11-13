import Image from 'next/image.js';
import React from 'react';
import { FC } from 'react';
import { IProduct } from '../src/models/Product.js';

interface Props {
	product: IProduct & {_id: string};
}

const Product: FC<Props> = ({ product }) => {
	return <>
		<div className='flex flex-row w-screen rounded-lg shadow-md'>
			<Image className="rounded-lg" src={product.imageURL} alt='Alt' width="512" height="512" />
			<div className="flex-col">
				<h1 className="text-2xl font-bold">{product.name}</h1>
				<p className="text-lg">€{product.price}</p>
				<p className="text-lg">Stock: {product.stock}</p>
				<div className="flex w-1/2">
				
					<p className="text-lg">{product.description}{product.description}{product.description}{product.description}{product.description}{product.description}{product.description}{product.description}{product.description}{product.description}</p>
				</div>
			</div>
		</div>
		<div className="relative w-full">
			<button className="absolute bottom-10 right-5 h-auto w-24 rounded-md bg-gradient-to-r from-slate-500 to-gray-600 font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110">Buy</button>
		</div>
	</>;
};

export default Product;