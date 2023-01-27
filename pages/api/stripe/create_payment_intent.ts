import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../src/models/index';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { Stripe } from 'stripe';
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
});

dbConnect();

const calculateOrderAmount = async (items: string): Promise<number> => {
	let price = 0;
	for (const item of JSON.parse(items)) {
		const product = await Product.findOne({ _id: item.id });
		if (product!.stock < item.amount) item.amount = product!.stock;
		price += product!.price * item.amount;
	}
	return price;
};

export default async function createPaymentIntent(
	req: Omit<NextApiRequest, 'body'> & { body: { items: string }; },
	res: NextApiResponse<ResponseData<{ id: string, clientSecret: string } | null>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			const { items } = req.body;

			console.log(JSON.parse(items));

			const paymentIntent = await stripe.paymentIntents.create({
				amount: await calculateOrderAmount(items),
				currency: 'eur',
				automatic_payment_methods: {
					enabled: true,
				},
			});

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: {
					id: paymentIntent.id,
					clientSecret: paymentIntent.client_secret!,
				},
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
}