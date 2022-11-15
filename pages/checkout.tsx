import { NextPage } from 'next';
import { ISponsor } from '../src/models/Sponsor';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

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
						<h1 className='text-4xl font-bold mb-5'>Sponsors</h1>
						<p className='text-xl'>
							These sponsors help fund our mission.
						</p>
						<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
							{(cart).map((item, i) => {
								return (<>
									<h1 key={i}>{item.name}</h1>
									<p key={i}>{item.amount}</p>
								</>

								);
							})}
						</div>
					</div>
				)}
			</Layout>
		</>
	);
};

export default Checkout;