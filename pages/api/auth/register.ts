import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../src/models/Admin';
import dbConnect from '../../../src/util/dbConnect';
import { genSalt, hash } from 'bcryptjs';
import { ajv } from '../../../src/util/ajv';

interface ResponseData {
	error: boolean;
	message: string;
}

interface RegisterNextApiRequest extends NextApiRequest {
	body: {
		email: string;
		password: string;
	};
	method: 'POST';
}

dbConnect();

const validateRegisterBody = ajv.compile<RegisterNextApiRequest['body']>({
	type: 'object',
	required: ['email', 'password'],
	email: {
		type: 'string',
		format: '.+@.+..+',
	},
	password: {
		type: 'string',
		minLength: 6,
	},
});

export default async function registerHandler(
	req: RegisterNextApiRequest,
	res: NextApiResponse<ResponseData>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			validateRegisterBody(req.body);

			const email = req.body.email;
			const password = req.body.password;

			if (await Admin.exists({ email: email })) {
				res.status(400).json({
					error: true,
					message: 'Email already in use!',
				});

				return;
			}

			const admin = new Admin({
				email,
				password: '',
			});

			genSalt(parseInt(process.env.SALT_ROUNDS), (saltError, salt) => {
				if (saltError) throw new Error(saltError.message);

				hash(password, salt, async (hashError, hash) => {
					if (hashError) throw new Error(hashError.message);

					try {
						admin.password = hash;
						await admin.save();

						res.status(200).json({
							error: false,
							message: 'Admin profile created successfully!',
						});
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} catch (error: any) {
						res.status(400).json({
							error: true,
							message: `Failed to register admin due to the following error: ${error?.message}`,
						});

						throw new Error(error.message);
					}
				});
			});
		}
	}
}