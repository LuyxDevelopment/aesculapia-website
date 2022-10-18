import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../src/types/responseData';
import dbConnect from '../../src/util/dbConnect';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
): void {
	dbConnect();

	res.status(StatusCodes.OK).json({
		error: false,
		message: getReasonPhrase(StatusCodes.OK),
	});
}