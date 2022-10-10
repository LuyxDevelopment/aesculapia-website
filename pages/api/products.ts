import { NextApiRequest, NextApiResponse } from 'next';
import { Admin, Product } from '../../src/models';

export default async function productsHandler(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const product = await Product.findByIdAndDelete(req.query.pid);

			if (!product) {
				return void res.status(404).json({
					error: true,
					message: 'Product not found.',
				});
			}

			return void res.status(200).json({
				error: false,
				message: `Product #${req.query.pid} successfully deleted.`,
			});
		}

		case 'GET': {
			if (req.query.pid) {
				const product = await Product.findById(req.query.pid);

				if (!product) {
					return void res.status(404).json({
						error: true,
						message: 'Product not found.',
					});
				}

				return void res.status(200).json({
					error: false,
					message: 'Product found.',
					data: product,
				});
			}

			const products = await Product.find({});

			return void res.status(200).json({
				error: false,
				message: 'All products found',
				data: products,
			});
		}

		case 'PATCH': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const product = await Product.findByIdAndUpdate(req.query.pid, { $set: req.body });

			if (!product) {
				return void res.status(404).json({
					error: true,
					message: 'Product not found.',
				});
			}

			return void res.status(200).json({
				error: false,
				message: 'Product successfully updated',
				data: product,
			});
		}

		case 'POST': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const product = new Product(req.body);

			try {
				await product.save();
			} catch (error) {
				console.log(error);

				return void res.status(400).json({
					error: true,
					message: 'Error creating product',
				});
			}
		} break;
	}
}