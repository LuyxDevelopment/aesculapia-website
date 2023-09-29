import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';
import { ProductDocument } from './Product';
import { DisplayProduct } from '../../components/ProductCard';

export interface IOrder {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	issuedAt: number;
	receivedAt: number | null;
	products: DisplayProduct[];
	delivered: boolean;
	emailSent: boolean;
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
	_id: Schema.Types.String,
	email: Schema.Types.String,
	firstName: Schema.Types.String,
	lastName: Schema.Types.String,
	issuedAt: { type: Schema.Types.Number, default: Date.now },
	receivedAt: { type: Schema.Types.Number, default: null },
	products: Schema.Types.Array,
	delivered: { type: Schema.Types.Boolean, default: false },
	emailSent: { type: Schema.Types.Boolean, default: false },
}, {
	collection: 'orders',
	methods: {
		markReceived(this: OrderDocument): void {
			this.receivedAt = Date.now();
		},
	},
});

export const Order = mongoose.models.Order as OrderModel || mongoose.model<IOrder, OrderModel>('Order', orderSchema);
