'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// シフトデータの型定義
interface Shift {
    id: number;
    startTime: string;
    endTime: string;
    description: string;
}

export default function ShiftListPage() {
    const [shifts, setShifts] = useState<Shift[]>([]); // ダミーデータ枠
    const router = useRouter();

    useEffect(() => {
        const cachedStudentId = localStorage.getItem('student_id');
        if (!cachedStudentId) router.push('/'); // 未ログインならリダイレクト
    }, [router]);

    // ダミーデータがここに反映される想定 (fetch部分は他スクリプトで管理)
    const dummyShifts: Shift[] = [
        { id: 1, startTime: '08:00', endTime: '12:00', description: '午前シフト' },
        { id: 2, startTime: '13:00', endTime: '17:00', description: '午後シフト' },
        { id: 3, startTime: '18:00', endTime: '22:00', description: '夜間シフト' },
    ];

    useEffect(() => {
        setShifts(dummyShifts); // データのセット
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
                    {/* タイムラインの縦線 */}
                    <div className='absolute top-0 left-5 w-1 bg-cyan-300 h-full rounded'></div>

                    {/* シフトカードのリスト */}
                    {shifts.map((shift) => (
                        <div
                            key={shift.id}
                            className='flex items-start mb-8 bg-white shadow-md p-4 rounded-lg border-l-4 border-cyan-500'
                        >
                            <div className='w-12 text-center text-cyan-600 font-semibold'>
                                <p>{shift.startTime}</p>
                                <p>|</p>
                                <p>{shift.endTime}</p>
                            </div>

                            <div className='ml-6 flex-grow'>
                                <h2 className='text-lg font-bold'>{shift.description}</h2>
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
