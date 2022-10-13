import { IEvent, Event, EventDocument, AuthorityLevel } from '../../../src/models/index.js';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../src/types/responseData.js';
import { Authentication } from '../../../src/auth/index.js';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default async function calendarHandler(
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

			res.status(200).json({
				error: false,
				message: `Event #${req.query.event_id} successfully deleted.`,
			});
		} break;

		case 'GET': {
			if (req.query.event_id) {
				const event = await Event.findById(req.query.event_id);

				if (!event) {
					res.status(404).json({
						error: true,
						message: 'Event not found.',
					});

					return;
				}

				res.status(200).json({
					error: false,
					message: 'Event found.',
					data: event,
				});
			}

			const events = await Event.find({});

			res.status(200).json({
				error: false,
				message: 'All events found',
				data: events,
			});
		} break;

		case 'PATCH': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});

				return;
			}

			const event = await Event.findByIdAndUpdate(req.query.event_id, { $set: req.body });

			if (!event) {
				res.status(404).json({
					error: true,
					message: 'Event not found.',
				});
				
				return;
			}

			res.status(200).json({
				error: false,
				message: 'Event successfully updated',
				data: event,
			});
		} break;

		case 'POST': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				res.status(403).json({
					error:true,
					message: 'Forbidden access',
				});

				return;
			}

			const event = new Event(req.body);

			try {
				await event.save();
			} catch (error) {
				console.log(error);

				res.status(400).json({
					error: true,
					message: 'Error creating event',
				});

				return;
			}
		} break;
	}
}