import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';

export interface INews {
	title: string;
	description: string;
	banner: string | null;
	hidden: boolean;
	publishedTimestamp: number;
	createdTimestamp: number;
}

export interface NewsMethods {
	edit(this: NewsDocument, data: Pick<INews, 'title' | 'description' | 'banner' | 'hidden'>): void;
	publish(this: NewsDocument): void;
	unpublish(this: NewsDocument): void;
}

export type NewsDocument = HydratedDocument<INews, NewsMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type NewsModel = Model<NewsDocument, {}, NewsMethods>;

export const newsSchema = new Schema<INews, NewsModel, NewsMethods>(
	{
		title: Schema.Types.String,
		description: Schema.Types.String,
		banner: { type: Schema.Types.String, default: null },
		hidden: { type: Schema.Types.Boolean, default: false },
		publishedTimestamp: { type: Schema.Types.Number, default: Date.now },
		createdTimestamp: { type: Schema.Types.Number, default: Date.now },
	},
	{
		collection: 'news',
		methods: {
			edit(this: NewsDocument, data: Partial<Pick<INews, 'title' | 'description' | 'banner' | 'hidden'>>): void {
				if (data.title !== undefined) this.title = data.title;
				if (data.description !== undefined) this.description = data.description;
				if (data.banner !== undefined) this.banner = data.banner;
				if (data.hidden !== undefined) this.hidden = data.hidden;
			},
			publish(this: NewsDocument): void {
				this.hidden = false;
			},
			unpublish(this: NewsDocument): void {
				this.hidden = true;
			},
		},
	},
);

export const News = mongoose.models.News as NewsModel || mongoose.model<INews, NewsModel>('News', newsSchema);
