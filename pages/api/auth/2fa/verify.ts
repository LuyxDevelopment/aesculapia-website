import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../../src/models/Admin';
import dbConnect from '../../../../src/util/dbConnect';
import { ironOptions } from '../../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../../index';
import { Authentication } from '../../../../src/auth/index';

dbConnect();

export default withIronSessionApiRoute(async function twoFactorAuthenticationHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<boolean>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			if (!req.session.user) {
				res.status(401).json({
					error: true,
					message: 'You must be logged in.',
				});
				return;
			}

			const code = req.body.code;

			if (!code) {
				res.status(403).json({
					error: true,
					message: 'You must provide a code.',
				});
				return;
			}

			if (!req.session.user.has2faEnabled) {
				res.status(200).json({
					error: false,
					message: 'Logged in successfully.',
				});
				return;
			}

			const { email } = req.session.user;
			const admin = await Admin.findOne({ email });

			if (!admin) {
				res.status(400).json({
					error: true,
					message: 'Email not registered.',
				});
				return;
			}

			const verified = Authentication.verifyCode(code, admin.secret);

			if (!verified) {
				res.status(401).json({
					error: true,
					message: 'Code not valid.',
				});
				return;
			}

			res.status(200).json({
				error: false,
				message: 'Code valid.',
				data: true,
			});
		}
	}
}, ironOptions);
