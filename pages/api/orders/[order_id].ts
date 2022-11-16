import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { IOrder, Order, OrderDocument } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/index';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: Omit<NextApiRequest, 'body'> & { body: IOrder; } & { query: { order_id?: string; }; },
	res: NextApiResponse<ResponseData<OrderDocument | OrderDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			if (!isValidObjectId(req.query.order_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const order = await Order.findById(req.query.order_id);

			if (!order) {
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
				data: order,
			});

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