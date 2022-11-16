import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { withIronSessionApiRoute } from 'iron-session/next';
import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth';
import { AuthorityLevel, INews, News, NewsDocument } from '../../../src/models/index';
import { ResponseData } from '../../../src/types/index';
import dbConnect from '../../../src/util/dbConnect';
import { ironOptions } from '../../../src/util/ironConfig';

dbConnect();

export default withIronSessionApiRoute(async function loginHandler(
	req: Omit<NextApiRequest, 'body'> & { body: INews; } & { query: { news_id?: string; }; },
	res: NextApiResponse<ResponseData<NewsDocument | NewsDocument[]>>,
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

			if (!isValidObjectId(req.query.news_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const news = await News.findByIdAndDelete(req.query.news_id);

			if (!news) {
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
				data: news,
			});
		} break;

		case 'GET': {
			if (!isValidObjectId(req.query.news_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const news = await News.findById(req.query.news_id);

			if (!news) {
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
				data: news,
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

			if (!isValidObjectId(req.query.news_id)) {
				res.status(StatusCodes.BAD_REQUEST).json({
					error: true,
					message: getReasonPhrase(StatusCodes.BAD_REQUEST),
					data: null,
				});

				return;
			}

			const news = await News.findById(req.query.news_id);

			if (!news) {
				res.status(StatusCodes.NOT_FOUND).json({
					error: true,
					message: getReasonPhrase(StatusCodes.NOT_FOUND),
					data: null,
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