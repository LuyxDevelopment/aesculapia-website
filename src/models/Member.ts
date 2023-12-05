import { default as mongoose, HydratedDocument, Model, Schema } from 'mongoose';

export interface IMember {
	name: string;
	email: string;
	paymentMethod: string;
	memberId: string;
	ldc: string;
}

export type MemberDocument = HydratedDocument<IMember>;

export type MemberModel = Model<IMember>;

export const memberSchema = new Schema<IMember, MemberModel>({
	name: { type: Schema.Types.String, required: true },
	email: { type: Schema.Types.String, required: true },
	paymentMethod: { type: Schema.Types.String, required: true },
	memberId: { type: Schema.Types.String, required: true },
	ldc: { type: Schema.Types.String, required: true },
}, {
	collection: 'members',
});

export const Member = mongoose.models.Member as MemberModel || mongoose.model<IMember, MemberModel>('Member', memberSchema);