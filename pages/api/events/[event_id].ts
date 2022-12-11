import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel } from '../../../src/models/Admin';
import { IEvent, EventDocument, Event } from '../../../src/models/index';
import { ResponseData } from '../../../src/types';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: NextApiRequest & { body: IEvent } & { query: { event_id?: string } },
	res: NextApiResponse<ResponseData<EventDocument | EventDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'DELETE':
			{
				if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
					res.status(StatusCodes.FORBIDDEN).json({
						error: true,
						message: getReasonPhrase(StatusCodes.FORBIDDEN),
						data: null,
					});

					return;
				}

				if (!isValidObjectId(req.query.event_id)) {
					res.status(StatusCodes.BAD_REQUEST).json({
						error: true,
						message: getReasonPhrase(StatusCodes.BAD_REQUEST),
						data: null,
					});

					return;
				}

				const event = await Event.findByIdAndDelete(req.query.event_id);

				if (!event) {
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
					data: event,
				});
			}
			break;

		case 'GET':
			{
				if (!isValidObjectId(req.query.event_id)) {
					res.status(StatusCodes.BAD_REQUEST).json({
						error: true,
						message: getReasonPhrase(StatusCodes.BAD_REQUEST),
						data: null,
					});

					return;
				}

				const event = await Event.findById(req.query.event_id);

				if (!event) {
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
					data: event,
				});
			}
			break;

		case 'PATCH':
			{
				if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
					res.status(StatusCodes.FORBIDDEN).json({
						error: true,
						message: getReasonPhrase(StatusCodes.FORBIDDEN),
						data: null,
					});

					return;
				}

				if (!isValidObjectId(req.query.event_id)) {
					res.status(StatusCodes.BAD_REQUEST).json({
						error: true,
						message: getReasonPhrase(StatusCodes.BAD_REQUEST),
						data: null,
					});

					return;
				}

				const event = await Event.findById(req.query.event_id);

				if (!event) {
					res.status(StatusCodes.NOT_FOUND).json({
						error: true,
						message: getReasonPhrase(StatusCodes.NOT_FOUND),
						data: null,
					});

					return;
				}

				try {
					event.set(req.body);
					await event.save();

					res.status(StatusCodes.OK).json({
						error: false,
						message: getReasonPhrase(StatusCodes.NOT_FOUND),
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
			}
			break;
	}
},
ironOptions);
