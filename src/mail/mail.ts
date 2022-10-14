import { ServerClient } from 'postmark';

export class Mail {
	private readonly postmark: ServerClient;

	constructor() {
		console.log(process.env.POSTMARK_API_KEY);
		this.postmark = new ServerClient('');
	}

	public async sendMail(to: string, orderId: string): Promise<void> {
		await this.postmark.sendEmail({
			'From': 'contact@luyx.dev',
			'To': 'contact@luyx.dev',
			'Subject': 'Hello from Postmark',
			'HtmlBody': '<strong>Hello</strong> dear Postmark user.',
			'TextBody': 'Hello from Postmark!',
			'MessageStream': 'test',
		});
	}
}

export const mail = new Mail();