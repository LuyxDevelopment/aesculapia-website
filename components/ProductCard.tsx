import Image from 'next/image.js';
import React from 'react';
import { FC } from 'react';
import { IProduct } from '../src/models/Product.js';

interface Props {
	product: IProduct & {_id: string};
}

const ProductCard: FC<Props> = ({ product }) => {
	return <>
		<div className='bg-gray-300 p-4 rounded-lg shadow-md cursor-pointer' onClick={(): string => (window.location.href = `/products/${product._id}`)}>
			<Image className="rounded-lg" src={product.imageURL} alt='Alt' width="256" height="256" />
			<h1>{product.name}</h1>
			<p>€{product.price}</p>
			<p>Stock: {product.stock}</p>
		</div>
	</>;
};

export default ProductCard;
