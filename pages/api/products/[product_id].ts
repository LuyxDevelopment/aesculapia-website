import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth.js';
import { AuthorityLevel } from '../../../src/models/Admin.js';
import { IProduct, Product } from '../../../src/models/index.js';

export default async function productsHandler(
	req: NextApiRequest & { body: IProduct } & { query: { product_id: string } },
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				return res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const product = await Product.findByIdAndDelete(req.query.product_id);

			if (!product) {
				return res.status(404).json({
					error: true,
					message: 'Product not found.',
				});
			}

			return res.status(200).json({
				error: false,
				message: `Product #${req.query.product_id} successfully deleted.`,
			});
		}

		case 'GET': {
			if (req.query.product_id) {
				const product = await Product.findById(req.query.product_id);

				if (!product) {
					return res.status(404).json({
						error: true,
						message: 'Product not found.',
					});
				}

				return res.status(200).json({
					error: false,
					message: 'Product found.',
					data: product,
				});
			}

			const products = await Product.find({});

			return res.status(200).json({
				error: false,
				message: 'All products found',
				data: products,
			});
		}

		case 'PATCH': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				return res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const product = await Product.findByIdAndUpdate(req.query.product_id, { $set: req.body });

			if (!product) {
				return res.status(404).json({
					error: true,
					message: 'Product not found.',
				});
			}

			return res.status(200).json({
				error: false,
				message: 'Product successfully updated',
				data: product,
			});
		}

		case 'POST': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				return res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const product = new Product(req.body);

			try {
				await product.save();
			} catch (error) {
				console.log(error);

				return res.status(400).json({
					error: true,
					message: 'Error creating product',
				});
			}
		} break;
	}
}