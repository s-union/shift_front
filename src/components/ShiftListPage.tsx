'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // ここを変更
import { fetchShifts } from '@/src/components/fetch_shifts';
import { Shift } from '../types/shift';
import ShiftCard from '@/src/components/shift_card';
import Modal from 'react-modal';
import Link from 'next/link';
import Loading from '@/src/app/loading';

const modalStyle: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'relative',
        textAlign: 'center',
        width: '90%',
        maxWidth: '25rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default function ShiftListPage() {
    const [shifts, setShifts] = useState<Shift[] | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false); // 追加
    const [currentTime, setCurrentTime] = useState<string>('');
    const searchParams = useSearchParams();
    const student_id = searchParams.get('student_id');

    useEffect(() => {
        if (student_id) {
            fetchShifts(student_id)
                .then((data) => {
                    setShifts(data);
                })
                .catch(() => {
                    setModalIsOpen(true); // 404エラーの場合にモーダルを開く
                });
        }
    }, [student_id]);

    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleString('ja-JP', {
                timeZone: 'Asia/Tokyo',
                hour: '2-digit',
                minute: '2-digit',
            });
            setCurrentTime(formattedTime);
        };

        updateCurrentTime(); // 初回実行
        const intervalId = setInterval(updateCurrentTime, 60000); // 1分ごとに更新

        return () => clearInterval(intervalId); // クリーンアップ
    }, []);

    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            {shifts === null ? (
                <Loading />
            ) : (
                <>
                    <div className='flex justify-between items-center mb-8'>
                        <p className='text-xl font-semibold text-gray-800'>
                            {student_id}　|　現在時刻 {currentTime}
                        </p>
                    </div>
                    {shifts.map((shift: Shift, index: number) => (
                        <div
                            key={index}
                            className={`mx-auto max-w-lg p-6 bg-white rounded-lg shadow-lg mb-8 ${
                                index === 0 ? 'border-l-4 border-blue-500' : ''
                            }`}
                        >
                            {index === 0 && <h2 className='text-2xl font-bold text-blue-600 mb-4'>直近のシフト</h2>}
                            {index === 1 && <h2 className='text-2xl font-bold text-gray-600 mt-8 mb-4'>以降のシフト</h2>}
                            <ShiftCard shift={shift} />
                        </div>
                    ))}
                </>
            )}
            <Modal isOpen={modalIsOpen} style={modalStyle}>
                <h2 className='font-bold text-red-700'>エラー：シフト内に存在しません</h2>
                <Link href='/'>
                    <button
                        className='mt-6 px-6 py-2 text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300'
                        onClick={() => setModalIsOpen(false)}
                    >
                        戻る
                    </button>
                </Link>
            </Modal>
        </div>
    );
}
