import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../../src/models/Admin';
import { ironOptions } from '../../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../../src/types/responseData';
import { Authentication } from '../../../../src/auth/index';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default withIronSessionApiRoute(async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<string[]>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			req.session.user = req.body;
			await req.session.save();

			if (!req.session.user) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
				});

				return;
			}

			const { email, has2faEnabled } = req.session.user;
			const admin = await Admin.findOne({ email });

			if (!admin) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
				});

				return;
			}

			if (has2faEnabled) {
				res.status(StatusCodes.CONFLICT).json({
					error: true,
					message: getReasonPhrase(StatusCodes.CONFLICT),
				});

				return;
			}

			if (admin.secret) {
				res.status(StatusCodes.CONFLICT).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CONFLICT),
				});

				return;
			}

			const backupCodes = Authentication.generateBackupCodes();

			admin.backupCodes = backupCodes;
			await admin.save();

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: backupCodes,
			});
		} break;
	}
}, ironOptions);