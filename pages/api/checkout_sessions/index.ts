import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../src/types/index';
import dbConnect from '../../../src/util/dbConnect';

dbConnect();

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
): void {
	res.status(StatusCodes.OK).json({
		error: false,
		message: getReasonPhrase(StatusCodes.OK),
		data: null,
	});
}