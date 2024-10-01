import { Shift } from "@/src/types/shift";

// ダミー回答をするtestAPI (立ち上げるのめんどくさいので)
// studentIDはそのままを返す/その他は適当な定数を返す
const ApiUrl: string = "https://script.google.com/macros/s/AKfycbyjjaRPoJySEOk_LkoSPsdyuLpLDXbKFl87gsQ_VbEsYZGIPEryEvkCnqU7QDwwvFPsww/exec?student_id=";
// const ApiUrl: string = "http://localhost:8000/api/shift/";

// 引数としてidを受け取り、そのstudent_idに対応するシフト情報の配列を返す
export async function fetchShifts(id: string): Promise<Shift[]> {
    const response = await fetch(ApiUrl + id);
    // responseが404の場合はエラーを投げる
    if (!response.ok) {
        throw new Error("404 Not Found");
    }
    const data = await response.json();
    // data.end_timeが現在時刻より後のものだけを返す
    const now = new Date('2024-01-01T08:00:00');

    const shifts = data.filter((shift: Shift) => {
        // end_timeは "09:00:00"のような文字列なので、Dateオブジェクトに変換する
        const end_time = new Date(`${shift.date}T${shift.end_time}`);
        return end_time > now;
    });
    shifts.sort((a: Shift, b: Shift) => {
        const endTimeA = new Date(`${a.date}T${a.end_time}`);
        const endTimeB = new Date(`${b.date}T${b.end_time}`);
        return endTimeA.getTime() - endTimeB.getTime();
    });

    return shifts;
}
