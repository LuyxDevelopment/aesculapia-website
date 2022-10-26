import { ImageResponse } from '@vercel/og';
import type { NextApiRequest } from 'next';
import Image from 'next/image';

export const config = {
	runtime: 'experimental-edge',
};

export default function ogHandler(req: NextApiRequest) {
	const { searchParams } = new URL(req.url!);
	const description = searchParams.get('description') ?? 'Aesculapia';

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					color: 'white',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'linear-gradient(to left, #ef4444, #991b1b)',
					width: '100%',
					height: '100%',
					borderRadius: 25,
				}}
			>
				<Image
					src="/public/assets/logo.png"
					alt="aesculapia-logo"
					width="150"
					tw="pb-3"
				/>
				<p tw="text-3xl font-bold">{description}</p>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
