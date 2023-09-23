import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { IProduct } from '../src/models/Product';

interface Props {
	product: IProduct & { _id: string; };
	cartable: number;
	addCart: (value: Product) => undefined;
	getStorage: () => string | null;
	handleClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export interface Product {
	_id: string;
	name: string;
	amount: number;
	price: number;
	stock: number;
	imageURL: string;
}

const ProductCard: FC<Props> = ({ product, cartable, addCart, getStorage: storage }) => {
	const [ar, setAr] = useState(0);
	const [amount, setAmount] = useState(0);
	const [cartData, setCartData] = useState([]);

	useEffect(() => {
		if (ar === 0) return;
		if (!storage()) return;

		const cart = addCart({ _id: product._id, name: product.name, price: product.price, amount: ar === 1 ? 1 : -1, stock: product.stock, imageURL: product.imageURL });
		setAr(0);

		if (!cart) return;
		setAmount(cart);
		setCartData(JSON.parse(storage()!));
	}, [ar, addCart, storage, product, amount]);

	useEffect(() => {
		if (!storage()) return;
		setCartData(JSON.parse(storage()!));

	}, [storage]);

	return <>
		<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative' onClick={cartable ? ((event): void => {
			event?.stopPropagation();
			event.preventDefault();

			setAr(1);
		}) : undefined}>
			<img className={(product.stock === 0 ? 'grayscale ' : '') + 'w-52 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={product.imageURL} alt={product.name} width='256' height='256' />
			<h1 className='text-xl font-bold'>{product.name}</h1>
			<p className='text-lg absolute bottom-10 right-5 h-auto'>€{(product.price / 100).toFixed(2)}</p>
			<p className={product.stock === 0 ? 'text-red-700' : 'text-stone-700'}>{product.stock === 0 ? 'Out of stock' : `${product.stock} left`}</p>
			{
				cartData && cartData.find((e: Product) => e.name === product.name)
					&& (amount || (cartData.find((e: Product) => e.name === product.name)! as Product).amount > 0) && product.stock > 0 ?
					<>
						<button className='absolute -bottom-3 -right-3 h-10 w-10 bg-red-500 shadow-md flex items-center justify-center rounded-lg p-4 hover:bg-red-700 transition-all duration-300 ease-in-out' onClick={cartable ? ((event): void => {
							event?.stopPropagation();
							event.preventDefault();
							setAr(-1);
						}) : undefined}>
							<img src='/assets/icons/remove.svg' width={35} height={35} alt='Remove' />
						</button>
						<div className='absolute -top-3 -right-3 h-10 w-10 bg-gray-300 shadow-md flex items-center justify-center rounded-lg p-4 transition-all duration-300 ease-in-out'>
							<p>{amount !== 0 ? amount : (cartData.find((e: Product) => e.name === product.name)! as Product).amount}</p>
						</div>
					</> : <></>
			}
		</div>
	</>;
};

export default ProductCard;