"use client";
// inputフォームでstudent_idを受け取り、fetchShifts関数を呼び出す
import React, { useState } from 'react';
import { fetchShifts } from '@/src/component/fetch_shifts';
import { Shift } from '../types/shift';
import ShiftCard from '@/src/component/shift_card';

export default function ShiftPage() {
    // 学籍番号を入力するフォーム
    const [student_id, setStudentId] = useState<string>("");
    // fetchShifts関数の結果を格納するstate
    const [shifts, setShifts] = useState<Shift[]>([]);
    // 入力フォームの値が変更されたらstateを更新
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentId(e.target.value);
    }
    // フォームが送信されたらfetchShifts関数を呼び出す
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchShifts(student_id)
            .then(data => {
                setShifts(data);
            });
    }
    return (
        <div>
            <p>welcome , {student_id}</p>

            {/* フォーム */}
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>

            {shifts.map((shift: Shift, index: number) => (
                <div key={index} className="mx-auto max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
                    {index === 0 && <h2 className="mx-auto text-center text-2xl font-bold mb-2">直近のシフト</h2>}
                    {index === 1 && <h2 className="mx-auto text-center text-2xl font-bold mb-2">以降のシフト</h2>}
                    <ShiftCard shift={shift} />
                </div>
            ))}
        </div>
    );
}