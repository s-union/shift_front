import { Shift } from '@/src/types/shift';

export default function ShiftCard({ shift }: { shift: Shift }) {
    return (
        <div className='text-center max-w-sm rounded-xl overflow-hidden shadow-md p-6 bg-white mx-auto border border-gray-300 transition-transform transform hover:scale-105'>
            <h2 className='text-3xl mb-4 font-bold text-gray-900'>{shift.name}</h2>
            <p className='font-semibold mb-4 text-xl text-gray-800'>
                {shift.start_time.slice(0, -3)} - {shift.end_time.slice(0, -3)}
            </p>
            <p className='text-gray-700 text-base mb-4'>{shift.place}</p>
            <a href={shift.url} className='text-indigo-600 hover:text-indigo-800'>
                詳細
            </a>
        </div>
    );
}
