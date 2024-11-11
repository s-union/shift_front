import { Shift } from '@/src/types/shift';

export default function ShiftCard({ shift }: { shift: Shift }) {
    return (
        <div className='text-center max-w-sm rounded-lg overflow-hidden shadow-lg p-6 bg-white mx-auto border border-gray-200'>
            <h2 className='text-2xl mb-4 font-semibold text-gray-800'>{shift.name}</h2>
            <p className='font-bold mb-4 text-2xl text-gray-700'>
                {shift.start_time.slice(0, -3)} - {shift.end_time.slice(0, -3)}
            </p>
            <p className='text-gray-600 text-base mb-4'>{shift.place}</p>
            <a href={shift.url} className='text-blue-500 hover:text-blue-700'>
                詳細
            </a>
        </div>
    );
}
