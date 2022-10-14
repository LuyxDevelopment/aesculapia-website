import { NextApiRequest } from 'next';
import { authenticator } from 'otplib';
import { Admin, AuthorityLevel } from '../models/Admin';
import { hasUserSession } from '../util/hasUserSession';

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

	public static async auth(requiredLevel: AuthorityLevel, req: NextApiRequest): Promise<boolean>  {
		if (!hasUserSession(req)) return false;

		const admin = await Admin.findOne({ email: req.session.user!.email });

		return admin !== null && admin.authorityLevel > requiredLevel; 
	}
}