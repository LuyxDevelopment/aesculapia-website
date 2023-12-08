import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../src/models/index';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { Stripe } from 'stripe';
import { DisplayProduct } from '../../../components/ProductCard';
import { Member } from '../../../src/models/Member';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15',
});

dbConnect();

const calculateOrderAmount = async (items: DisplayProduct[], isMember: boolean): Promise<number> => {
	let price = 0;
	for (const item of items) {
		const product = await Product.findOne({ _id: item._id });
		if (product!.stock < item.amount) item.amount = product!.stock;
		if (product!.isShirt && isMember) {
			price += product!.price * item.amount * 0.9;
		} else price += product!.price * item.amount;
	}
	return price;
};

export default async function paymentIntent(
	req: Omit<NextApiRequest, 'body'> & { body: { items: DisplayProduct[]; id?: string; memberId: number; } },
	res: NextApiResponse<ResponseData<{ id: string, clientSecret: string; } | null>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			const { items } = req.body;

			const paymentIntent = await stripe.paymentIntents.create({
				amount: await calculateOrderAmount(items, false),
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

		case 'PATCH': {
			const { items, id, memberId } = req.body;

			const member = await Member.find({ ldc: memberId });

			if (member) {
				const paymentIntent = await stripe.paymentIntents.update(id!, { amount: await calculateOrderAmount(items, true) });

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.OK),
					data: {
						id: paymentIntent.id,
						clientSecret: paymentIntent.client_secret!,
					},
				});

				return;
			}

			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
				data: null,
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