import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';
import { Order, OrderDocument } from './Order';

export interface IProduct {
	_id: string;
	name: string;
	imageURL: string;
	isShirt: boolean;
	price: number;
	stock: number;
}

export interface ProductMethods {
	order(this: ProductDocument, email: string, firstName: string, lastName: string): OrderDocument | null;
}

export type ProductDocument = HydratedDocument<IProduct, ProductMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ProductModel = Model<IProduct, {}, ProductMethods>;

export const productSchema = new Schema<IProduct, ProductModel, ProductMethods>({
	_id: { type: Schema.Types.String, required: true },
	name: { type: Schema.Types.String, minlength: 1, maxLength: 64, required: true },
	imageURL: { type: Schema.Types.String, minLength: 1, maxLength: 1024, required: true },
	isShirt: { type: Schema.Types.Boolean, required: true },
	price: { type: Schema.Types.Number, min: 0, required: true },
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