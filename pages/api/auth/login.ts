import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../src/models/Admin';
import dbConnect from '../../../src/util/dbConnect';
import { compare } from 'bcryptjs';
import { ironOptions } from '../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../index';

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
				res.status(400).json({
					error: true,
					message: 'Email not registered.',
				});
				return;
			}

			compare(password, admin.password, async (error, isMatch) => {
				if (error) {
					throw new Error(error.message);
				}

				if (!isMatch) {
					res.status(400).json({
						error: true,
						message: 'Password does not match.',
					});

					return;
				}

				req.session.user = {
					email,
					has2faEnabled: admin.has2faEnabled,
					completed2fa: false,
				};

				await req.session.save();


				res.status(200).json({
					error: false,
					message: 'Logged in successfully.',
				});


			});
		}
	}
}, ironOptions);
