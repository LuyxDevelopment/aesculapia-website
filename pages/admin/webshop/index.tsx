import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Layout from '../../../components/Layout';
import AdminProductCard from '../../../components/AdminProductCard';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import ErrorPage from '../../../components/Error';
import { ironOptions } from '../../../src/util/ironConfig';
import { IProduct, ProductDocument } from '../../../src/models/Product';
import { AdminProps, ResponseData } from '../../../src/types/index';

interface Props {
	data: (IProduct & { _id: string; })[];
}

const AdminProductsIndex: NextPage<Props> = ({ data }) => {
	return (
		<>
			{useMetaData('Admin Admin | Webshop', 'Webshop Page', '/Webshop')}
			<Layout>
				{!data && <ErrorPage />}
				{data && (
					<div className='container mb-12'>
						<h1 className='text-5xl font-bold mb-5'>Products</h1>
						<div>
							<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-900' onClick={(): void => { window.location.href = '/admin/webshop/create'; }}>
								Product creëren
							</button>
						</div>
						{
							data.length ?
								<div className='grid grid-cols-1 gap-7 mt-7 sm:grid-cols-2 sm:gap-15 md:grid-cols-2 md:gap-15 lg:grid-cols-3 xl:grid-cols-4 lg:gap-20'>
									{data.map((product, i) => {
										return (
											<AdminProductCard product={product} key={i} />
										);
									})}
								</div>
								: <p className='pt-4'>Er zijn geen producten gemaakt.</p>
						}
					</div>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, resolvedUrl }): Promise<AdminProps<ProductDocument>> {
	const user = req?.session.user;

	if (!user) {
		return {
			props: {
				user: { email: '', has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: `/admin/login?from=${encodeURIComponent(resolvedUrl)}`,
				permanent: false,
			},
		};
	}

	const productRequest = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const productData = await productRequest.json() as ResponseData<ProductDocument | ProductDocument[]>;

	return {
		props: {
			user: req.session.user,
			data: productData.data,
		},
	};
}, ironOptions);

export default AdminProductsIndex;
