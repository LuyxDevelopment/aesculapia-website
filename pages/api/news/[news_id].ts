import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, INews, News } from '../../../src/models/index';

export default async function handler(
	req: NextApiRequest & { body: INews; } & { query: { news_id: string; }; },
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

			try {
				new Types.ObjectId(req.query.news_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});

				return;
			}

			const news = await News.findByIdAndDelete(req.query.news_id);

			if (!news) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});

				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
			});
		} break;

		case 'GET': {
			try {
				new Types.ObjectId(req.query.news_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});

				return;
			}

			const news = await News.findById(req.query.news_id);

			if (!news) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});

				return;
			}

			res.status(StatusCodes.OK).json({
				error: false,
				message: getReasonPhrase(StatusCodes.OK),
				data: news,
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
				new Types.ObjectId(req.query.news_id);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				});
			}

			const news = await News.findById(req.query.news_id);

			if (!news) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
				});

				return;
			}

			try {
				news.set(req.body);
				await news.save();

				res.status(StatusCodes.OK).json({
					error: false,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: news,
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

			const news = new News(req.body);

			try {
				await news.save();

				res.status(StatusCodes.CREATED).json({
					error: false,
					message: getReasonPhrase(StatusCodes.CREATED),
				});

			} catch (error) {
				console.log(error);

				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: true,
					message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
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