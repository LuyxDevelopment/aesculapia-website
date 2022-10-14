import { IEvent, Event, EventDocument } from '../../src/models/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../src/types/responseData';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default async function handler(
	req: NextApiRequest & { body: IEvent } & { query: { event_id: string } },
	res: NextApiResponse<ResponseData<EventDocument | EventDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			const events = await Event.find({});

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: events,
			});
		} break;
	}
}