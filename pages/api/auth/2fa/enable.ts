import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../../src/models/Admin';
import { ironOptions } from '../../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../../src/types/responseData';

export default withIronSessionApiRoute(async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<string>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
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

			admin.has2faEnabled = true;
			await admin.save();

			req.session.user.has2faEnabled = true;
			await req.session.save();

			res.status(200).json({
				error: false,
				message: 'Enabled 2FA successfully.',
			});
		}
	}
}, ironOptions);
