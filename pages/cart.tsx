import { NextPage, NextPageContext } from 'next';
import { IProduct, ProductDocument } from '../src/models';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import ShoppingCartItem from '../components/ShoppingCartItem';
import { BaseProps, ResponseData } from '../src/types';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
	data: (IProduct & { _id: string; })[];
}

const ShoppingCart: NextPage<Props> = ({ data }) => {
	const [cart, setCart] = useState([]);
	const [price, setPrice] = useState(0);
	const [modified, setModified] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (typeof window === undefined) return;
		const storage = JSON.parse(window.localStorage.getItem('cart')!);
		if (!storage) return;
		let p = 0;
		for (let i = 0; i < storage.length; i++) {
			const item = data.find(e => e._id === storage[i].id)!;
			if (item.stock < storage[i].amount) storage[i].amount = item.stock;
			p += item.price * storage[i].amount;
		}
		setPrice(p);
		setCart(storage);
	}, [data, setCart, setPrice]);

	useEffect(() => {
		if (typeof window === undefined) return;
		if (!modified) return;
		const cart = JSON.parse(window.localStorage.getItem('cart')!);
		let p = 0;
		for (let i = 0; i < cart.length; i++) {
			const item = data.find(e => e._id === cart[i].id)!;
			if (item.stock < cart[i].amount) cart[i].amount = item.stock;
			p += item.price * cart[i].amount;
		}
		setPrice(p);
		setCart(cart);
		setModified(false);
	}, [modified]);

	return (
		<>
			{useMetaData('Shopping Cart', 'Shopping Cart Page', '/cart')}
			<Layout>
				{!cart || !cart.length && (
					<div className='container flex flex-row'>
						<div className='mb-12'>
							<h1 className='text-4xl font-bold mb-5'>Winkelwagen</h1>
							<p>Er zitten geen producten in de winkelwagen.</p>
						</div>
					</div>
				)}
				{(cart && cart.length > 0) && (
					<>
						<div>
							<div className='2xl:ml-48 flex flex-col xl:flex-row container xl:divide-x'>
								<div className='mb-12 mr-2'>
									<h1 className='text-4xl font-bold mb-5'>Winkelwagen</h1>
									<div className='grid grid-cols-1 divide-y w-[25rem] sm:w-[40rem] md:w-[39rem] lg:w-[60rem]'>
										{cart.map((item, i) => {
											return (
												<ShoppingCartItem
													item={item}
													setModified={setModified}
													key={i}
												/>
											);
										})}
									</div>
								</div>
								<div className='h-screen xl:sticky top-0 px-2'>
									<h1 className='text-4xl font-bold mb-5'>Bestel</h1>
									<div className='lg:divide-y'>
										<div>
											<p className='font-bold'>Samenvatting van de bestelling</p>
										</div>
										<hr className='lg:w-0 w-64'></hr>
										<div className='flex flex-row gap-20'>
											<h1 className='font-bold text-xl'>Subtotaal</h1>
											<h1 className='font-bold text-xl'>€{(price / 100).toFixed(2)}</h1>
										</div>
									</div>
									<button type='submit' className='xl:absolute mb-2 mt-2 h-20 xl:w-full bg-red-500 shadow-md flex items-center justify-center rounded p-2 hover:bg-red-700 transition-all duration-300 ease-in-out' onClick={(): Promise<boolean> => router.push('/checkout')}>
										<div className='flex flex-row gap-10 items-center justify-center'>
											<p className='font-bold text-md'>Doorgaan naar kassa</p>
											<Image
												src='/assets/icons/arrow.svg'
												width={30}
												height={30}
												alt='Arrow'
											/>
										</div>
									</button>
								</div>
							</div>
						</div>	
					</>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = async ({ res }: NextPageContext): Promise<BaseProps<ProductDocument>> => {
	res?.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	);

	const request = await fetch(
		`${process.env.NEXT_PUBLIC_DOMAIN}/api/products`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		},
	);

	const data = (await request.json()) as ResponseData<ProductDocument | ProductDocument[]>;

	return {
		props: {
			data: data.data,
		},
	};
};

export default ShoppingCart;

