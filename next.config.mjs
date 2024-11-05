/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        serverActions: {
            allowedOrigins: ['http://shift-api-2024.nodaridaisai.com'],
        },
    },

    async headers() {
        return [
            {
                source: "/(.*)", // 全てのパスに対して適用
                headers: [
                    { "key": "Access-Control-Allow-Credentials", "value": "true" },
                    { "key": "Access-Control-Allow-Origin", "value": "*" },
                    { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
                ],
            },
        ];
    },
};

export default nextConfig;
