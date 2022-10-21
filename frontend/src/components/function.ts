export const timeExpetion = (input_time: number[]) => {
  //音楽の時間長さも例外処理に入れる．

  let error_messages: string[] = [];

  let bool_nan: boolean;
  input_time.forEach((x: number) => {
    if (Number.isNaN(x) === true) {
      bool_nan = true;
    }
  });

  if (bool_nan === true) {
    error_messages.push(
      "不正な文字などが入力されています。数字を入力してください。"
    );
  }

  const st_min: number = input_time[0];
  const st_second: number = input_time[1];
  const ed_min: number = input_time[2];
  const ed_second: number = input_time[3];

  if (
    !(0 <= st_second && st_second < 60) ||
    !(0 <= ed_second && ed_second < 60)
  ) {
    error_messages.push("不正な秒数が入力されています。");
  }

  if (!Number.isInteger(st_min) || !Number.isInteger(ed_min)) {
    error_messages.push("分は整数値をしてください。");
  }

  return error_messages;
};
