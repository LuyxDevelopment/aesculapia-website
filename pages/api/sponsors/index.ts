import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Sponsor, SponsorDocument } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/responseData';
import dbConnect from '../../../src/util/dbConnect';

dbConnect();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<SponsorDocument | SponsorDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'GET': {
			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: await Sponsor.find({}),
			});

		} break;

		default: {
			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
			});
		} break;
	}
}