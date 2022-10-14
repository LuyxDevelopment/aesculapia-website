import { IEvent, Event, EventDocument, AuthorityLevel } from '../../../src/models/index.js';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../src/types/responseData.js';
import { Authentication } from '../../../src/auth/index.js';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default async function handler(
	req: NextApiRequest & { body: IEvent } & { query: { event_id: string } },
	res: NextApiResponse<ResponseData<EventDocument | EventDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
				});

				return;
			}
			
			const event = await Event.findByIdAndDelete(req.query.event_id);

			if (!event) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});
				
				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
			});
		} break;

		case 'GET': {
			const event = await Event.findById(req.query.event_id);

			if (!event) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});

				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: event,
			});
		} break;

		case 'PATCH': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
				});

				return;
			}

			const event = await Event.findByIdAndUpdate(req.query.event_id, { $set: req.body });

			if (!event) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});
				
				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: event,
			});
		} break;

		case 'POST': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error:true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
				});

				return;
			}

			const event = new Event(req.body);

			try {
				await event.save();
			} catch (error) {
				console.log(error);

				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: true,
					message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
				});

				return;
			}
		} break;
	}
}