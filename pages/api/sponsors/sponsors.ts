import { NextApiRequest, NextApiResponse } from 'next';
import { Authentication } from '../../../src/auth/auth.js';
import {  AuthorityLevel, Sponsor } from '../../../src/models/index.js';

export default async function sponsorsHandler(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			if (!Authentication.auth(AuthorityLevel.ADMIN,req )) {
				return res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const sponsor = await Sponsor.findByIdAndDelete(req.query.pid);

			if (!sponsor) {
				return res.status(404).json({
					error: true,
					message: 'Sponsor not found.',
					data: null,
				});
			}

			return res.status(200).json({
				error: false,
				message: `Sponsor #${req.query.pid} successfully deleted.`,
			});
		}

		case 'GET': {
			if (req.query.pid) {
				const sponsor = await Sponsor.findById(req.query.pid);

				if (!sponsor) {
					return res.status(404).json({
						error: true,
						message: 'Sponsor not found.',
					});
				}

				return res.status(200).json({
					error: false,
					message: 'Sponsor found.',
					data: sponsor,
				});
			}

			const sponsors = await Sponsor.find({});

			return res.status(200).json({
				error: false,
				message: 'All sponsors found',
				data: sponsors,
			});
		}

		case 'PATCH': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				return res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const sponsor = await Sponsor.findByIdAndUpdate(req.query.pid, { $set: req.body });

			if (!sponsor) {
				return res.status(404).json({
					error: true,
					message: 'Sponsor not found.',
				});
			}

			return res.status(200).json({
				error: false,
				message: 'Sponsor successfully updated',
				data: sponsor,
			});
		}

		case 'POST': {
			if (!Authentication.auth(AuthorityLevel.ADMIN, req)) {
				return res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const sponsor = new Sponsor(req.body);

			try {
				await sponsor.save();
			} catch (error) {
				console.log(error);

				return res.status(400).json({
					error: true,
					message: 'Error creating sponsor',
				});
			}
		} break;
	}
}