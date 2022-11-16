import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../src/types';
import dbConnect from '../../src/util/dbConnect';

dbConnect();

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
): void {
	res.status(StatusCodes.NOT_FOUND).json({
		error: false,
		message: getReasonPhrase(StatusCodes.NOT_FOUND),
		data: null,
	});
}