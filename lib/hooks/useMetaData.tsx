import Head from 'next/head';

export const useMetaData = (
	title: string,
	description: string,
	url: string,
): JSX.Element => {
	return (
		<Head>
			<title>{title} | Aesculapia</title>
			<link
				rel="shortcut icon"
				href=""
				type="image/png"
			/>

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content="/assets/favicon.ico" />
			<meta content="#4297BA" data-react-helmet="true" name="theme-color" />
		</Head>
	);
};
