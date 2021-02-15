interface SwitchAlarmProps {
  onToggleSwitch: (id: number) => void;
}

export default class SwitchAlarm {
  constructor({ onToggleSwitch }: SwitchAlarmProps) {
    const alarmList: HTMLOListElement = document.querySelector('.alarm_list');

    // 알람 스위치 버튼 event delegation
    alarmList.addEventListener('click', (e: MouseEvent) => {
      const elem = e.target as HTMLButtonElement;

      if (elem.className !== 'switch') return;

      const id: number = +elem.parentElement.parentElement.id;

      // toggle할 알람 id AlarmInterface에 전달.
      onToggleSwitch(id);
    });
  }
}
