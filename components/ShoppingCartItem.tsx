import { FC } from 'react';
import { IProduct } from '../src/models/Product';
import { Product } from './ProductCard';

interface Props {
	item: Product & { _id: string; };
}

const ShoppingCartItem: FC<Props> = ({ item }) => {

	return <>
		<div className='flex'>
			<img className='w-24 sm:w-52 md:w-64 rounded-lg' draggable={false} src={item.imageURL} alt={item.name} width='64' height='64' />
			<div className='flex-col'>
				<h1 className='text-xl font-bold'>{item.name}</h1>
				<p>€{(item.price / item.amount / 100).toFixed(2)} each</p>
			</div>
			<div className='flex-col sm:absolute sm:right-96'>
				<p className='text-lg'>€{(item.price / 100).toFixed(2)}</p>
			</div>
		</div>
		{/* <div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative'>
			<img className={(item.stock === 0 ? 'grayscale ' : '') + 'w-52 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={item.imageURL} alt={item.name} width='256' height='256' />
			<h1 className='text-xl font-bold'>{item.name}</h1>
			<p className='text-lg absolute bottom-10 right-5 h-auto'>€{(item.price / 100).toFixed(2)}</p>
			<p className={item.stock === 0 ? 'text-red-700' : 'text-stone-700'}>{item.stock === 0 ? 'Out of stock' : `${item.stock} left`}</p>
		</div> */}
	</>;
};

export default ShoppingCartItem;