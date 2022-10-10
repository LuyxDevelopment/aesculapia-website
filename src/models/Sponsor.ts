import mongoose from 'mongoose';

export interface ISponsor {
	name: string;
	image: string;
	url: string;
}

export const sponsorSchema = new mongoose.Schema<ISponsor>({
	name: mongoose.Schema.Types.String,
	image: mongoose.Schema.Types.String,
	url: mongoose.Schema.Types.String,
}, {
	collection: 'sponsors',
});

export const Sponsor = mongoose.models.Sponsor as mongoose.Model<ISponsor> || mongoose.model<ISponsor>('Sponsor', sponsorSchema);