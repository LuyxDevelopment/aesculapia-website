import mongoose from 'mongoose';

export interface INews {
	title: string;
	description: string;
	banner: string | null;
	hidden: boolean;
}

export const newsSchema = new mongoose.Schema<INews>(
	{
		title: mongoose.Schema.Types.String,
		description: mongoose.Schema.Types.String,
		banner: { type: mongoose.Schema.Types.String, default: null },
		hidden: { type: mongoose.Schema.Types.Boolean, default: false },
	},
	{
		collection: 'news',
	},
);

export const News = mongoose.models.News as mongoose.Model<INews> || mongoose.model<INews>('News', newsSchema);
