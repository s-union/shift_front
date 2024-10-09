import { Shift } from "@/src/types/shift";

export default function ShiftCard({ shift }: { shift: Shift }) {
  return (
    <div className="text-center max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white mx-auto border">
      <h2 className="text-xl mb-2">{shift.name}</h2>
      <p className="font-bold mb-2 text-xl">{shift.start_time.slice(0, -3)} - {shift.end_time.slice(0, -3)}</p>
      <p className="text-gray-700 text-base inline mx-auto px-4">{shift.place}</p>
      <a href={shift.url} className="mx-auto px-4 inline text-blue-500 hover:text-blue-700">詳細</a>
    </div>
  );
}