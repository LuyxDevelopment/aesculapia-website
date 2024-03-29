import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { Stripe } from 'stripe';
import { mail } from '../../../src/mail';
import { IProduct, Order, Product } from '../../../src/models';
import { DisplayProduct } from '../../../components/ProductCard';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15',
});

dbConnect();

const parseCart = async (items: string): Promise<DisplayProduct[]> => {
	const parsedItems = JSON.parse(items) as DisplayProduct[];

	for (let i = 0; i < parsedItems.length; i++) {
		const product = await Product.findOne({ _id: parsedItems[i]._id });

		if (product!.stock < parsedItems[i].amount) parsedItems[i].amount = product!.stock;
	}

	return parsedItems;
};

interface Body {
	paymentIntent: string;
	items: string;
}

interface PaymentIntent {
	amount: number;
	last4?: string;
	postalCode: string;
	country: string;
	type: string;
	customer: {
		email: string;
		name: string;
	};
}

export default async function paymentHandler(
	req: Omit<NextApiRequest, 'body'> & { body: Body; },
	res: NextApiResponse<ResponseData<PaymentIntent & { cart: DisplayProduct[]; } | null>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			const paymentIntent = await stripe.paymentIntents.retrieve(req.body.paymentIntent);

			switch (paymentIntent?.status) {
				case 'succeeded': {
					const customer = await stripe.customers.retrieve(paymentIntent.customer as string) as Stripe.Customer;
					const cart = await parseCart(req.body.items);

					const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method as string);

					if (!customer) {
						res.status(StatusCodes.FORBIDDEN).json({
							error: true,
							message: getReasonPhrase(StatusCodes.FORBIDDEN),
							data: null,
						});

						return;
					}

					const order = await Order.findOne({ _id: paymentIntent.id });

					if (!order) {
						const card = paymentMethod.card ? { last4: paymentMethod.card.last4, brand: paymentMethod.card.brand } : null;

						mail.sendConfirmationMail(
							customer.email!,
							paymentIntent.id,
							customer.name!,
							paymentIntent.amount,
							cart,
							paymentMethod.type,
							card,
						);

						const name = customer.name?.split(' ');

						const newOrder = new Order({
							_id: paymentIntent.id,
							email: customer.email,
							firstName: name![0],
							lastName: name![1],
							products: cart,
							emailSent: true,
						});

						await newOrder.save();

						for (const cartProduct of cart) {
							const product = await Product.findById(cartProduct._id);

							if (!product) return;

							product.stock -= cartProduct.amount;

							await product.save();
						}

						res.status(StatusCodes.OK).json({
							error: false,
							message: getReasonPhrase(StatusCodes.OK),
							data: {
								amount: paymentIntent.amount,
								last4: paymentMethod.card?.last4,
								postalCode: paymentMethod.billing_details.address!.postal_code!,
								country: paymentMethod.billing_details.address!.country!,
								type: paymentMethod.type,
								cart: cart,
								customer: {
									name: customer.name!,
									email: customer.email!,
								},
							},
						});

						return;
					}

					res.status(StatusCodes.OK).json({
						error: false,
						message: getReasonPhrase(StatusCodes.OK),
						data: {
							amount: paymentIntent.amount,
							last4: paymentMethod.card?.last4,
							postalCode: paymentMethod.billing_details.address!.postal_code!,
							country: paymentMethod.billing_details.address!.country!,
							type: paymentMethod.type,
							cart: order.products,
							customer: {
								name: customer.name!,
								email: customer.email!,
							},
						},
					});

					break;
				}

				default:
					break;
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
}