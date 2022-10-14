import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';
import { ProductDocument } from './Product';

export interface IOrder {
	email: string;
	firstName: string;
	lastName: string;
	issuedAt: number;
	receivedAt: number | null;
	product: Types.ObjectId;
}

export interface OrderMethods {
	markReceived(this: OrderDocument): void;
}

export interface OrderPopulated {
	product: ProductDocument;
}

export type OrderDocument = HydratedDocument<IOrder, OrderMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type OrderModel = Model<IOrder, {}, OrderMethods>;

export const orderSchema = new Schema<IOrder, OrderModel, OrderMethods>({
	email: Schema.Types.String,
	firstName: Schema.Types.String,
	lastName: Schema.Types.String,
	issuedAt: { type: Schema.Types.Number, default: Date.now },
	receivedAt: { type: Schema.Types.Number, default: null },
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
}, {
	collection: 'orders',
	methods: {
		markReceived(this: OrderDocument): void {
			this.receivedAt = Date.now();
		},
	},
});

export const Order = mongoose.models.Order as OrderModel || mongoose.model<IOrder, OrderModel>('Order', orderSchema);
