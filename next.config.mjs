/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)", // 全てのパスに対して適用
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: NEXT_PUBLIC_BACKEND_URL, // 許可するURLを指定
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
