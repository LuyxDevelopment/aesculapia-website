import { NextPage, NextPageContext } from 'next';
import ProductCard from '../components/ProductCard';
import { IProduct, ProductDocument } from '../src/models/Product';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import ErrorPage from '../components/Error';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';
import { BaseProps, ResponseData } from '../src/types/index';

interface Props {
	data: (IProduct & { _id: string; })[];
}

const ProductsIndex: NextPage<Props> = ({ data }) => {
	const [, , addCart, getStorage] = useLocalStorage('cart', []);

	return (
		<>
			{useMetaData('Webshop', 'Webshop', '/Webshop')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<div className='container mb-12'>
						<h1 className='text-5xl font-bold mb-5'>Webshop</h1>
						{data.length ? (
							<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
								{data.map((product, i) => {
									return (
										<ProductCard
											// @ts-ignore
											addCart={addCart}
											getStorage={getStorage}
											product={product}
											cartable={2}
											key={i}
										/>
									);
								})}
							</div>
						) : (
							<p className='pt-4'>Er zijn geen producten gemaakt.</p>
						)}
					</div>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = async ({
	res,
}: NextPageContext): Promise<BaseProps<ProductDocument>> => {
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

export default ProductsIndex;
