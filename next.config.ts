import type { NextConfig } from "next";


const nextConfig: NextConfig = {
	output: "export",

	basePath: process.env.NODE_ENV === "production" ? '/elin-tools': undefined, // サブディレクトリ名

	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? { exclude: ["info", "warn", "error"] }
				: false,
	}
};

export default nextConfig;
