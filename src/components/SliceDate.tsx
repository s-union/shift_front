// 引数のyyyy-mm-dd形式の文字列をスライスして、mm月dd日形式の文字列を返す関数
const SliceDate = (dateString: string): string => {
    const [, month, day] = dateString.split('-');
    return `${month}月${day}日`;
};

export default SliceDate;