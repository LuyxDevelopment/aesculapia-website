import { NextPage, NextPageContext } from 'next';
import ProductCard, { DisplayProduct } from '../components/ProductCard';
import { IProduct, ProductDocument } from '../src/models/Product';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import ErrorPage from '../components/Error';
import { BaseProps, ResponseData } from '../src/types/index';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link.js';

interface Props {
	data: (IProduct & { _id: string; })[];
}

const Webshop: NextPage<Props> = ({ data }) => {
	const [cart, setCart] = useState<DisplayProduct[]>([]);

	useEffect(() => {
		if (!cart.length && Cookies.get('cart')) {
			setCart([...JSON.parse(Cookies.get('cart')!)]);
		}
	}, []);

	useEffect(() => {
		Cookies.set('cart', JSON.stringify(cart), { expires: new Date(new Date().getTime() + 15 * 60 * 1000) });
	}, [cart]);

	return (
		<>
			{useMetaData('Webshop', 'Webshop', '/Webshop')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<div className='container mb-12 w-screen'>
						<div className='lg:flex gap-x-10 h-full'>
							<div>
								<h1 className='text-5xl font-bold mb-5'>Webshop</h1>
								{data.length ? (
									<div className='grid grid-cols-2 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
										{data.map((product, i) => {
											return (
												<ProductCard
													cart={cart}
													setCart={setCart}
													product={product}
													key={i}
												/>
											);
										})}
									</div>
								) : (
									<p className='pt-4'>Er zijn geen producten gemaakt.</p>
								)}
							</div>
							<div className='bg-gray-200 rounded-lg shadow-lg'>
								<h2 className='font-bold text-3xl text-center m-4'>Samenvatting</h2>
								<div className='grid grid-cols-1 place-items-left gap-y-5'>
									{cart.map((product, i) => {
										return (
											<p className='ml-5' key={i}><span className='font-bold'>{product.name}</span> {product.price.toLocaleString('de')} EUR ({product.amount.toLocaleString('de')}x)</p>
										);
									})}
									{cart.length > 0 ? <>
										<div className='flex flex-col w-full mx-auto'>
											<p className='font-bold ml-5'>Totale: {cart.reduce((a, b) => a + b.price * b.amount, 0).toLocaleString('de')} EUR</p>
											<Link href={'/kassa'} className='font-bold bg-red-500 p-2 m-2 rounded-md shadow-lg text-center hover:bg-red-600 duration-300	'>
												<p>Kassa</p>
											</Link>
										</div>
									</>
										: <></>}
								</div>
							</div>
						</div>
					</div>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = async ({ res }: NextPageContext): Promise<BaseProps<ProductDocument>> => {
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

export default Webshop;
