import { NextApiRequest, NextApiResponse } from 'next';

export default function productsHandler(
	req: NextApiRequest,
	res: NextApiResponse,
): void {
	return void res.status(200);
}