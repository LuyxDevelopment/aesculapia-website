import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../../src/models/Admin';
import { ironOptions } from '../../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../../src/types';
import { Authentication } from '../../../../src/auth/index';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default withIronSessionApiRoute(async function verify2faHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<boolean>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			if (!req.session.user) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
					data: null,
				});

				return;
			}

			const code = req.body.code;

			if (!code) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			if (!req.session.user.has2faEnabled) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
					data: null,
				});

				return;
			}

			const { email } = req.session.user;
			const admin = await Admin.findOne({ email });

			if (!admin) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const verified = Authentication.verifyCode(code, admin.secret);

			if (!verified) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
					data: null,
				});
				return;
			}

			if (verified === 0) {
				req.session.user.completed2fa = true;
				await req.session.save();

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.OK),
					data: true,
				});
				return;
			}

			res.status(StatusCodes.UNAUTHORIZED).json({
				error: true,
				message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
				data: null,
			});
		}
	}
}, ironOptions);
