import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, Order, OrderDocument, Product } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/responseData';

export default async function handler(
	req: NextApiRequest & { query: { default: boolean; }; },
	res: NextApiResponse<ResponseData<OrderDocument | OrderDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: await Order.find({}),
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

			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
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
				});
			}
		} break;

		default: {
			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
			});
		} break;
	}
}