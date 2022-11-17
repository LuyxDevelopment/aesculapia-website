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
				setImage(`${process.env.NEXT_PUBLIC_DOMAIN}/assets/logo.png`);
			}
		});
	});
	return (
		<Head>
			<title>{title}</title>
			<link
				rel="shortcut icon"
				href="/assets/logo.png"
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
				content="#EF4444"
				data-react-helmet="true"
				name="theme-color"
			/>
		</Head>
	);
};
