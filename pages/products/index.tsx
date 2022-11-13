/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from 'next';
import ProductCard from '../../components/ProductCard';
import { ProductDocument } from '../../src/models/Product';
import { useMetaData } from '../../lib/hooks/useMetaData';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import LoadingPage from '../../src/util/loading';
import ErrorPage from '../../src/util/error';

const index: NextPage = () => {
	useMetaData('Products', 'Products Page', '/products');

	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch('/api/products')
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);
				setLoading(false);
			});
	}, []);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!data) {
		return <ErrorPage />;
	}

	return (
		<>
			<Layout>
				<div className='container'>
					<h1 className='text-4xl font-bold mb-5'>Products</h1>
					<div className='grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{(data as ProductDocument[]).map((product, i) => {
							return (
								<ProductCard product={product} key={i} />
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default index;