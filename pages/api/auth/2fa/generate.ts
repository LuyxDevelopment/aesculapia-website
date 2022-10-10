import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../../src/models/Admin';
import dbConnect from '../../../../src/util/dbConnect';
import { ironOptions } from '../../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../../index';
import { Authentication } from '../../../../src/auth';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<string>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			req.session.user = req.body;
			await req.session.save();
			if (!req.session.user) {
				res.status(401).json({
					error: true,
					message: 'You must be logged in.',
				});
				return;
			}

			const { email, has2faEnabled } = req.session.user;
			const admin = await Admin.findOne({ email });

			if (!admin) {
				res.status(400).json({
					error: true,
					message: 'Email not registered!',
				});
				return;
			}

			if (has2faEnabled) {
				res.status(404).json({
					error: true,
					message: '2FA is already enabled.',
				});
				return;
			}

			if (admin.secret) {
				res.status(200).json({
					error: false,
					message: '2FA is already enabled.',
				});
				return;
			}

			const secret = Authentication.generateSecret();

			admin.secret = secret;
			admin.has2faEnabled = true;
			await admin.save();

			res.status(200).json({
				error: false,
				message: 'Generated secret successfully.',
				data: Authentication.sendOtpAuthUri(secret, admin.email),
			});
		}
	}
}, ironOptions);
