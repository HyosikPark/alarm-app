export interface SaveDataType {
  fullDate: string;
  date: string;
  time: string;
  mliSec: number;
  clockMode: string;
  alarmMode: string;
  sound: string;
  memo: string;
  switchOn: boolean;
  detail: boolean;
}

interface SaveAlarmProps {
  onSave: (data: SaveDataType) => void;
}

export default class SaveAlarm {
  currentDate: HTMLHeadingElement;
  selectedDate: HTMLInputElement;
  clockMode: HTMLSelectElement;
  alarmMode: HTMLSelectElement;
  memo: HTMLTextAreaElement;
  alarmList: HTMLUListElement;
  submitAlarm: HTMLFormElement;
  errorText: HTMLHeadingElement;
  onSave: (data: SaveDataType) => void;

  constructor({ onSave }: SaveAlarmProps) {
    const currentDate: HTMLHeadingElement = document.querySelector(
      '.current_date'
    );
    const selectedDate: HTMLInputElement = document.querySelector(
      '.select_date'
    );
    const clockMode: HTMLSelectElement = document.querySelector(
      '.clock_mode_set'
    );
    const alarmMode: HTMLSelectElement = document.querySelector(
      '.alarm_mode_set'
    );
    const memo: HTMLTextAreaElement = document.querySelector('.alarm_memo');
    const alarmList: HTMLUListElement = document.querySelector('.alarm_list');
    const submitAlarm: HTMLFormElement = document.querySelector(
      '.submit_alarm'
    );
    const errorText: HTMLHeadingElement = document.querySelector(
      '.save_error_text'
    );

    this.selectedDate = selectedDate;
    this.currentDate = currentDate;
    this.clockMode = clockMode;
    this.alarmMode = alarmMode;
    this.memo = memo;
    this.alarmList = alarmList;
    this.submitAlarm = submitAlarm;
    this.errorText = errorText;
    this.onSave = onSave;

    // 알람 추가 버튼 event.
    submitAlarm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      this.compareTime();
    });
  }

  // 현재시간과 비교하여 알람 등록 여부 판별.
  compareTime(): void {
    // 알람시간 미 선택 시 알림.
    if (!this.selectedDate.value) {
      this.errorText.textContent = '알람날짜를 선택해주세요.';

      setTimeout(() => (this.errorText.textContent = ''), 3000);
      return;
    }

    const curDate: number = new Date(
      this.currentDate.textContent.slice(0, 19).replace(' ', 'T')
    ).getTime();

    const alarmDate: number = new Date(
      this.selectedDate.value.replace(' ', 'T')
    ).getTime();

    // 알람시간이 현재시간보다 앞 설 경우 알림.
    if (curDate > alarmDate) {
      this.errorText.textContent = '알람시간이 현재시간보다 앞설 수 없습니다.';

      setTimeout(() => (this.errorText.textContent = ''), 3000);
      return;
    }

    this.saveAlarm();
  }

  // 알람 object 저장 시 sound prop 소리 모드 결정.
  checkSound(clockMode: string, alarmMode: string): string {
    if (clockMode === '진동') return '진동';

    if (clockMode === '야간' && alarmMode === '일반') return '무음';

    return '소리';
  }

  // id를 제외한 알람 object 저장하여 alarmInterface에 전달.
  saveAlarm(): void {
    const fullDate: string = this.selectedDate.value;
    const date: string = this.selectedDate.value.slice(0, 10);
    const time: string = this.selectedDate.value.slice(11);
    const mliSec: number = new Date(fullDate.replace(' ', 'T')).getTime();
    const clockMode: string = this.clockMode.options[
      this.clockMode.selectedIndex
    ].textContent;
    const alarmMode: string = this.alarmMode.options[
      this.alarmMode.selectedIndex
    ].textContent;
    const sound: string = this.checkSound(clockMode, alarmMode);
    const memo: string = this.memo.value;

    const data: SaveDataType = {
      fullDate,
      date,
      time,
      mliSec,
      clockMode,
      alarmMode,
      sound,
      memo,
      switchOn: true,
      detail: false,
    };

    this.onSave(data);
    this.render();
  }

  // 알람 object 저장 시 시계모드, 알람모드, 메모 초기화 rendering.
  render(): void {
    const generalClockMode = this.clockMode.children[0] as HTMLOptionElement;
    const generalAlarmMode = this.alarmMode.children[0] as HTMLOptionElement;

    generalClockMode.selected = true;
    generalAlarmMode.selected = true;
    this.memo.value = '';
  }
}
