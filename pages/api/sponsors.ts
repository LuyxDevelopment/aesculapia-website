import { NextApiRequest, NextApiResponse } from 'next';
import { Admin, Sponsor } from '../../src/models';

export default async function sponsorsHandler(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	switch (req.method) {
		case 'DELETE': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const sponsor = await Sponsor.findByIdAndDelete(req.query.pid);

			if (!sponsor) {
				return void res.status(404).json({
					error: true,
					message: 'Sponsor not found.',
					data: null,
				});
			}

			return void res.status(200).json({
				error: false,
				message: `Sponsor #${req.query.pid} successfully deleted.`,
			});
		}

		case 'GET': {
			if (req.query.pid) {
				const sponsor = await Sponsor.findById(req.query.pid);

				if (!sponsor) {
					return void res.status(404).json({
						error: true,
						message: 'Sponsor not found.',
					});
				}

				return void res.status(200).json({
					error: false,
					message: 'Sponsor found.',
					data: sponsor,
				});
			}

			const sponsors = await Sponsor.find({});

			return void res.status(200).json({
				error: false,
				message: 'All sponsors found',
				data: sponsors,
			});
		}

		case 'PATCH': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const sponsor = await Sponsor.findByIdAndUpdate(req.query.pid, { $set: req.body });

			if (!sponsor) {
				return void res.status(404).json({
					error: true,
					message: 'Sponsor not found.',
				});
			}

			return void res.status(200).json({
				error: false,
				message: 'Sponsor successfully updated',
				data: sponsor,
			});
		}

		case 'POST': {
			const admin = await Admin.findOne({ email: req.session.user?.email });

			if (!admin) {
				return void res.status(403).json({
					error: true,
					message: 'Forbidden access',
				});
			}

			const sponsor = new Sponsor(req.body);

			try {
				await sponsor.save();
			} catch (error) {
				console.log(error);

				return void res.status(400).json({
					error: true,
					message: 'Error creating sponsor',
				});
			}
		} break;
	}
}