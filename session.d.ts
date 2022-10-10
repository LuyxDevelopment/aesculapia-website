// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IronSessionData } from 'iron-session';

declare module 'iron-session' {
	interface IronSessionData {
		user?: {
			email: string,
			has2faEnabled: boolean,
			completed2fa: boolean,
		}
	}
}