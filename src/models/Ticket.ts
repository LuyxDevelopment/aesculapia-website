import mongoose from 'mongoose';

export interface ITicket {
	event: mongoose.Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	membershipDiscount: boolean;
	membershipId: string;
}

export const ticketSchema = new mongoose.Schema<ITicket>({
	event: mongoose.Schema.Types.ObjectId,
	firstName: mongoose.Schema.Types.String,
	lastName: mongoose.Schema.Types.String,
	email: mongoose.Schema.Types.String,
	membershipDiscount: { type: mongoose.Schema.Types.Boolean, default: false },
	membershipId: { type: mongoose.Schema.Types.String, default: null },
}, {
	collection: 'tickets',
});

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);