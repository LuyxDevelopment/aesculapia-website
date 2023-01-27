import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, ISponsor, Sponsor, SponsorDocument } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/index';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';

dbConnect();

export default withIronSessionApiRoute(async function sponsorId(
	req: Omit<NextApiRequest, 'body'> & { body: ISponsor; } & { query: { sponsor_id?: string; }; },
	res: NextApiResponse<ResponseData<SponsorDocument | SponsorDocument[]>>,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			if (!isValidObjectId(req.query.sponsor_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const sponsor = await Sponsor.findByIdAndDelete(req.query.sponsor_id);

			if (!sponsor) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: null,
				});
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: null,
			});
		} break;

		case 'GET': {
			if (req.query.sponsor_id) {

				if (!isValidObjectId(req.query.sponsor_id)) {
					res.status(StatusCodes.BAD_REQUEST).json({
						error: true,
						message: getReasonPhrase(StatusCodes.BAD_REQUEST),
						data: null,
					});

					return;
				}

				const sponsor = await Sponsor.findById(req.query.sponsor_id);

				if (!sponsor) {
					res.status(StatusCodes.NOT_FOUND).json({
						error: true,
						message: getReasonPhrase(StatusCodes.NOT_FOUND),
						data: null,
					});

					return;
				}

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.OK),
					data: sponsor,
				});

				return;
			}

			const sponsors = await Sponsor.find({});

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: sponsors,
			});
		} break;

		case 'PATCH': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
					data: null,
				});

				return;
			}

			if (!isValidObjectId(req.query.sponsor_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const sponsor = await Sponsor.findById(req.query.sponsor_id);

			if (!sponsor) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: null,
				});

				return;
			}

			try {
				sponsor.set(req.body);
				await sponsor.save();

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: sponsor,
				});
			} catch (error) {
				console.log(error);

				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: true,
					message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
					data: null,
				});
			}
		} break;

		default: {
			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
				data: null,
			});
		} break;
	}
}, ironOptions);