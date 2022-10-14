import QRCode from 'qrcode.react';
import type { NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../src/util/ironConfig';
import { useState } from 'react';
import { mail } from '../../src/mail/index';

const AdminSettings: NextPage<{ user: { email: string } , otpAuthUri: string }> = ({ otpAuthUri }) => {
	const [qrCode] = useState(otpAuthUri);
	const [qrCodeShown, showQrCode] = useState(false);

	const sendMail = async (): Promise<void> => {
		await mail.sendMail('53p.business@gmail.com', '1234567890');
	};

	return (
		<>
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
			{qrCodeShown && (
				<QRCode value={qrCode} size={256} />

			)}

			<button
				type='submit'
				className='w-20 h-10 bg-emerald-500 text-white font-bold text-md rounded-lg hover:bg-emerald-700'
				onClick={(): Promise<void> => sendMail()}
			>
					Send mail
			</button>
		</>
	);
};

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
	const user = req.session.user;

	if (user?.email) {
		const request = await fetch('http://localhost:3000/api/auth/2fa/generate', {
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
				destination: '/admin/login',
				permanent: false,
			},
		};
	}

	return {
		props: { user: req.session.user },
	};
}, ironOptions);

export default AdminSettings;
