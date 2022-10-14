import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';

export interface ISponsor {
	name: string;
	image: string;
	url: string;
}

export type SponsorDocument = HydratedDocument<ISponsor>;

export type SponsorModel = Model<ISponsor>;

export const sponsorSchema = new Schema<ISponsor, SponsorModel>({
	name: Schema.Types.String,
	image: Schema.Types.String,
	url: Schema.Types.String,
}, {
	collection: 'sponsors',
});

export const Sponsor = mongoose.models.Sponsor as SponsorModel || mongoose.model<ISponsor, SponsorModel>('Sponsor', sponsorSchema);