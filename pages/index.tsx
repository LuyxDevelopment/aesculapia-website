import Head from 'next/head';
import Image from 'next/image';

export default function Home(): JSX.Element {
	return (
		<div>
			<Head>
				<title>Aesculapia</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main >
				<h1 >
					Aesculapia
				</h1>
			</main>

			<footer >
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
				</a>
			</footer>
		</div>
	);
}