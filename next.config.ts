import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	output: "export",
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? { exclude: ["info", "warn", "error"] }
				: false,
	}
};

export default nextConfig;
