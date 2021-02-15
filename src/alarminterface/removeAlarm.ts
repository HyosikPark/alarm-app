export interface RemoveAlarmProps {
  onRemove: (id: number) => void;
}

export default class RemoveAlarm {
  constructor({ onRemove }: RemoveAlarmProps) {
    const alarmList: HTMLOListElement = document.querySelector('.alarm_list');

    // 알람 삭제 버튼 event delegation
    alarmList.addEventListener('click', (e: MouseEvent) => {
      const elem = e.target as HTMLButtonElement;

      if (elem.className !== 'remove') return;

      const id: number = +elem.parentElement.parentElement.id;
      // 제거할 알람 id AlarmInterface에 전달.
      onRemove(id);
    });
  }
}
