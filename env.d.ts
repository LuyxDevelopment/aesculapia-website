declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_NAME: string;
			MONGO_URI: string;
			COOKIE_NAME: string;
			SESSION_PASSWORD: string;
			SALT_ROUNDS: string;
			TWO_FACTOR_AUTHENTICATION_APP_NAME: string;
			STRIPE_TEST_KEY: string;
			POSTMARK_API_KEY: string;
			NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
			STRIPE_SECRET_KEY: string;
		}
	}
}

export { };
