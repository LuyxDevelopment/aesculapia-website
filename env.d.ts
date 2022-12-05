declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_NAME: string;
			MONGO_URI: string;
			COOKIE_NAME: string;
			SESSION_PASSWORD: string;
			SALT_ROUNDS: string;
			TWO_FACTOR_AUTHENTICATION_APP_NAME: string;
			NEXT_POSTMARK_API_KEY: string;
			NEXT_PUBLIC_DOMAIN: string;
			NEXT_STRIPE_PUBLISHABLE_KEY: string;
			NEXT_STRIPE_SECRET_KEY: string;
		}
	}
}

export { };
