import mongoose from 'mongoose';

enum AuthorityLevel {
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
}

export const adminSchema = new mongoose.Schema<IAdmin>(
	{
		email: { type: mongoose.Schema.Types.String, required: true },
		password: { type: mongoose.Schema.Types.String, required: true },
		createdAt: { type: mongoose.Schema.Types.Number, default: Date.now, required: true },
		authorityLevel: {
			type: mongoose.Schema.Types.Number,
			default: AuthorityLevel.MEMBER,
		},
		secret: { type: mongoose.Schema.Types.String, required: true },
	},
	{
		collection: 'admins',
	},
);

export const Admin = mongoose.models.Admin as mongoose.Model<IAdmin> || mongoose.model<IAdmin>('Admin', adminSchema);