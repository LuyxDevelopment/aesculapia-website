import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Event, EventDocument } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/responseData';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<EventDocument | EventDocument[]>>,
): Promise<void> {
	res.status(StatusCodes.OK).json({
		error: false,
		message: getReasonPhrase(StatusCodes.OK),
		data: await Event.find({}),
	});

	return;
}