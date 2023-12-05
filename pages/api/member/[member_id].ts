import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { IMember, Member, MemberDocument } from '../../../src/models/Member';
import { ResponseData } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';
import { isValidObjectId } from 'mongoose';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel } from '../../../src/models/Admin';

export default withIronSessionApiRoute(async function createMember(
	req: Omit<NextApiRequest, 'body'> & { body: IMember; } & { query: { member_id?: string; }; },
	res: NextApiResponse<ResponseData<MemberDocument | MemberDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			if (!isValidObjectId(req.query.member_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const member = await Member.findById(req.query.member_id);

			if (!member) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: null,
				});

				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: member,
			});
		} break;

		case 'POST': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			const member = await Member.create(req.body);

			res.status(StatusCodes.CREATED).json({
				error: false,
				message: getReasonPhrase(StatusCodes.CREATED),
				data: member,
			});
		} break;
	}
}, ironOptions);