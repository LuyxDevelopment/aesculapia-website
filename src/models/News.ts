import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';

export interface INews {
	title: string;
	description: string;
	banner: string | null;
	hidden: boolean;
}

export type NewsModel = Model<NewsDocument>;

export type NewsDocument = HydratedDocument<INews>;

export const newsSchema = new Schema<INews, NewsModel>(
	{
		title: Schema.Types.String,
		description: Schema.Types.String,
		banner: { type: Schema.Types.String, default: null },
		hidden: { type: Schema.Types.Boolean, default: false },
	},
	{
		collection: 'news',
	},
);

export const News = mongoose.models.News as NewsModel || mongoose.model<INews, NewsModel>('News', newsSchema);
