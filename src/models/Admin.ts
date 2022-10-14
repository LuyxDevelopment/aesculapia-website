import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';

export enum AuthorityLevel {
	ADMIN = 1,
	MODERATOR,
	MEMBER,
}

export interface IAdmin {
	email: string;
	password: string;
	createdAt: number;
	authorityLevel: AuthorityLevel;
	secret: string;
	has2faEnabled: boolean;
}

export type AdminDocument = HydratedDocument<IAdmin>;

export type AdminModel = Model<IAdmin>;

export const adminSchema = new Schema<IAdmin, AdminModel>(
	{
		email: { type: Schema.Types.String, required: true },
		password: { type: Schema.Types.String, required: true },
		createdAt: { type: Schema.Types.Number, default: Date.now, required: true },
		authorityLevel: {
			type: Schema.Types.Number,
			default: AuthorityLevel.MEMBER,
		},
		secret: { type: Schema.Types.String, required: true },
		has2faEnabled: { type: Schema.Types.Boolean, default: false },
	},
	{
		collection: 'admins',
	},
);

export const Admin = mongoose.models.Admin as AdminModel || mongoose.model<IAdmin, AdminModel>('Admin', adminSchema);