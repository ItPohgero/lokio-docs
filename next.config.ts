import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "*",
				port: "",
			},
			{
				protocol: "https",
				hostname: "*",
				port: "",
			},
		],
	},
};

export default nextConfig;
