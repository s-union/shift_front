'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Shift {
    id: number;
    startTime: string;
    endTime: string;
    note: string;
}

const shifts: Shift[] = [
    { id: 1, startTime: '09:00', endTime: '12:00', note: '' },
    { id: 2, startTime: '13:00', endTime: '17:00', note: '' },
    { id: 3, startTime: '18:00', endTime: '22:00', note: '' },
];

export default function ShiftListPage() {
    const [studentId, setStudentId] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const cachedStudentId = localStorage.getItem('student_id');
        if (cachedStudentId) {
            setStudentId(cachedStudentId);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStudentId(value);
        localStorage.setItem('student_id', value);
    };

    const handleDetail = (shiftId: number) => {
        alert(`詳細ボタンが押されました: シフトID ${shiftId}`);
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8'>
            <div className='max-w-lg w-full bg-white shadow-lg rounded-lg p-6 mb-8 border'>
                <label className='block text-lg font-bold mb-2'>学籍番号:</label>
                <input
                    type='text'
                    value={studentId}
                    onChange={handleChange}
                    className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition'
                    placeholder='学籍番号を入力してください'
                />
            </div>

            <div className='w-full max-w-lg'>
                {shifts.map((shift) => (
                    <div
                        key={shift.id}
                        className='flex justify-between items-center bg-white shadow-md p-4 mb-4 rounded-lg border hover:shadow-lg transition'
                    >
                        <div>
                            <div className='text-xl font-semibold'>
                                {shift.startTime} - {shift.endTime}
                            </div>
                            <input
                                type='text'
                                value={shift.note}
                                placeholder='メモを追加'
                                className='w-full mt-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500'
                            />
                        </div>
                        <button
                            onClick={() => handleDetail(shift.id)}
                            className='ml-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition'
                        >
                            詳細
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
