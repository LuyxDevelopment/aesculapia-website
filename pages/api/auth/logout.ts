import { NextApiRequest, NextApiResponse } from 'next';
import { ironOptions } from '../../../src/util/ironConfig';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ResponseData } from '../../../src/types';
import { StatusCodes } from 'http-status-codes';

export default withIronSessionApiRoute(function logoutHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
): void {
	req.session.destroy();
	res.status(StatusCodes.MULTIPLE_CHOICES).redirect('/');
}, ironOptions);
