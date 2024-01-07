/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",

			},
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "marketplace-production-8aec.up.railway.app",
			},
			{
				protocol: "https",
				hostname: "www.smrtuc.com",
			},
			{
				protocol: "https",
				hostname: "smrtuc.com",
			},
			
		],
	},
};

module.exports = nextConfig;
