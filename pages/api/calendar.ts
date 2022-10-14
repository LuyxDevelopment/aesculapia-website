import { Event, EventDocument, AuthorityLevel } from '../../src/models/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../src/types/responseData';
import { Authentication } from '../../src/auth/index';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default async function handler(
	req: NextApiRequest & { body: number },
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
				res.status(404).json({
					error: true,
					message: 'Event not found.',
				});

				return;
			}

			res.status(200).json({
				error: false,
				message: `Event #${req.query.pid} successfully deleted.`,
			});
		} break;

		case 'GET': {
			if (req.query.pid) {
				const event = await Event.findById(req.query.pid);

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

			const event = await Event.findByIdAndUpdate(req.query.pid, { $set: req.body });

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
					error: true,
					message: 'Forbidden access.',
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