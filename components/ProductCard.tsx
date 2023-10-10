import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { IProduct } from '../src/models/Product';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props {
	product: IProduct & { _id: string; };
	cart: DisplayProduct[];
	setCart: Dispatch<SetStateAction<DisplayProduct[]>>;
}

export interface DisplayProduct {
	_id: string;
	name: string;
	amount: number;
	price: number;
}

const ProductCard: FC<Props> = ({ product, cart, setCart }) => {

	const findItem = cart.findIndex(p => p._id === product._id);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		setAmount(cart[findItem]?.amount ?? 0);
	}, [cart, findItem]);

	const addItem = () => {
		if (product.stock <= 0) {
			return;
		}

		setAmount(amount + 1);
		product.stock--;

		if (findItem >= 0) {
			cart[findItem].amount = amount + 1;
		} else {
			cart.push({ _id: product._id, amount: 1, name: product.name, price: product.price });
		}

		setCart([...cart]);
	};

	const removeItem = () => {
		if (amount < 1) {
			return;
		}

		setAmount(amount - 1);
		product.stock++;

		if (findItem >= 0) {
			cart[findItem].amount = amount - 1;
		}

		if (cart[findItem].amount === 0) {
			cart.splice(findItem, 1);
		}

		setCart([...cart]);
	};

	return (
		<>
			<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative'>
				<Image className={(product.stock === 0 ? 'grayscale ' : '') + 'w-52 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={product.imageURL} alt={product.name} width='256' height='256' />
				<h2 className='text-3xl font-bold my-1'>{product.name}</h2>
				<p className='text-xl'>{(product.price / 100).toFixed(2)} EUR</p>
				<p className='text-md'>Nog {product.stock.toLocaleString('de')} op voorraad!</p>
				<div className='flex flex-row text-3xl items-center justify-center'>
					<AiOutlinePlus className={product.stock === 0 ? 'cursor-not-allowed' : 'hover:cursor-pointer'} onClick={addItem} />
					<AiOutlineMinus className={amount === 0 ? 'cursor-not-allowed' : 'hover:cursor-pointer'} onClick={removeItem} />
				</div>
			</div>
		</>
	);

};

export default ProductCard;

// return <>
// 	<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative' onClick={cartable ? ((event): void => {
// 		event?.stopPropagation();
// 		event.preventDefault();

// 		setAr(1);
// 	}) : undefined}>
// 		<img className={(product.stock === 0 ? 'grayscale ' : '') + 'w-52 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={product.imageURL} alt={product.name} width='256' height='256' />
// 		<h1 className='text-xl font-bold'>{product.name}</h1>
// 		<p className='text-lg absolute bottom-10 right-5 h-auto'>€{(product.price / 100).toFixed(2)}</p>
// 		<p className={product.stock === 0 ? 'text-red-700' : 'text-stone-700'}>{product.stock === 0 ? 'Out of stock' : `${product.stock} left`}</p>
// 		{
// 			cartData && cartData.find((e: Product) => e.name === product.name)
// 				&& (amount || (cartData.find((e: Product) => e.name === product.name)! as Product).amount > 0) && product.stock > 0 ?
// 				<>
// 					<button className='absolute -bottom-3 -right-3 h-10 w-10 bg-red-500 shadow-md flex items-center justify-center rounded-lg p-4 hover:bg-red-700 transition-all duration-300 ease-in-out' onClick={cartable ? ((event): void => {
// 						event?.stopPropagation();
// 						event.preventDefault();

// 						setAr(-1);
// 					}) : undefined}>
// 						<img src='/assets/icons/remove.svg' width={35} height={35} alt='Remove' />
// 					</button>
// 					<div className='absolute -top-3 -right-3 h-10 w-10 bg-gray-300 shadow-md flex items-center justify-center rounded-lg p-4 transition-all duration-300 ease-in-out'>
// 						<p>{amount !== 0 ? amount : (cartData.find((e: Product) => e.name === product.name)! as Product).amount}</p>
// 					</div>
// 				</> : <></>
// 		}
// 	</div>
// </>;