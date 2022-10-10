import { authenticator } from 'otplib';

export class Authentication {
	public static generateSecret(): string {
		const secret = authenticator.generateSecret();

		return secret;
	}

	public static verifyCode(code: string, secret: string): boolean {
		return authenticator.verify({
			token: code,
			secret: secret,
		});
	}

	public static sendOtpAuthUri(secret: string, email: string): string {
		const otp = authenticator.keyuri(email, process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME, secret);

		return otp;
	}
}