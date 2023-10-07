/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [
			'aesculapia-vzw.be',
			'127.0.0.1',
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
