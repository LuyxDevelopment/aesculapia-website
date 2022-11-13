import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';

export interface ISponsor {
	name: string;
	imageURL: string;
	url: string;
}

export type SponsorDocument = HydratedDocument<ISponsor>;

export type SponsorModel = Model<ISponsor>;

export const sponsorSchema = new Schema<ISponsor, SponsorModel>({
	name: { type: Schema.Types.String, minLength: 1, maxLength: 64, required: true },
	imageURL: { type: Schema.Types.String, minLength: 1, required: true },
	url: { type: Schema.Types.String, minLength: 1, required: true },
}, {
	collection: 'sponsors',
});

export const Sponsor = mongoose.models.Sponsor as SponsorModel || mongoose.model<ISponsor, SponsorModel>('Sponsor', sponsorSchema);