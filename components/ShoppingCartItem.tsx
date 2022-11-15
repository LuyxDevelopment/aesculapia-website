import { FC } from 'react';
import { IProduct } from '../src/models/Product';

interface Props {
	item: IProduct & { _id: string; };
}

const ShoppingCartItem: FC<Props> = ({ item }) => {

	return <>
		<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative'>
			<img className={(item.stock === 0 ? 'grayscale ' : '') + 'w-52 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={item.imageURL} alt={item.name} width='256' height='256' />
			<h1 className='text-xl font-bold'>{item.name}</h1>
			<p className='text-lg absolute bottom-10 right-5 h-auto'>€{(item.price / 100).toFixed(2)}</p>
			<p className={item.stock === 0 ? 'text-red-700' : 'text-stone-700'}>{item.stock === 0 ? 'Out of stock' : `${item.stock} left`}</p>
		</div>
	</>;
};

export default ShoppingCartItem;