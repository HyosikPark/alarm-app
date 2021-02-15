import AlarmInterface from '../alarminterface/alarmInterface';
import SaveAlarm, { SaveDataType } from '../alarminterface/saveAlarm';
import CurrentDate from '../currentDate';
import { dom, testData } from './testData';

declare global {
  interface Element {
    flatpickr({});
  }
}

jest.mock('../alarminterface/alarmInfo');
jest.mock('../alarminterface/removeAlarm');
// jest.mock('../alarminterface/saveAlarm');
jest.mock('../alarminterface/switchAlarm');
jest.mock('../alarminterface/terminateAlarm');

describe('SaveAlarm Class Test', () => {
  beforeEach(() => {
    Element.prototype.flatpickr = function ({}) {};

    document.body.innerHTML = dom;
  });

  it('SubmitEvent Alarm Data Save Test', () => {
    const alarmInterface = new AlarmInterface();

    const saveAlarm = new SaveAlarm({
      onSave: (data: SaveDataType) => alarmInterface.saveData(data),
    });

    saveAlarm.selectedDate.value = '2021-02-08 12:00';
    saveAlarm.memo.value = 'test1';

    saveAlarm.saveAlarm();

    expect(alarmInterface.data).toMatchObject([
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
    ]);
    expect(saveAlarm.memo.value).toBe('');
  });

  it('compareTime Method Test', () => {
    const saveAlarm = new SaveAlarm({
      onSave: () => {},
    });

    const currentDate = new CurrentDate({
      setAlarmDate: () => {},
      setAlarmData: () => {},
    });

    saveAlarm.compareTime();

    expect(saveAlarm.errorText.textContent).toBe('알람날짜를 선택해주세요.');

    currentDate.currentDate.textContent = '2021-02-08 12:00:01 월요일';
    saveAlarm.selectedDate.value = '2021-02-08 12:00';

    saveAlarm.compareTime();

    expect(saveAlarm.errorText.textContent).toBe(
      '알람시간이 현재시간보다 앞설 수 없습니다.'
    );
  });

  it('Sound Type Check', () => {
    const saveAlarm = new SaveAlarm({
      onSave: () => {},
    });

    expect(saveAlarm.checkSound('일반', '일반')).toBe('소리');
    expect(saveAlarm.checkSound('일반', '긴급')).toBe('소리');
    expect(saveAlarm.checkSound('진동', '일반')).toBe('진동');
    expect(saveAlarm.checkSound('진동', '긴급')).toBe('진동');
    expect(saveAlarm.checkSound('야간', '일반')).toBe('무음');
    expect(saveAlarm.checkSound('야간', '긴급')).toBe('소리');
  });
});
