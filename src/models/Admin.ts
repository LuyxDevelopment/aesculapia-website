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
}

export const adminSchema = new mongoose.Schema<IAdmin>(
	{
		email: mongoose.Schema.Types.String,
		password: mongoose.Schema.Types.String,
		createdAt: { type: mongoose.Schema.Types.Number, default: Date.now },
		authorityLevel: {
			type: mongoose.Schema.Types.Number,
			default: AuthorityLevel.MEMBER,
		},
	},
	{
		collection: 'admins',
	},
);

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
