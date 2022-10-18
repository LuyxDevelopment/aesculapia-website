import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../src/models/Admin';
import dbConnect from '../../../src/util/dbConnect';
import { compare } from 'bcryptjs';
import { ironOptions } from '../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { ResponseData } from '../../../src/types/responseData';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			const email = req.body.email;
			const password = req.body.password;
			const admin = await Admin.findOne({ email: email });

			if (!admin) {
				res.status(StatusCodes.UNAUTHORIZED).json({
					error: true,
					message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
				});

				return;
			}

			compare(password, admin.password, async (error, isMatch) => {
				if (error) {
					throw new Error(error.message);
				}

				if (!isMatch) {
					res.status(StatusCodes.BAD_REQUEST).json({
						error: true,
						message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					});

					return;
				}

				req.session.user = {
					email,
					has2faEnabled: admin.has2faEnabled,
					completed2fa: false,
				};

				await req.session.save();

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.OK),
				});
			});
		} break;
	}
}, ironOptions);
