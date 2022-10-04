import mongoose from 'mongoose';

export interface IUser {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: number;
}

export const userSchema = new mongoose.Schema<IUser>({
	username: mongoose.Schema.Types.String,
	firstName: mongoose.Schema.Types.String,
	lastName: mongoose.Schema.Types.String,
	email: mongoose.Schema.Types.String,
	createdAt: mongoose.Schema.Types.Number,
}, {
	collection: 'users',
});

export const User = mongoose.model<IUser>('User', userSchema);