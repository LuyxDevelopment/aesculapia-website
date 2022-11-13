import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ErrorPage from '../../components/Error';
import Loader from '../../components/Loader';
import Layout from '../../components/Layout';
import Product from '../../components/Product';

const index: NextPage<{test:number}> = () => {
	const router = useRouter();
	const { id } = router.query;

	const [product, setProduct] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData(): Promise<void> {
			const req = await fetch(`/api/products/${id}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
	
			const data = await req.json();
	
			if (data.data) {
				setProduct(data.data);
				setLoading(false);
			}
		}
		fetchData();
	}, [id]);

	if (isLoading) {
		return <Loader />;
	}

	if (!product) {
		return <ErrorPage />;
	}

	return (
		<>
			<Layout>
				<div className='w-screen'>
					<h1 className='text-4xl font-bold mb-5 cursor-pointer' onClick={(): string => (window.location.href = '/products')}>«</h1>
					<Product product={product} />
				</div>
			</Layout>
		</>
	);
};

export default index;