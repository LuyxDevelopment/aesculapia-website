import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse,
): void {
	return res.status(200).send();
}