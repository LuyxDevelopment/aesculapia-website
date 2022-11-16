import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, Event, EventDocument, IEvent } from '../../../src/models/index';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: Omit<NextApiRequest, 'body'> & { body: IEvent; } & { query: { default?: boolean; } & Partial<IEvent>; },
	res: NextApiResponse<ResponseData<EventDocument | EventDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: await Event.find({ ...req.query }),
			});
		} break;

		case 'POST': {
			if (await !Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			const event = new Event(req.body);

			try {
				await event.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
					data: event,
				});
			} catch (error) {
				console.log(error);

				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: true,
					message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
					data: null,
				});
			}
		} break;

		default: {
			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
				data: null,
			});
		} break;
	}

	return;
}, ironOptions);