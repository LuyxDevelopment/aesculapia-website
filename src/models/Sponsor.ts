// A social for Aesculapia
import mongoose from 'mongoose';

export interface ISponsor {
	name: string;
	image: string;
	url: string;
}
const sponsorSchema = new mongoose.Schema<ISponsor>({
	name: mongoose.Schema.Types.String,
	image: mongoose.Schema.Types.String,
	url: mongoose.Schema.Types.String,
}, {
	collection: 'sponsors',
});

export const Sponsor = mongoose.model<ISponsor>('Sponsor', sponsorSchema);