import Image from 'next/image';
import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
	runtime: 'experimental-edge',
};

export default function ogHandler(req: NextRequest) {
	const { searchParams } = req.nextUrl;
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
				<img
					src={`${process.env.NEXT_PUBLIC_DOMAIN ?? 'http://localhost:3000'}/assets/logo.png`}
					alt='Aesculapia Logo'
					width='150'
					tw='pb-3'
				/>
				<p tw='text-3xl font-bold'>{description}</p>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
