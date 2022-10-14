import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';
import { ProductDocument } from './Product.js';

export interface IOrder {
	email: string;
	firstName: string;
	lastName: string;
	issuedAt: number;
	product: Types.ObjectId;
}

export interface IOrderPopulated {
	product: ProductDocument;
}

export type OrderDocument = HydratedDocument<IOrder>;

export type OrderModel = Model<IOrder>;

export const orderSchema = new Schema<IOrder, OrderModel>({
	email: Schema.Types.String,
	issuedAt: Schema.Types.Number,
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
}, {
	collection: 'orders',
});

export const Order = mongoose.models.Order as OrderModel || mongoose.model<IOrder, OrderModel>('Order', orderSchema);
