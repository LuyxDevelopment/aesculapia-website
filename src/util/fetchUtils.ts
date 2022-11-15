// eslint-disable-next-line @typescript-eslint/ban-types
export const postJSON = async (url: string, body: {}): Promise<unknown> => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(body),
		});
		return await response.json();
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw error;
	}
};
