import { ServerClient } from 'postmark';
import { IProduct } from '../models';

export class Mail {
	private readonly postmark: ServerClient;

	constructor() {
		this.postmark = new ServerClient(process.env.NEXT_POSTMARK_API_KEY);
	}

	public async sendConfirmationMail(to: string, orderId: string, name: string, total: number, cart: IProduct[], type: string, card: { last4: string, brand: string } | null): Promise<void> {
		for (let i = 0; i < cart.length; i++) {
			cart[i].price /= 100;
		}
		await this.postmark.sendEmailWithTemplate({
			'TemplateId': 29486543,
			'TemplateModel': {
				'name': name,
				'order_id': orderId,
				'receipt_details': cart,
				'date': new Date(Date.now()).toDateString(),
				'company_name': 'Aesculapia',
				'company_address': 'Universiteitsplein 1 Antwerpen 2610, Belgium',
				'total': total / 100,
				'payment_type': type.split(' ').map((word) => {
					return word[0].toUpperCase() + word.substring(1);
				}).join(' '),
				...(card && { 'credit_card_last_four': card.last4 }),
				...(card && {
					'credit_card_brand': card.brand.split(' ').map((word) => {
						return word[0].toUpperCase() + word.substring(1);
					}).join(' '),
				}),
			},
			'From': 'contact@luyx.dev',
			'To': 'contact@luyx.dev',
			'MessageStream': process.env.NEXT_POSTMARK_MESSAGE_STREAM,
		});
	}
}

export const mail = new Mail();