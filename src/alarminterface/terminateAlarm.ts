import { AlarmData } from './alarmInterface';
import { RemoveAlarmProps } from './removeAlarm';

export default class TerminateAlarm {
  mo: MutationObserver;
  currentDate: HTMLHeadingElement;
  timeOutContainer: HTMLDivElement;
  onRemove: (id: number) => void;

  constructor({ onRemove }: RemoveAlarmProps) {
    const currentDate: HTMLHeadingElement = document.querySelector(
      '.current_date'
    );
    const timeOutContainer: HTMLDivElement = document.querySelector(
      '.time_out'
    );

    this.mo = new MutationObserver(() => {});

    this.timeOutContainer = timeOutContainer;
    this.currentDate = currentDate;
    this.onRemove = onRemove;
  }

  // 현재시간 변경 감지.
  observeClock(data: AlarmData[]): void {
    this.mo.disconnect();

    if (!data.length) return;

    // 현재시간 변경마다 저장된 alarm data와 시간비교.
    this.mo = new MutationObserver(() => {
      const curTime: number = new Date(
        this.currentDate.textContent.slice(0, 19).replace(' ', 'T')
      ).getTime();

      data.forEach((alarm) => {
        const alarmTime: number = alarm.mliSec;

        if (curTime < alarmTime) return;

        // 알람시간 도달 시 AlarmInterface에 알람제거 요청.
        this.onRemove(+alarm.id);

        // 알람 스위치가 꺼져 있다면 알림 x
        if (!alarm.switchOn) return;

        // 알림 내용 rendering
        this.render(alarm.fullDate, alarm.sound, alarm.memo);
      });
    });

    this.mo.observe(this.currentDate, { childList: true });
  }

  // 종료 알림 rendering.
  render(date: string, sound: string, memo: string): void {
    const message: HTMLParagraphElement = document.createElement('p');
    message.textContent = `${date} ${memo} ${sound}알림`;

    this.timeOutContainer.appendChild(message);

    // remove() polyfill.
    if (!Element.prototype.remove) {
      Element.prototype.remove = function remove() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }

    setTimeout(() => message.remove(), 7000);
  }
}
