// 本日の日付をyyyy-mm-dd形式の文字列で取得する関数

export const CurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return { 'a': `${year}-${month}-${day}`, 'b': `${month}月${day}日` };
};