// A product that users can buy. Aesculapia admins create these.
// These products are not actually given to the user. Transactions are added to the user

import mongoose from 'mongoose';

export interface IProduct {
	title: string;
	description: string;
	cost: number;
	salePercent: number;
	stock: number;
}

const productSchema = new mongoose.Schema<IProduct>({
	title: mongoose.Schema.Types.String,
	description: mongoose.Schema.Types.String,
	cost: mongoose.Schema.Types.Number,
	salePercent: { type: mongoose.Schema.Types.Number, default: 1.00 },
	stock: { type: mongoose.Schema.Types.Number, default: 0 },
}, {
	collection: 'products',
});

export const Product = mongoose.model<IProduct>('Product', productSchema);