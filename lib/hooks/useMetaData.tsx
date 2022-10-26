import Head from 'next/head';
import { useState, useEffect } from 'react';

export const useMetaData = (
	title: string,
	description: string,
	url: string,
): JSX.Element => {
	const [image, setImage] = useState('');
	useEffect(() => {
		fetch(`/api/og?description=${description}`).then((res) => {
			if (res.ok) {
				setImage(res.url);
			} else {
				setImage('/assets/logo.png');
			}
		});
	}, []);
	return (
		<Head>
			<title>{title} | Aesculapia</title>
			<link
				rel="shortcut icon"
				href=""
				type="image/png"
			/>

			<meta
				property="og:title"
				content={title}
			/>
			<meta
				property="og:description"
				content={description}
			/>
			<meta
				property="og:url"
				content={url}
			/>
			<meta
				property="og:image"
				content={image}
			/>
			<meta
				content="#4297BA"
				data-react-helmet="true"
				name="theme-color"
			/>
		</Head>
	);
};
