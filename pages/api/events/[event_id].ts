import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel } from '../../../src/models/Admin';
import { IEvent, EventDocument, Event } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/responseData';

export default async function handler(
	req: NextApiRequest & { body: IEvent; } & { query: { event_id: string; }; },
	res: NextApiResponse<ResponseData<EventDocument | EventDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
				});

				return;
			}

			try {
				new Types.ObjectId(req.query.event_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
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
			try {
				new Types.ObjectId(req.query.event_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});

				return;
			}

			const event = await Event.findById(req.query.event_id);

			if (!event) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});

				return;
			}
		} break;

		case 'PATCH': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
				});

				return;
			}

			try {
				new Types.ObjectId(req.query.event_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});

				return;
			}

			const event = await Event.findById(req.query.event_id);

			if (!event) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
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
				});
			}
		} break;
	}
}