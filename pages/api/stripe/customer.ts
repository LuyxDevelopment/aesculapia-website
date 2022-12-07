import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/util/dbConnect';
import { Stripe } from 'stripe';
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
});

dbConnect();

interface Body {
	customer: {
		customer: {
			id?: string;
			name: string;
			address: {
				city: string;
				state: string;
				country: string;
				line1: string;
				postal_code: string;
			};
			payment_intent: string;
		}
	}
}

export default async function loginHandler(
	req: Omit<NextApiRequest, 'body'> & { body: Body; },
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			const { customer } = req.body.customer;

			//const customer = await stripe.customers.create({});

			const paymentIntent = await stripe.paymentIntents.retrieve(customer.payment_intent);
			if (!paymentIntent) {
				return;
			}

			if (!customer.id || !await stripe.customers.retrieve(customer.id)) {
				const newCustomer = await stripe.customers.create({
					name: customer.name,
					address: {
						city: customer.address.city,
						state: customer.address.state,
						country: customer.address.country,
						line1: customer.address.line1,
						postal_code: customer.address.postal_code,
					},
				});

				await stripe.paymentIntents.update(paymentIntent.id, {
					customer: newCustomer.id,
				});

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.OK),
				});

				return;
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