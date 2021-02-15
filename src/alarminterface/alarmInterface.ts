import AlarmInfo from './alarmInfo';
import TerminateAlarm from './terminateAlarm';
import RemoveAlarm from './removeAlarm';
import SaveAlarm from './saveAlarm';
import SwitchAlarm from './switchAlarm';
import { SaveDataType } from './saveAlarm';

export interface AlarmData {
  id: number;
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

export default class AlarmInterface {
  // 등록된 알람 object data 관리.
  data: AlarmData[];

  alarmList: HTMLUListElement;
  saveAlarm: SaveAlarm;
  switchAlarm: SwitchAlarm;
  alarmInfo: AlarmInfo;
  removeAlarm: RemoveAlarm;
  terminateAlarm: TerminateAlarm;

  constructor() {
    this.data = JSON.parse(sessionStorage.getItem('alarm')) || [];

    const alarmList: HTMLUListElement = document.querySelector('.alarm_list');
    this.alarmList = alarmList;

    this.saveAlarm = new SaveAlarm({
      onSave: (data: SaveDataType) => this.saveData(data),
    });

    this.switchAlarm = new SwitchAlarm({
      onToggleSwitch: (id: number) => this.toggleSwitch(id),
    });

    this.alarmInfo = new AlarmInfo({
      onDetail: (id: number) => this.toggleDetail(id),
    });

    this.removeAlarm = new RemoveAlarm({
      onRemove: (id: number) => this.removeData(id),
    });

    this.terminateAlarm = new TerminateAlarm({
      onRemove: (id: number) => this.removeData(id),
    });

    this.render();
  }

  // 알람 object 저장.
  saveData(data: SaveDataType): void {
    this.data.push({
      id: this.data.length ? this.data[this.data.length - 1].id + 1 : 1,
      ...data,
    });

    this.render();
  }

  // 알람 스위치 object prop 변경.
  toggleSwitch(id: number): void {
    this.data = this.data.map((e: AlarmData) => {
      if (e.id === id) return { ...e, switchOn: !e.switchOn };
      return e;
    });

    this.render();
  }

  // 알람 상세보기 object prop 변경.
  toggleDetail(id: number): void {
    this.data = this.data.map((e: AlarmData) => {
      if (e.id === id) return { ...e, detail: !e.detail };
      return e;
    });

    this.render();
  }

  // 알람 object 삭제.
  removeData(id: number): void {
    this.data = this.data.filter((e: AlarmData) => e.id !== id);

    this.render();
  }

  // 현재시간 변경 시 지나간 날짜 알람 object 제거.
  setData(mliSec: number) {
    this.data = this.data.filter((e: AlarmData) => e.mliSec >= mliSec);

    this.render();
  }

  // 등록된 알람 data rendering
  render(): void {
    const data: AlarmData[] = [...this.data];

    this.alarmList.innerHTML = data
      .sort((a: AlarmData, b: AlarmData) => a.mliSec - b.mliSec)
      .map(
        (alarm: AlarmData, i: number) => `
      <li id=${alarm.id} class='alarm_info alarm${alarm.id}'>
        <div class='summary_info'>
        <p>${i + 1}.</p>
        <h3>${alarm.time}</h3>
        <p>${alarm.date}</p>
        <button class='detail'>상세보기</button>
        <button class='switch'>${alarm.switchOn ? '끄기' : '켜기'}</button>
        <button class='remove'>삭제</button>
        </div>
        <div ${alarm.detail ? '' : 'hidden'} class='detail_info'>
          <p>시계모드: ${alarm.clockMode}</p>
          <p>알람모드: ${alarm.alarmMode}</p>
          <p>알림: ${alarm.sound}</p>
          <p>메모: ${alarm.memo}</p>
        </div>
      </li>
    `
      )
      .join('');

    // 현재시간 Mutation Observer 실행.
    this.terminateAlarm.observeClock(this.data);

    sessionStorage.setItem('alarm', JSON.stringify(this.data));
  }
}
