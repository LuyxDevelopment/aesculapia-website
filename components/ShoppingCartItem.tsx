import { FC } from 'react';
import { IProduct } from '../src/models/Product';
import { Product } from './ProductCard';

interface Props {
	item: Product & { _id: string; };
}

const ShoppingCartItem: FC<Props> = ({ item }) => {

	return <>
		<div className='flex'>
			<img className='w-24 sm:w-52 md:w-64 rounded-lg mt-2 mb-2' draggable={false} src={item.imageURL} alt={item.name} width='64' height='64' />
			<div className='flex-col mt-2 mb-2 ml-2'>
				<h1 className='text-xl font-bold'>{item.name}</h1>
				<p>€{(item.price / item.amount / 100).toFixed(2)} each</p>
			</div>
			<div className='flex-col ml-auto mr-0 mt-2 mb-2'>
				<p className='text-lg'>€{(item.price / 100).toFixed(2)}</p>
			</div>
			<div>
				<a></a>
			</div>
		</div>
	</>;
};

export default ShoppingCartItem;