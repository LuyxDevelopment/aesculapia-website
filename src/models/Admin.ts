import mongoose from 'mongoose';

export interface IAdmin {
	email: string;
	password: string;
	createdAt: number;
}

export const adminSchema = new mongoose.Schema<IAdmin>(
	{
		email: mongoose.Schema.Types.String,
		password: mongoose.Schema.Types.String,
		createdAt: { type: mongoose.Schema.Types.Number, default: Date.now },
	},
	{
		collection: 'admins',
	},
);

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
