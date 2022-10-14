import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';

export interface IProduct {
	title: string;
	description: string;
	image: string;
	cost: number;
	stock: number;
}

export type ProductDocument = HydratedDocument<IProduct>;

export type ProductModel = Model<ProductDocument>;

export const productSchema = new Schema<IProduct, ProductModel>({
	title: Schema.Types.String,
	description: Schema.Types.String,
	image: Schema.Types.String,
	cost: Schema.Types.Number,
	stock: { type: Schema.Types.Number, default: 0 },
}, {
	collection: 'products',
});

export const Product = mongoose.models.Product as ProductModel || mongoose.model<IProduct, ProductModel>('Product', productSchema);