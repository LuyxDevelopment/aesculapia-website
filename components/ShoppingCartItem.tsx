import { FC, useState } from 'react';

import { Product } from './ProductCard';
import { PlusIcon, MinusIcon, CloseIcon } from './Icons';

interface Props {
	item: Product & { _id: string; };
	setModified: (modified: boolean) => void;
}

const ShoppingCartItem: FC<Props> = ({ item, setModified }) => {
	const [deleted, setDeleted] = useState(false);
	const [cart, setCart] = useState<Product[]>([]);
	const [amount, setAmount] = useState(item.amount);
	const [price, setPrice] = useState(item.price);

	const removeFromCart = (): void => {
		if (window === undefined) return;
		if (!window.localStorage.getItem('cart')) return;
		if (!cart.length) setCart(JSON.parse(window.localStorage.getItem('cart')!));
		setCart(cart.filter((e: Product) => e.id !== item.id));
		setDeleted(true);

		window.localStorage.setItem('cart', JSON.stringify(cart));
		setModified(true);
	};

	const increaseAmount = (): void => {
		if (window === undefined) return;
		if (!window.localStorage.getItem('cart')) return;
		if (!cart.length) setCart(JSON.parse(window.localStorage.getItem('cart')!));
		if (item.stock < amount + 1) return;

		const newCart = cart;
		const newItem = newCart.find(cartItem => cartItem.id === item.id);
		if (!newItem) return;
		newItem.amount++;
		setCart(newCart);
		setPrice(newItem.amount * (price / amount));
		setAmount(newItem.amount);

		window.localStorage.setItem('cart', JSON.stringify(cart));
		setModified(true);
	};

	const decreaseAmount = (): void => {
		if (window === undefined) return;
		if (!window.localStorage.getItem('cart')) return;
		if (!cart.length) setCart(JSON.parse(window.localStorage.getItem('cart')!));
		if (amount - 1 < 0) return;
		if (amount - 1 === 0) return removeFromCart();

		const newCart = cart;
		const newItem = newCart.find(cartItem => cartItem.id === item.id);
		if (!newItem) return;
		newItem.amount--;
		setCart(newCart);
		setAmount(newItem.amount);
		setPrice(newItem.amount * (price / amount));

		window.localStorage.setItem('cart', JSON.stringify(cart));
		setModified(true);
	};
	
	return <>
		{!deleted && (
			<div className='flex'>
				<img className='w-24 sm:w-32 md:w-52 rounded-lg mt-2 mb-2' draggable={false} src={item.imageURL} alt={item.name} width='64' height='64' />
				<div className='flex-row mt-2 mb-2 ml-2 flex items-center w-full md:w-screen lg:w-full'>
					<div className='ml-1 flex flex-col'>
						<h1 className='text-xl font-bold'>{item.name}</h1>
						<p className='w-20 xl:w-28'>€{(price / amount / 100).toFixed(2)} elk</p>
					</div>
					<div className='sm:ml-16 md:ml-20 flex flex-row mb-4 relative w-full'>
						<div className='flex flex-row items-center justify-center gap-3'>
							<button onClick={(): void => increaseAmount()}>
								<PlusIcon className='w-6 h-6 fill-slate-300 transition-all duration-[200ms] ease-in-out hover:fill-red-700' />
							</button>
							<p className='w-4'>{amount}</p>
							<button onClick={(): void => decreaseAmount()}>
								<MinusIcon className='w-6 h-6 fill-slate-300 transition-all duration-[200ms] ease-in-out hover:fill-red-700' />
							</button>
						</div>
						<p className='ml-6 sm:ml-20 md:ml-24 lg:ml-52 xl:ml-44 text-lg'>€{(price / 100).toFixed(2)}</p>
						<button onClick={(): void => removeFromCart()} className='absolute md:-right-32 lg:right-3 right-3'>
							<CloseIcon className='w-6 h-6 fill-slate-300 transition-all duration-[200ms] ease-in-out hover:fill-red-700' />
						</button>
					</div>
				</div>
				{/* <div className='flex-col absolute ml-[15rem] sm:ml-[34rem] md:ml-[35rem] lg:ml-[56rem] mt-2 mb-2'>
					<p className='text-lg text-end'>€{(price).toFixed(2)}</p>
				</div> */}

			</div>
		)}
	</>;
};

export default ShoppingCartItem;