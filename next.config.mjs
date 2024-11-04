/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)", // 全てのパスに対して適用
                headers: [
                    {
                        "key": "Access-Control-Allow-Credentials",
                        "value": "true"
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "http://shift-api-2024.nodaridaisai.com", // 許可するURLを指定
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,POST,PUT,DELETE,OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With, Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
