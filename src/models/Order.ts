// Transactions users make when buying products

import mongoose from 'mongoose';

export interface IOrder {
	email: string;
	issuedAt: number;
	user: mongoose.Types.ObjectId;
	product: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema<IOrder>({
	email: mongoose.Schema.Types.String,
	issuedAt: mongoose.Schema.Types.Number,
	user: mongoose.Schema.Types.ObjectId,
	product: mongoose.Schema.Types.ObjectId,
}, {
	collection: 'orders',
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);