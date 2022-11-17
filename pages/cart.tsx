import { NextPage } from 'next';
import { IProduct } from '../src/models';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import ShoppingCartItem from '../components/ShoppingCartItem';
import { Product } from '../components/ProductCard';

interface Props {
	data: (IProduct & { _id: string; })[];
}

const ShoppingCart: NextPage<Props> = ({ data }) => {
	const [cart, setCart] = useState([]);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		if (typeof window === undefined) return;
		setCart(JSON.parse(window.localStorage.getItem('cart')!));
		cart.forEach((item: Product) => setPrice(prevPrice => prevPrice + item.price));
	}, []);

	return (
		<>
			{useMetaData('Aesculapia | Shopping Cart', 'Shopping Cart Page', '/cart')}
			<Layout>
				{!cart && (
					<p>Er zitten geen producten in de winkelwagen.</p>
				)}
				{cart && (
					<>
						<div className="container flex flex-row">
							<div className='mb-12'>
								<h1 className='text-4xl font-bold mb-5'>Winkelwagen</h1>
								<div className='grid grid-cols-1 divide-y'>
									{cart.map((item, i) => {
										return <ShoppingCartItem item={item} key={i}></ShoppingCartItem>;
									})}
								</div>
							</div>
							<div className=''>
								<p>{(price / 100).toFixed(2)}</p>
							</div>
						</div>
					</>
				)}
			</Layout>
		</>
	);
};

export default ShoppingCart;