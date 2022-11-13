import { NextApiRequest } from 'next';

export function hasUserSession(req: NextApiRequest): boolean {
	if (!req.session) return false;

	return req.session.user !== undefined;
}