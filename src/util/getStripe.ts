import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripeInstance: Promise<Stripe | null>;

export const getStripe = (): typeof stripeInstance => {
	if (!stripeInstance) {
		stripeInstance = loadStripe(process.env.NEXT_STRIPE_PUBLISHABLE_KEY);
	}
	return stripeInstance;
};
