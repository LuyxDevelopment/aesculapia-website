import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, ISponsor, Sponsor } from '../../../src/models/index';

export default async function handler(
	req: NextApiRequest & { body: ISponsor; } & { query: { sponsor_id: string; }; },
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
				});

				return;
			}

			const sponsor = await Sponsor.findByIdAndDelete(req.query.sponsor_id);

			if (!sponsor) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
			});
		} break;

		case 'GET': {
			if (req.query.sponsor_id) {
				const sponsor = await Sponsor.findById(req.query.sponsor_id);

				if (!sponsor) {
					res.status(StatusCodes.NOT_FOUND).json({
						error: true,
						message: getReasonPhrase(StatusCodes.NOT_FOUND),
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
				});

				return;
			}

			try {
				new Types.ObjectId(req.query.sponsor_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});

				return;
			}

			const sponsor = await Sponsor.findById(req.query.sponsor_id);

			if (!sponsor) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
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
				});
			}
		} break;

		case 'POST': {
			if (!Authentication.authenticate(AuthorityLevel.ADMIN, req)) {
				res.status(StatusCodes.FORBIDDEN).json({
					error: true,
					message: getReasonPhrase(StatusCodes.FORBIDDEN),
				});

				return;
			}

			const sponsor = new Sponsor(req.body);

			try {
				await sponsor.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
				});

			} catch (error) {
				console.log(error);

				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});
			}
		} break;

		default: {
			res.status(StatusCodes.NOT_FOUND).json({
				error: false,
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
			});
		} break;
	}
}