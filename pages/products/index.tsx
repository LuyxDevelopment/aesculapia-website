import { NextPage } from 'next';
import ItemCard from '../../components/ItemCard';
import { ProductDocument } from '../../src/models/Product';
import { useMetaData } from '../../lib/hooks/useMetaData';
import Layout from '../../components/Layout';

interface Props {
	products: ProductDocument[];
}

const index: NextPage<Props> = ({ products }) => {
	return (
		<>
			{useMetaData('Products', 'Products Page', '/products')}
			<Layout>
				<div className="container">
					<h1 className="text-4xl font-bold mb-5">All Products</h1>
					<div className="grid grid-cols-1 place-items-center gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{products.map((product, i) => {
							return (
								<ItemCard item={product} key={i} />
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default index;