export type Shift = {
    id: number;
    student_id: string;
    details_id: number;
    // start_time, end_time はhh:mm:ss形式の文字列
    date: string;
    start_time: string;
    end_time: string;
    name: string;
    url: string;
    place: string;
};
