// A social for Aesculapia
import mongoose from 'mongoose';

export interface ISocial {
	title: string;
	image: string;
	url: string;
}

const socialSchema = new mongoose.Schema<ISocial>({
	title: mongoose.Schema.Types.String,
	image: mongoose.Schema.Types.String,
	url: mongoose.Schema.Types.String,
}, {
	collection: 'socials',
});

export const Social = mongoose.model<ISocial>('Social', socialSchema);