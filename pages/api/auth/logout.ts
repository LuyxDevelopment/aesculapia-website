import { NextApiRequest, NextApiResponse } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(function registerHandler(
	req: NextApiRequest,
	res: NextApiResponse,
): void {
	req.session.destroy();
	res.status(300).redirect('/');
},
ironOptions);
