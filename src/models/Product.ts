import mongoose from 'mongoose';

export interface IProduct {
	title: string;
	description: string;
	image: string;
	cost: number;
	stock: number;
}

export const productSchema = new mongoose.Schema<IProduct>({
	title: mongoose.Schema.Types.String,
	description: mongoose.Schema.Types.String,
	image: mongoose.Schema.Types.String,
	cost: mongoose.Schema.Types.Number,
	stock: { type: mongoose.Schema.Types.Number, default: 0 },
}, {
	collection: 'products',
});

export const Product = mongoose.models.Product as mongoose.Model<IProduct> || mongoose.model<IProduct>('Product', productSchema);