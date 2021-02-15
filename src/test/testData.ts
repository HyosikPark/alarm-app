import { AlarmData } from '../alarminterface/alarmInterface';

export const dom = `<input class="set_time" />
    <h1 class="current_date"></h1>
    <button class="change_btn"></button>
    <input class="select_date" />
    <form class="submit_alarm"></form>
    <ol class="alarm_list">
      <button class="detail"></button>
      <button class="switch"></button>
      <button class="remove"></button>
    </ol>
    <select class="clock_mode_set">
      <option value="general">일반</option>
      <option value="vibration">진동</option>
      <option value="night">야간</option>
    </select>
    <select class="alarm_mode_set">
      <option value="general">일반</option>
      <option value="emergency">긴급</option>
    </select>
    <textarea class="alarm_memo" cols="30" rows="10"></textarea>
    <h4 class="save_error_text"></h4>
    <div class="time_out"></div>
  `;

export const testData: AlarmData[] = [
  {
    alarmMode: '일반',
    clockMode: '일반',
    date: '2021-02-08',
    detail: false,
    fullDate: '2021-02-08 12:00',
    id: 1,
    memo: 'test1',
    mliSec: 1612753200000,
    sound: '소리',
    switchOn: true,
    time: '12:00',
  },
  {
    alarmMode: '긴급',
    clockMode: '일반',
    date: '2021-02-10',
    detail: false,
    fullDate: '2021-02-10 12:00',
    id: 2,
    memo: 'test2',
    mliSec: 1612926000000,
    sound: '소리',
    switchOn: true,
    time: '12:00',
  },
  {
    alarmMode: '일반',
    clockMode: '진동',
    date: '2021-02-12',
    detail: false,
    fullDate: '2021-02-12 11:00',
    id: 3,
    memo: 'test3',
    mliSec: 1613095200000,
    sound: '진동',
    switchOn: true,
    time: '11:00',
  },
  {
    alarmMode: '긴급',
    clockMode: '진동',
    date: '2021-02-12',
    detail: false,
    fullDate: '2021-02-12 13:00',
    id: 4,
    memo: 'test4',
    mliSec: 1613102400000,
    sound: '진동',
    switchOn: true,
    time: '13:00',
  },
  {
    alarmMode: '일반',
    clockMode: '야간',
    date: '2021-02-13',
    detail: false,
    fullDate: '2021-02-13 13:00',
    id: 5,
    memo: 'test5',
    mliSec: 1613188800000,
    sound: '무음',
    switchOn: true,
    time: '13:00',
  },
  {
    alarmMode: '긴급',
    clockMode: '야간',
    date: '2021-02-17',
    detail: false,
    fullDate: '2021-02-17 13:00',
    id: 6,
    memo: 'test6',
    mliSec: 1613534400000,
    sound: '소리',
    switchOn: true,
    time: '13:00',
  },
];
