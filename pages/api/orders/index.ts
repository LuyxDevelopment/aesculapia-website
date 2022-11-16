import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, IOrder, Order, OrderDocument, Product } from '../../../src/models/index';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: Omit<NextApiRequest, 'body'> & { body: IOrder; } & { query: { default?: boolean; } & Partial<IOrder>; },
	res: NextApiResponse<ResponseData<OrderDocument | OrderDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: await Order.find({ ...req.query }),
			});
		} break;

		case 'POST': {
			if (req.query.default) {

				const product = await Product.findById('636ffabf36d8d14ad420ce8d');

				const order = new Order({
					delivered: false,
					email: 'test@gmail.com',
					firstName: 'FirstName',
					lastName: 'LastName',
					issuedAt: Date.now(),
					product,
					receivedAt: Date.now() + 10000,
				});

				await order.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
					data: order,
				});

				return;
			}

			if (await !Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			const order = new Order(req.body);

			try {
				await order.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
					data: order,
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