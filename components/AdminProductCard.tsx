import { FC } from 'react';
import { IProduct } from '../src/models/Product';

interface Props {
	product: IProduct & { _id: string };
}

const AdminProductCard: FC<Props> = ({ product }) => { 

	return <>
		<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative'>
			<img className={(product.stock === 0 ? 'grayscale ' : '') + 'w-52 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={product.imageURL} alt='Alt' width='256' height='256' />
			<h1 className='text-xl font-bold'>{product.name}</h1>
			<p className='text-lg absolute bottom-10 right-5 h-auto'>€{(product.price / 100).toFixed(2)}</p>
			<p className={product.stock === 0 ? 'text-red-700' : 'text-stone-700'}>{product.stock === 0 ? 'Out of stock' : `${product.stock} left`}</p>
			{
				<>
					<button className='absolute -bottom-3 -right-3 h-10 w-10 bg-red-500 shadow-md flex items-center justify-center rounded-full p-4 hover:bg-red-700 transition-all duration-300 ease-in-out'>
						<img src='/assets/icons/trashcan.svg' width={900} height={900} alt='Navbar'/>
					</button>
					<div className='absolute -top-3 -right-3 h-10 w-10 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-4 transition-all duration-300 ease-in-out'>
					</div>
				</>
			}
		</div>
	</>;
};

export default AdminProductCard;