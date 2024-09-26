import { Shift } from "@/src/types/shift";

export default function ShiftCard({ shift }: { shift: Shift }) {
  return (
    <div className="text-center max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white mx-auto border">
      <h2 className="text-xl font-bold mb-2">{shift.name}</h2>
      <p className="text-gray-700 text-base">{shift.start_time} - {shift.end_time}</p>
      <p className="text-gray-700 text-base">{shift.place}</p>
      <a href={shift.url} className="text-blue-500 hover:text-blue-700">詳細</a>
    </div>
  );
}