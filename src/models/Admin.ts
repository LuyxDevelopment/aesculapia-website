import { Schema, Model, default as mongoose, HydratedDocument } from 'mongoose';

export enum AuthorityLevel {
	ADMIN = 1,
	MODERATOR,
	MEMBER,
}

export interface IAdmin {
	email: string;
	password: string;
	createdAt: number;
	authorityLevel: AuthorityLevel;
	secret: string;
	has2faEnabled: boolean;
}

export interface AdminMethods {
	promote(this: AdminDocument): boolean;
	demote(this: AdminDocument): boolean;
}

export type AdminDocument = HydratedDocument<IAdmin, AdminMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type AdminModel = Model<IAdmin, {}, AdminMethods>;

export const adminSchema = new Schema<IAdmin, AdminModel, AdminMethods>(
	{
		email: { type: Schema.Types.String, required: true },
		password: { type: Schema.Types.String, required: true },
		createdAt: { type: Schema.Types.Number, default: Date.now, required: true },
		authorityLevel: {
			type: Schema.Types.Number,
			default: AuthorityLevel.MEMBER,
		},
		secret: { type: Schema.Types.String, required: true },
		has2faEnabled: { type: Schema.Types.Boolean, default: false },
	},
	{
		collection: 'admins',
		methods: {
			promote(this: AdminDocument): boolean {
				if (this.authorityLevel === AuthorityLevel.ADMIN)
					return false;
				
				this.authorityLevel++;
				return true;
			},
			demote(this: AdminDocument): boolean {
				if (this.authorityLevel === AuthorityLevel.MEMBER)
					return false;

				this.authorityLevel--;
				return true;
			},
		},
	},
);

export const Admin = mongoose.models.Admin as AdminModel || mongoose.model<IAdmin, AdminModel>('Admin', adminSchema);