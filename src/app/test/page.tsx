"use client";
const ApiUrl: string = "http://localhost:8000/api/shift/1";
import React, { useEffect, useState } from 'react';
import ShiftCard from '@/src/component/shift_card';
import { Shift } from '@/src/types/shift';

// Apiからjsonを取得し、その中身を表示するだけのテストコンポーネント

export default function TestPage() {
    const [shifts, setShifts] = useState<JSX.Element>(<div></div>);

    useEffect(() => {
        fetch(ApiUrl)
            .then(res => res.json())
            .then(data => {
                setShifts(
                    <div>
                        <h1>現在のシフト</h1>
                        {data.map((shift: Shift, index: number) => (
                            <ShiftCard key={index} shift={shift} />
                        ))}
                    </div>
                );
            });
    }, []);

    return (
        <div>
            {shifts}
        </div>
    )
}