/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [
			'aesculapia-vzw.be',
			'127.0.0.1',
			'avatars.githubusercontent.com',
			'i.imgur.com',
		],
	},
};

export default nextConfig;
