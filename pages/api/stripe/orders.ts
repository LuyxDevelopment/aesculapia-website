import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { Stripe } from 'stripe';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../../src/util/ironConfig';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15',
});

dbConnect();

export default withIronSessionApiRoute(async function paymentHandler(
	req: Omit<NextApiRequest, 'body'> & { body: Body; },
	res: NextApiResponse<ResponseData<Stripe.PaymentIntent[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			const payouts = await stripe.paymentIntents.list({
				expand: ['data.customer', 'data.payment_method'],
			});

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: payouts.data,
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