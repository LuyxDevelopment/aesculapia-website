import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripeInstance: Promise<Stripe | null>;

export const getStripe = () => {
	if (!stripeInstance) {
		stripeInstance = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
	}
	return stripeInstance;
};
