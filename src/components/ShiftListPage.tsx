'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegCalendarAlt } from 'react-icons/fa'; // アイコン例

export default function ShiftFormPage() {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (studentId.trim() !== '') {
            router.push(`/shift?student_id=${studentId}`);
        }
    };

    const isDisabled = studentId.trim() === '';

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>シフト予約</h1>

            <form onSubmit={handleSubmit} className='w-full max-w-lg bg-white shadow-md rounded-2xl p-6 border border-gray-200'>
                <div className='mb-5'>
                    <label className='block text-lg font-semibold text-gray-700 mb-2'>学籍番号</label>
                    <input
                        type='text'
                        value={studentId}
                        onChange={handleChange}
                        placeholder='例: 12345678'
                        className='w-full py-3 px-4 border rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition transform hover:scale-105'
                    />
                </div>

                <div className='flex justify-end mt-4'>
                    <button
                        type='submit'
                        disabled={isDisabled}
                        className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-all transform hover:scale-105 ${
                            isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'
                        }`}
                    >
                        送信
                    </button>
                </div>
            </form>

            {/* シフトのスケジュール表示 */}
            <div className='w-full max-w-lg mt-8'>
                <h2 className='text-xl font-bold text-gray-800 mb-4'>スケジュール</h2>

                <div className='space-y-4'>
                    <ShiftCard date='4月22日' time='10:00 - 11:00 AM' title='Tooth Scaling' status='予約済み' multiple />
                    <ShiftCard
                        date='4月20日'
                        time='09:00 - 10:00 AM'
                        title='Simple Extractions'
                        status='未払い'
                        payment='$240.00'
                        multiple
                    />
                </div>
            </div>
        </div>
    );
}

type ShiftCardProps = {
    date: string;
    time: string;
    title: string;
    status: string;
    multiple?: boolean;
    payment?: string;
};

const ShiftCard: React.FC<ShiftCardProps> = ({ date, time, title, status, multiple, payment }) => (
    <div className='bg-white shadow-md rounded-xl p-4 border border-gray-200 flex justify-between items-center'>
        <div>
            <p className='text-sm text-gray-500'>{date}</p>
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
            <p className='text-sm text-gray-500'>{time}</p>
            {multiple && <span className='text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg'>MULTIPLE</span>}
        </div>

        <div className='text-right'>
            <p className={`text-sm font-semibold ${status === '未払い' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
            {payment && <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>支払う</button>}
        </div>
    </div>
);
