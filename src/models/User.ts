import mongoose from 'mongoose';
import { Mongooseify } from '../util/mongoosify.js';
import { IProduct } from './Product.js';
import { IOrder } from './Order.js';

export interface IUser {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: number;
	events: mongoose.Types.ObjectId[];
	transactions: mongoose.Types.ObjectId[],
	admin: boolean;
	purchase(product: IOrder): Promise<IOrder>
}

const userSchema = new mongoose.Schema<IUser>({
	username: mongoose.Schema.Types.String,
	firstName: mongoose.Schema.Types.String,
	lastName: mongoose.Schema.Types.String,
	email: mongoose.Schema.Types.String,
	createdAt: mongoose.Schema.Types.Number,
	events: [mongoose.Schema.Types.ObjectId],
	transactions: [mongoose.Schema.Types.ObjectId],
	admin: { type: mongoose.Schema.Types.Boolean, default: false },
}, {
	methods: {
		// This is only run if the actual purchase was successful!!
		async purchase(product: Mongooseify<IProduct>): Promise<boolean> {
			this.transactions.push(product._id);
			await this.updateOne({ $addToSet: { transactions: product._id } });

			product.stock--;
			await product.updateOne({ $inc: { stock: -1 } });

			return true;
		},
	},
	collection: 'users',
});

export const User = mongoose.model<IUser>('User', userSchema);