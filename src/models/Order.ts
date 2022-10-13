import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';
import { ProductDocument, productSchema } from './Product';

export interface IOrder {
	email: string;
	firstName: string;
	lastName: string;
	issuedAt: number;
	product: Types.ObjectId;
}

export interface OrderPopulated {
	product: ProductDocument;
}

export type OrderModel = Model<OrderDocument>;

export type OrderDocument = HydratedDocument<IOrder>;

export const orderSchema = new Schema<IOrder, OrderModel>({
	email: Schema.Types.String,
	issuedAt: Schema.Types.Number,
	product: productSchema,
}, {
	collection: 'orders',
});

export const Order = mongoose.models.Order as OrderModel || mongoose.model<IOrder, OrderModel>('Order', orderSchema);