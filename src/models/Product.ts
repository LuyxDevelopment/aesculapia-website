import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';
import { Order, OrderDocument } from './Order';

export interface IProduct {
	title: string;
	description: string;
	image: string;
	cost: number;
	stock: number;
}

export interface ProductMethods {
	order(this: ProductDocument, email: string, firstName: string, lastName: string): OrderDocument | null;
}

export type ProductDocument = HydratedDocument<IProduct, ProductMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ProductModel = Model<ProductDocument, {}, ProductMethods>;

export const productSchema = new Schema<IProduct, ProductModel, ProductMethods>({
	title: Schema.Types.String,
	description: Schema.Types.String,
	image: Schema.Types.String,
	cost: Schema.Types.Number,
	stock: { type: Schema.Types.Number, default: 0 },
}, {
	collection: 'products',
	methods: {
		order(this: ProductDocument, email: string, firstName: string, lastName: string): OrderDocument | null {
			if (this.stock < 1)
				return null;

			this.stock--;

			return new Order({
				email,
				firstName,
				lastName,
				product: this,
			});
		},
	},
});

export const Product = mongoose.models.Product as ProductModel || mongoose.model<IProduct, ProductModel>('Product', productSchema);