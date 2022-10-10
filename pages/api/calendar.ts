import { Admin, IEvent, Event } from '../../src/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../index';
import { Mongooseify } from '../../src/util/mongooseify';

export default async function calendarHandler(
	req: NextApiRequest & { body: number },
	res: NextApiResponse<ResponseData<Mongooseify<IEvent>[] | IEvent>>,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const event = await Event.findByIdAndDelete(req.query.pid);

			if (!event) {
				return void res.status(404).json({
					error: true,
					message: 'Event not found.',
				});
			}

			return void res.status(200).json({
				error: false,
				message: `Event #${req.query.pid} successfully deleted.`,
			});
		}

		case 'GET': {
			if (req.query.pid) {
				const event = await Event.findById(req.query.pid);

				if (!event) {
					return void res.status(404).json({
						error: true,
						message: 'Event not found.',
					});
				}

				return void res.status(200).json({
					error: false,
					message: 'Event found.',
					data: event,
				});
			}

			const events = await Event.find({});

			return void res.status(200).json({
				error: false,
				message: 'All events found',
				data: events,
			});
		}

		case 'PATCH': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const event = await Event.findByIdAndUpdate(req.query.pid, { $set: req.body });

			if (!event) {
				return void res.status(404).json({
					error: true,
					message: 'Event not found.',
				});
			}

			return void res.status(200).json({
				error: false,
				message: 'Event successfully updated',
				data: event,
			});
		}

		case 'POST': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const event = new Event(req.body);

			try {
				await event.save();
			} catch (error) {
				console.log(error);

				return void res.status(400).json({
					error: true,
					message: 'Error creating event',
				});
			}
		} break;
	}
}