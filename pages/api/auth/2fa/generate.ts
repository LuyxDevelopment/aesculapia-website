import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../../src/models/Admin';
import { ironOptions } from '../../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../../src/types';
import { Authentication } from '../../../../src/auth/index';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default withIronSessionApiRoute(async function generateSecretHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<string>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			req.session.user = req.body;
			await req.session.save();

			if (!req.session.user) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
					data: null,
				});

				return;
			}

			const { email, has2faEnabled } = req.session.user;
			const admin = await Admin.findOne({ email });

			if (!admin) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
					data: null,
				});

				return;
			}

			if (has2faEnabled) {
				res.status(StatusCodes.CONFLICT).json({
					error: true,
					message: getReasonPhrase(StatusCodes.CONFLICT),
					data: null,
				});

				return;
			}

			if (admin.secret) {
				res.status(StatusCodes.CONFLICT).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CONFLICT),
					data: null,
				});

				return;
			}

			const secret = Authentication.generateSecret();

			admin.secret = secret;
			await admin.save();

			req.session.user.has2faEnabled = true;
			await req.session.save();

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: Authentication.sendOtpAuthUri(secret, admin.email),
			});
		} break;
	}
}, ironOptions);
