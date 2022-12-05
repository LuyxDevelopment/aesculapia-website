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
				<p>€{(item.price / item.amount / 100).toFixed(2)} elk</p>
				<div className="grid grid-cols-2 place-items-end mb-4">
					<button onClick={(): void => {}} className='bottom-0 flex items-center bg-red-500 justify-center rounded-full p-2 hover:bg-red-700 transition-all duration-300 ease-in-out'>
						<p>Verwijderen uit winkelwagen</p>
					</button>
				</div>
			</div>
			<div className='flex-col absolute ml-[15rem] sm:ml-[34rem] md:ml-[35rem] lg:ml-[56rem] mt-2 mb-2'>
				<p className='text-lg text-end'>€{(item.price / 100).toFixed(2)}</p>
			</div>

		</div>
	</>;
};

export default ShoppingCartItem;