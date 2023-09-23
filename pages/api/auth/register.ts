import { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '../../../src/models/Admin';
import { genSalt, hash } from 'bcryptjs';
import { ajv } from '../../../src/util/ajv';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

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

const validateRegisterBody = ajv.compile<RegisterNextApiRequest['body']>({
	type: 'object',
	properties: {
		email: {
			type: 'string',
		},
		password: {
			type: 'string',
			minLength: 6,
		},
	},
	required: ['email', 'password'],
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

			if (await Admin.exists({ email })) {
				res.status(StatusCodes.CONFLICT).json({
					error: true,
					message: getReasonPhrase(StatusCodes.CONFLICT),
				});

				return;
			}

			const admin = new Admin({
				email,
				password: '',
				secret: 'SDF7H8H9A7F',
			});

			genSalt(parseInt(process.env.SALT_ROUNDS), (saltError, salt) => {
				if (saltError) throw new Error(saltError.message);

				hash(password, salt, async (hashError, hash) => {
					if (hashError) throw new Error(hashError.message);

					try {
						admin.password = hash;
						await admin.save();

						res.status(StatusCodes.CREATED).json({
							error: false,
							message: getReasonPhrase(StatusCodes.CREATED),
						});
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} catch (error: any) {
						res.status(StatusCodes.BAD_REQUEST).json({
							error: true,
							message: `Failed to register admin due to the following error: ${error?.message}`,
						});

						throw new Error(error.message);
					}
				});
			});
		} break;
	}
}
