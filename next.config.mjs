/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'localhost', 
			'avatars.githubusercontent.com',
			'i.imgur.com',
		],
	},
};

export default nextConfig;
