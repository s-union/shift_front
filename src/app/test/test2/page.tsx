'use client';
import React from 'react';

type Res = { token: string };

const Page = () => {
    const handlePostRequest = async () => {
        const target_url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/login'; // 適当なURLに置き換えてください
        const body = {
            email: 'test@test.com',
            password: 'password'
        };

        try {
            const response = await fetch(target_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const result: Res = await response.json();
            console.log(result.token);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handlePostRequest} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                POSTリクエストを送信
            </button>
        </div>
    );
};

export default Page;