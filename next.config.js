/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["wp-next-headless.local", "localhost"],
	},
};

module.exports = nextConfig;
