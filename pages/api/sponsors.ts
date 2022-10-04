import { NextApiRequest, NextApiResponse } from 'next';

export default function sponsorsHandler(
	req: NextApiRequest,
	res: NextApiResponse,
): void {
	return void res.status(200);
}