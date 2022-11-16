import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, IProduct, Product, ProductDocument } from '../../../src/models/index';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: Omit<NextApiRequest, 'body'> & { body: IProduct; } & { query: { default?: boolean; } & Partial<IProduct>; },
	res: NextApiResponse<ResponseData<ProductDocument | ProductDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: await Product.find({ ...req.query }),
			});

		} break;

		case 'POST': {
			if (req.query.default) {

				const product = new Product({
					imageURL: 'https://avatars.githubusercontent.com/u/96552233',
					name: 'Test Product',
					price: 500,
					stock: 1,
				});

				await product.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
					data: product,
				});

				return;
			}

			if (!await Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			const product = new Product({
				imageURL: req.body.imageURL,
				name: req.body.name,
				price: req.body.price * 100,
				stock: req.body.stock,
			});

			try {
				await product.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
					data: null,
				});

			} catch (error) {
				console.log(error);

				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: true,
					message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
					data: null,
				});
			}
		} break;

		default: {
			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
				data: null,
			});
		} break;
	}
}, ironOptions);