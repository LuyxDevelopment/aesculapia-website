import { NextApiRequest, NextApiResponse } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../index';

export default withIronSessionApiRoute(function registerHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
): void {
	req.session.destroy();
	res.status(300).redirect('/');
}, ironOptions);
