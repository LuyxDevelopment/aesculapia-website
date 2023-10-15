import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/util/dbConnect';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15',
});

dbConnect();

interface Body {
	customer: {
		customer: {
			id?: string;
			name: string;
			email: string;
			payment_intent: string;
		};
	};
}

export default async function customerHandler(
	req: Omit<NextApiRequest, 'body'> & { body: Body; },
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			const { customer } = req.body.customer;

			if (!customer.payment_intent || !customer.email || !customer.name || !customer.name.match(/^[a-zA-Z]+\s[a-zA-Z]+\s?$/)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});
				return;
			}

			const paymentIntent = await stripe.paymentIntents.retrieve(customer.payment_intent);
			if (!paymentIntent) {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: true,
					message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
				});
				return;
			}

			if (!customer.id || !await stripe.customers.retrieve(customer.id)) {
				const newCustomer = await stripe.customers.create({
					name: customer.name,
					email: customer.email,
				});

				await stripe.paymentIntents.update(customer.payment_intent, {
					customer: newCustomer.id,
				});

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.OK),
				});

				return;
			} else if (customer.id || await stripe.customers.retrieve(customer.id)) {
				console.log(await stripe.customers.retrieve(customer.id));
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
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