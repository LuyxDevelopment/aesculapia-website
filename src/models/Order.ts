import mongoose from 'mongoose';
import { productSchema } from './Product';

export interface IOrder {
	email: string;
	issuedAt: number;
	user: mongoose.Types.ObjectId;
	product: mongoose.Types.ObjectId;
}

export const orderSchema = new mongoose.Schema<IOrder>({
	email: mongoose.Schema.Types.String,
	issuedAt: mongoose.Schema.Types.Number,
	user: mongoose.Schema.Types.ObjectId,
	product: productSchema,
}, {
	collection: 'orders',
});

export const Order = mongoose.models.Order as mongoose.Model<IOrder> || mongoose.model<IOrder>('Order', orderSchema);