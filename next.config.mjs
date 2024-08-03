/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["next-mdx-remote"],
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "landingfoliocom.imgix.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
    reactStrictMode: true,
};

export default nextConfig;
