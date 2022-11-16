import { NextPage } from 'next';
import { ISponsor } from '../src/models/Sponsor';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { INTERNALS } from 'next/dist/server/web/spec-extension/request';
import ShoppingCartItem from '../components/ShoppingCartItem';

interface Props {
	data: (ISponsor & { _id: string; })[];
}

const Checkout: NextPage<Props> = ({ data }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (typeof window === undefined) return;
		setCart(JSON.parse(window.localStorage.getItem('cart')!));
	}, []);

	return (
		<>
			{useMetaData('Checkout', 'Checkout Page', '/checkout')}
			<Layout>
				{!cart && (
					<p>There are no products in the cart.</p>
				)}
				{cart && (
					<div className='container mb-12'>
						<h1 className='text-4xl font-bold mb-5'>Checkout</h1>
						<div className='grid grid-cols-1 divide-y'>
							{cart.map((item, i) => {
								return <ShoppingCartItem item={item} key={i}></ShoppingCartItem>;
							})}
						</div>
					</div>
				)}
			</Layout>
		</>
	);
};

export default Checkout;