"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // ここを変更
import { fetchShifts } from '@/src/components/fetch_shifts';
import { Shift } from '../types/shift';
import ShiftCard from '@/src/components/shift_card';
import Modal from 'react-modal';
import Link from 'next/link';
import Loading from '@/src/app/loading';

const modalStyle = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.85)"
    },
    content: {
        position: "relative",
        textAlign: "center",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "30rem",
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "1.5rem"
    }
};

export default function ShiftListPage() {
    const [shifts, setShifts] = useState<Shift[] | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false); // 追加
    const searchParams = useSearchParams();
    const student_id = searchParams.get('student_id');

    useEffect(() => {
        if (student_id) {
            fetchShifts(student_id)
                .then(data => {
                    setShifts(data);
                })
                .catch(() => {
                    setModalIsOpen(true); // 404エラーの場合にモーダルを開く
                });
        }
    }, [student_id]);

    return (
        <div>
            {shifts === null ? (
                <Loading />
            ) : (
                <>
                    <p className="p-1 m-8">{student_id}</p>
                    {shifts.map((shift: Shift, index: number) => (
                        <div key={index} className="mx-auto max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
                            {index === 0 && <h2 className="mx-auto text-center text-2xl font-bold mb-2">直近のシフト</h2>}
                            {index === 1 && <h2 className="mx-auto text-center text-2xl font-bold mt-8 mb-6">以降のシフト</h2>}
                            <ShiftCard shift={shift} />
                        </div>
                    ))}
                </>
            )}
            <Modal isOpen={modalIsOpen} style={modalStyle}>
                <h2 className="font-bold">エラー：シフト内に存在しません</h2>
                <Link href="/">
                    <button className="mt-6 ml-70p focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => setModalIsOpen(false)}>戻る</button>
                </Link>
            </Modal>
        </div>
    );
}