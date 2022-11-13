import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { IOrder, Order } from '../../../src/models/index';

export default async function handler(
	req: NextApiRequest & { body: IOrder; } & { query: { order_id: string; }; },
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			try {
				new Types.ObjectId(req.query.order_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});
			}

			const order = await Order.findById(req.query.order_id);

			if (!order) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});

				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: order,
			});

		} break;

		default: {
			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
			});
		} break;
	}
}