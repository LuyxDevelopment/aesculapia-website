import QRCode from 'qrcode.react';
import type { NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../src/util/ironConfig';
import { useState } from 'react';
import { AdminProps } from '../../src/types/index';
import Layout from '../../components/Layout';

const AdminSettings: NextPage<{ user: { email: string, has2faEnabled: boolean; }, otpAuthUri: string; }> = ({ user, otpAuthUri }) => {
	const [qrCode] = useState(otpAuthUri);
	const [qrCodeShown, showQrCode] = useState(false);
	const [twoFactorAuthValid, setTwoFactorAuthValid] = useState(false);
	const [twoFactorAuthCode, setTwoFactorAuthCode] = useState('');

	const submit2FA = async (): Promise<void> => {
		const req = await fetch('/api/auth/2fa/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code: twoFactorAuthCode }),
		});

		const data = await req.json();

		if (data.data) {
			setTwoFactorAuthValid(true);
			await fetch('/api/auth/2fa/enable', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
		}
	};

	return (
		<>
			<Layout>
				{!user.has2faEnabled && (
					<div>
						<label className='font-bold text-2xl'>Disable 2FA</label>
						<br />
						<button
							type='submit'
							className='w-20 h-10 bg-emerald-500 text-white font-bold text-md rounded-lg hover:bg-emerald-700'
						>
						Disable 2FA
						</button>
					</div>
				)}
				{user.has2faEnabled && (
					<div>
						<label className='font-bold text-2xl'>Enable 2FA</label>
						<br />
						<button
							type='submit'
							className='w-20 h-10 bg-emerald-500 text-white font-bold text-md rounded-lg hover:bg-emerald-700'
							onClick={(): void => qrCodeShown ? showQrCode(false) : showQrCode(true)}
						>
						Enable 2FA
						</button>
					</div>
				)}
				{qrCodeShown && (

					<div>
						<label className='font-bold text-2xl'>2FA Code</label>
						<br />
						<input type='text' onChange={(e): void => setTwoFactorAuthCode(e.target.value)} />
						<button className='bg-green-500' onClick={submit2FA}>enter</button>
						<p className='text-black'>{twoFactorAuthValid ? 'Code is valid.' : 'Code is invalid.'}</p>
						<QRCode value={qrCode} size={256} />
					</div>
				)}
			</Layout>
		</>
	);
};

export default AdminSettings;

export const getServerSideProps = withIronSessionSsr(async function ({ req, resolvedUrl }): Promise<AdminProps> {
	const user = req.session.user;

	if (user?.email) {
		const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/2fa/generate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const json = await request.json();

		if (json.data) return {
			props: {
				user: { email: user.email, has2faEnabled: true, completed2fa: false },
				otpAuthUri: json.data,
			},
		};
		return {
			props: {
				user: { email: user.email, has2faEnabled: false, completed2fa: false },
				otpAuthUri: '',
			},
		};
	}

	if (!user) {
		return {
			props: {
				user: { email: '', has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: `/admin/login?from=${encodeURIComponent(resolvedUrl)}`,
				permanent: false,
			},
		};
	}

	return {
		props: { user: req.session.user },
	};
}, ironOptions);