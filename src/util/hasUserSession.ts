import { NextApiRequest } from 'next';

export function hasUserSession(req: NextApiRequest): boolean {
	return req.session.user === undefined;
}