import Head from 'next/head';

export const useMetaData = (
	title: string,
	description: string,
	url: string,
): JSX.Element => {
	return (
		<Head>
			<title>{`Aesculapia | ${title}`}</title>
			<link
				rel='shortcut icon'
				href='/assets/logo.png'
				type='image/png'
			/>

			<meta
				property='og:title'
				content={title}
			/>
			<meta
				property='og:description'
				content={description}
			/>
			<meta
				property='og:url'
				content={url}
			/>
			<meta
				property='og:image'
				content={`${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=${description}`}
			/>
			<meta
				content='#EF4444'
				data-react-helmet='true'
				name='theme-color'
			/>
		</Head>
	);
};
