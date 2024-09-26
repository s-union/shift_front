// 例 csv = ',08:00:00,08:30:00,09:00:00\n ... \n student_id_1,1,2,3\n student_id_2,4,,6\n ...etc'
// start_timeは1行目の2列目以降の値
// 二行目は無視
// start_timeは1行目の2列目以降の値, end_timeはstart_time+30分
// 返してほしいもの = [{student_id: 'student_id_1', detail_id :1,start_time : 08:00:00,end_time : 08:30:00},{ student_id: 'student_id_1', detail_id: 1, start_time: 08:30:00, end_time: 09:00:00},{ student_id: 'student_id_1', detail_id: 3, start_time: 09:00:00, end_time: 09:30:00},{ student_id: 'student_id_2', detail_id: 4, start_time: 08:00:00, end_time: 08:30:00},{ student_id: 'student_id_2', detail_id: 6, start_time: 09:00:00, end_time: 09:30:00}...] 
// CsvRes 型を定義
import { CsvRes } from "@/src/types/csvRes";

export default function ParseCsv(csv: string): CsvRes[] {
  const lines = csv.split('\r\n');
  const res: CsvRes[] = [];
  const start_time = lines[0].split(',').slice(1);
  for (let i = 2; i < lines.length; i++) {
    const values = lines[i].split(',');
    const student_id = values[0];
    for (let j = 1; j < values.length; j++) {
      if (values[j] !== '') {
        res.push({
          student_id: student_id,
          detail_id: parseInt(values[j], 10),
          start_time: start_time[j - 1],
          end_time: start_time[j],
        });
      }
    }
  }
  return res;
}