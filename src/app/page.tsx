"use client";
// inputフォームでstudent_idを受け取り、fetchShifts関数を呼び出す
import React, { useState } from 'react';
import { fetchShifts } from '@/src/component/fetch_shifts';

export default function ShiftPage() {
    const [student_id, setStudentId] = useState<string>("");
    const [shifts, setShifts] = useState<JSX.Element>(<div></div>);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const shifts = await fetchShifts(student_id);
        setShifts(shifts);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>学籍番号</label>
                <input
                    type="text"
                    value={student_id}
                    onChange={e => setStudentId(e.target.value)}
                />
                <button type="submit">送信</button>
            </form>
            {shifts}
        </div>
    )
}