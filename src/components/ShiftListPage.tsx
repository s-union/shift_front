'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Shift {
    startTime: string;
    endTime: string;
    description: string;
}

const mockShiftData: Shift[] = [
    { startTime: '08:00', endTime: '12:00', description: '午前シフト' },
    { startTime: '13:00', endTime: '17:00', description: '午後シフト' },
    { startTime: '18:00', endTime: '22:00', description: '夜間シフト' },
];

export default function ShiftListPage() {
    const [studentId, setStudentId] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const cachedStudentId = localStorage.getItem('student_id');
        if (cachedStudentId) setStudentId(cachedStudentId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('student_id');
        router.push('/');
    };

    return (
        <div className='min-h-screen bg-gray-50 p-8'>
            <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold mb-6 text-center'>シフト一覧</h1>

                <div className='relative'>
                    <div className='absolute top-0 left-4 w-1 bg-gray-300 h-full'></div>
                    {mockShiftData.map((shift, index) => (
                        <div key={index} className='flex items-start mb-8'>
                            <div className='w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold'>
                                {index + 1}
                            </div>
                            <div className='ml-6'>
                                <p className='text-gray-500'>{`${shift.startTime} - ${shift.endTime}`}</p>
                                <p className='text-lg font-semibold'>{shift.description}</p>
                                <button className='mt-2 px-4 py-2 text-sm text-cyan-600 border border-cyan-600 rounded-lg hover:bg-cyan-50'>
                                    詳細
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-6 text-center'>
                    <button onClick={handleLogout} className='text-red-500 hover:underline'>
                        ログアウト
                    </button>
                </div>

                <div className='mt-4 text-sm text-gray-500 text-center'>※ こちらは規定に従ったシフト情報です。</div>
            </div>
        </div>
    );
}
