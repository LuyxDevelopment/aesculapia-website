import { ServerClient } from 'postmark';

export class Mail {
	private readonly postmark: ServerClient;

	constructor() {
		console.log(process.env.POSTMARK_API_KEY);
		this.postmark = new ServerClient('');
	}

	public async sendConfirmationMail(to: string, orderId: string, name: string): Promise<void> {
		await this.postmark.sendEmailWithTemplate({
			'TemplateId': 29486543,
			'TemplateModel': {
				'name': name,
				'product_name': 'Aesculapia',
				'product_id': orderId,
				'company_name': 'Aesculapia',
				'company_address': '123 Burn Street',
			},
			'From': 'no-reply@aesculapia-vzw.be',
			'To': to,
			'MessageStream': 'test',
		});
	}
}

export const mail = new Mail();