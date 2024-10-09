'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'ログインに失敗しました');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            router.push('/admin');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('不明なエラーが発生しました');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">管理画面ログイン</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'ログイン中...' : 'ログイン'}
                    </button>
                </form>
                {error && (
                    <div className="modal mt-6 p-4 bg-red-600 text-white rounded-md shadow-md">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;