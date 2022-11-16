import { EventDocument } from '../models/Event';
import { NewsDocument } from '../models/News';
import { OrderDocument } from '../models/Order';
import { ProductDocument } from '../models/Product';
import { SponsorDocument } from '../models/Sponsor';

export interface ResponseData<D = null> {
	error: boolean;
	message: string;
	data: D | null;
}

export type Documents = EventDocument | NewsDocument | OrderDocument | ProductDocument | SponsorDocument;

export interface BaseProps<T extends Documents | null> {
	props: {
		data?: T | T[] | null;
	};
}

export interface AdminProps<T extends Documents | null = null> extends BaseProps<T> {
	props: {
		data?: T | T[] | null;
		user?: {
			email: string;
			has2faEnabled: boolean;
			completed2fa: boolean;
		};
		otpAuthUri?: string;
	};
	redirect?: {
		destination: string,
		permanent: boolean,
	},
}