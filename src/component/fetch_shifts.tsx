import { Shift } from "@/src/types/shift";
import ShiftCard from "./shift_card";

const ApiUrl: string = "http://localhost:8000/api/shift/";

// 引数としてidを受け取り、そのstudent_idに対応するシフト情報の配列を返す
export async function fetchShifts(student_id: string): Promise<JSX.Element> {
    const res = await fetch(ApiUrl + { student_id });
    const shifts: Shift[] = await res.json();
    // shifts の中身をshift.start_timeの昇順に並び替える
    shifts.sort((a, b) => {
        if (a.start_time < b.start_time) {
            return -1;
        } else if (a.start_time > b.start_time) {
            return 1;
        } else {
            return 0;
        }
    });
    const now = new Date();
    const nowTime = now.getHours() * 60 + now.getMinutes();

    //現在時刻 > シフト開始時刻 かつ シフト終了時刻 > 現在時刻 のシフトを抽出

    const now_shifts = shifts.filter(shift => {
        const startTime = new Date(shift.start_time);
        const startHour = startTime.getHours();
        const startMinute = startTime.getMinutes();
        const startTimeMinutes = startHour * 60 + startMinute;
        const endTime = new Date(shift.end_time);
        const endHour = endTime.getHours();
        const endMinute = endTime.getMinutes();
        const endTimeMinutes = endHour * 60 + endMinute;
        return startTimeMinutes <= nowTime && nowTime <= endTimeMinutes;
    });

    //並び替えたshiftsのうち、現在時刻よりも後のものだけを抽出
    const later_shifts = shifts.filter(shift => {
        const startTime = new Date(shift.start_time);
        const startHour = startTime.getHours();
        const startMinute = startTime.getMinutes();
        const startTimeMinutes = startHour * 60 + startMinute;
        return startTimeMinutes >= nowTime;
    });
    if (now_shifts.length === 0 && later_shifts.length === 0) {
        return (
            <div>
                <h1>シフトはありません</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>現在のシフト</h1>
                {now_shifts.map((shift, index) => (
                    <ShiftCard key={index} shift={shift} />
                ))}
                <h1>これからのシフト</h1>
                {later_shifts.map((shift, index) => (
                    <ShiftCard key={index} shift={shift} />
                ))}
            </div>
        )
    }
}