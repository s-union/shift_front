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
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mb-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        学籍番号:
                    </label>
                    <input
                        type="text"
                        value={student_id}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input
                        type="submit"
                        value="送信"
                        className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
                            }`}
                        disabled={isDisabled} // ここで空欄の場合にボタンを無効化
                    />
                </div>
            </form>
        </div>
    );
}