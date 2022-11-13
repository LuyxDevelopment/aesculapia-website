import Image from 'next/image.js';
import React from 'react';
import { FC } from 'react';
import { IProduct } from '../src/models/Product.js';

interface Props {
	product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
	return <>
		<div className='bg-slate-300 p-4 rounded-lg shadow-md'>
			<Image src={product.imageURL} alt='Alt' />
			<h1>{product.name}</h1>
			<p>{product.description}</p>
		</div>
	</>;
};

export default ProductCard;
