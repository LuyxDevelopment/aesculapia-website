import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../../src/models/Admin';
import { ironOptions } from '../../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../../src/types';
import { StatusCodes } from 'http-status-codes';

export default withIronSessionApiRoute(async function disable2faHandler(
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
					message: 'You must be logged in.',
					data: null,
				});
				return;
			}

			const { email, has2faEnabled } = req.session.user;
			const admin = await Admin.findOne({ email });

			if (!admin) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: 'Email not registered!',
					data: null,
				});
				return;
			}

			if (!has2faEnabled) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: '2FA is already disabled.',
					data: null,
				});
				return;
			}

			admin.has2faEnabled = true;
			await admin.save();

			req.session.user.has2faEnabled = false;
			await req.session.save();

			res.status(StatusCodes.OK).json({
				error: false,
				message: 'Disabled 2FA successfully.',
				data: null,
			});
		}
	}
}, ironOptions);
