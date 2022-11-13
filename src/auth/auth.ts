import { NextApiRequest } from 'next';
import { authenticator } from 'otplib';
import { Admin, AuthorityLevel } from '../models/Admin';
import { hasUserSession } from '../util/hasUserSession';
import { RandomEngine, unique_generator } from 'better-random.js';

export class Authentication {
	public static readonly RNG = new RandomEngine();

	public static generateSecret(): string {
		const secret = authenticator.generateSecret();

		return secret;
	}

	public static generateBackupCodes(): string[] {
		const codes = [];

		for (let i = 0; i < 8; i++) {
			codes.push(unique_generator(Authentication.RNG.string, 8)());
		}

		return codes;
	}

	public static verifyCode(code: string, secret: string): number | null {
		authenticator.options = {
			window: [2, 2],
		};

		return authenticator.checkDelta(code, secret);
	}

	public static sendOtpAuthUri(secret: string, email: string): string {
		const otp = authenticator.keyuri(email, process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME, secret);

		return otp;
	}

	public static async authenticate(requiredLevel: AuthorityLevel, req: NextApiRequest): Promise<boolean> {
		if (!hasUserSession(req)) return false;

		const admin = await Admin.findOne({ email: req.session.user!.email });

		return admin !== null && admin.authorityLevel <= requiredLevel;
	}
}