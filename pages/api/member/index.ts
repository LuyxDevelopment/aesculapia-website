import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { IMember, Member, MemberDocument } from '../../../src/models/Member';
import { ResponseData } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel } from '../../../src/models/Admin';

export default withIronSessionApiRoute(async function createMember(
	req: Omit<NextApiRequest, 'body'> & { body: IMember; } & { query: { member_id?: string; }; },
	res: NextApiResponse<ResponseData<MemberDocument | MemberDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'POST': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			const member = new Member(req.body);

			try {
				await member.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
					data: member,
				});
			} catch (e) {
				console.error(e);

				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});
			}
		} break;
	}
}, ironOptions);