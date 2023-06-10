import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, IProduct, Product, ProductDocument } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/index';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15',
});

dbConnect();

export default withIronSessionApiRoute(async function productId(
	req: Omit<NextApiRequest, 'body'> & { body: IProduct; } & { query: { product_id?: string; }; },
	res: NextApiResponse<ResponseData<ProductDocument | ProductDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			if (!isValidObjectId(req.query.product_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const product = await Product.findByIdAndDelete(req.query.product_id);

			if (!product) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: null,
				});

				return;
			}

			await stripe.products.update(product._id, { active: false });

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: null,
			});
		} break;

		case 'GET': {
			if (!isValidObjectId(req.query.product_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const product = await Product.findById(req.query.product_id);

			if (!product) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: null,
				});

				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: product,
			});
		} break;

		case 'PATCH': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			if (!isValidObjectId(req.query.product_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const product = await Product.findById(req.query.product_id);

			if (!product) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: null,
				});

				return;
			}

			try {
				product.set(req.body);
				await product.save();

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.OK),
					data: product,
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