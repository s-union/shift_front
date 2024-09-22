import { Shift } from "@/src/types/shift";

export default function ShiftCard({ shift }: { shift: Shift }) {
  return (
    <div>
      <h2>{shift.name}</h2>
      <h3>{shift.start_time}～{shift.end_time}</h3>
      <p>{shift.place}</p>
      <a href={shift.url}>esa記事</a>
    </div>
  );
}