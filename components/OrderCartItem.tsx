import { FC } from 'react';

import { Product } from './ProductCard';

interface Props {
	item: Product & { _id: string; };
}

const OrderCartItem: FC<Props> = ({ item }) => {
	return <>
		<tr>
			<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
				<img className='w-24 sm:w-36 md:w-44 rounded-lg mt-2 mb-2' draggable={false} src={item.imageURL} alt={item.name} />
			</td>
			<td className="px-6 py-4 text-gray-800 whitespace-nowrap">
				<p>{item.name}</p>
			</td>
			<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
				<p className="text-lg">{item.amount}</p>
			</td>
			<td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
				<p>€{item.price.toFixed(2)}</p>
			</td>
		</tr>
		{/* <div className='flex'>
			<img className='w-24 sm:w-36 md:w-44 rounded-lg mt-2 mb-2' draggable={false} src={item.imageURL} alt={item.name} />
			<div className='flex-col mt-2 mb-2 ml-2'>
				<h1 className='text-xl font-bold'>{item.name}</h1>
				<p>€{(item.price / item.amount / 100).toFixed(2)} elk</p>
				<p>{item.amount} in cart</p>
			</div>
			<div className='flex-col absolute ml-[15rem] sm:ml-[34rem] md:ml-[35rem] lg:ml-[56rem] mt-2 mb-2'>
				<p className='text-lg text-end'>€{(item.price / 100).toFixed(2)}</p>
			</div>

		</div> */}
	</>;
};

export default OrderCartItem;