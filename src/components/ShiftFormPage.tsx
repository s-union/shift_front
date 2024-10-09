"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShiftFormPage() {
    const [student_id, setStudentId] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        // コンポーネントがマウントされたときにlocalStorageから値を読み込む
        const cachedStudentId = localStorage.getItem('student_id');
        if (cachedStudentId) {
            setStudentId(cachedStudentId);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStudentId(value);
        // 入力フィールドの値が変更されたときにlocalStorageに保存する
        localStorage.setItem('student_id', value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (student_id.trim() !== "") {
            router.push(`/shift?student_id=${student_id}`);
        }
    }

    const isDisabled = student_id.trim() === "";

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto bg-white p-8 mb-8 rounded-lg shadow-lg border-4">
                <div className="mb-6">
                    <label className="block text-lg font-bold mb-2">
                        学籍番号:
                    </label>
                    <input
                        type="text"
                        value={student_id}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input
                        type="submit"
                        value="送信"
                        className={`font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 ${isDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                            }`}
                        disabled={isDisabled}
                    />
                </div>
            </form>
        </div>
    );
}