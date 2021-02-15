declare global {
  interface Element {
    flatpickr({});
  }
}

interface CurrentDateProps {
  setAlarmDate: () => void;
  setAlarmData: (getMliSec: number) => void;
}

export default class CurrentDate {
  currentDate: HTMLHeadingElement;
  timeSetting: HTMLInputElement;
  changeBtn: HTMLButtonElement;

  timer: NodeJS.Timeout;

  constructor({ setAlarmDate, setAlarmData }: CurrentDateProps) {
    const currentDate: HTMLHeadingElement = document.querySelector(
      '.current_date'
    );

    const timeSetting: HTMLInputElement = document.querySelector('.set_time');

    timeSetting.flatpickr({
      enableTime: true,
      time_24hr: true,
    });

    const changeBtn: HTMLButtonElement = document.querySelector('.change_btn');

    this.currentDate = currentDate;
    this.timeSetting = timeSetting;
    this.changeBtn = changeBtn;

    const now: number = Date.now();

    this.dateFormat(now);

    // 현재시간 변경 이벤트.
    changeBtn.addEventListener('click', () => {
      if (!timeSetting.value) return;

      clearTimeout(this.timer);

      const date: string = timeSetting.value.replace(' ', 'T');
      const newDate: Date = new Date(date);
      const getMliSec: number = newDate.getTime();

      timeSetting.value = '';

      this.dateFormat(getMliSec);

      setAlarmDate();
      setAlarmData(getMliSec);
    });
  }

  // 현재시간 format 변경.
  dateFormat(mliSec: number): void {
    const date: Date = new Date(mliSec);

    const year: string = date.getFullYear().toString();

    let month: string = (date.getMonth() + 1).toString();
    month = +month >= 10 ? month : '0' + month;

    let day: string = date.getDate().toString();
    day = +day >= 10 ? day : '0' + day;

    let hour: string = date.getHours().toString();
    hour = +hour >= 10 ? hour : '0' + hour;

    let min: string = date.getMinutes().toString();
    min = +min >= 10 ? min : '0' + min;

    let sec: string = date.getSeconds().toString();
    sec = +sec >= 10 ? sec : '0' + sec;

    const week: string[] = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const today: string = week[date.getDay()];

    const dateFormat: string = `${year}-${month}-${day} ${hour}:${min}:${sec} ${today}`;

    this.render(dateFormat);

    this.timer = setTimeout(() => this.dateFormat(mliSec + 1000), 1000);
  }

  // 현재시간 rendering
  render(dateFormat: string): void {
    this.currentDate.textContent = dateFormat;
  }
}
