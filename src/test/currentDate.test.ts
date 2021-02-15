import CurrentDate from '../currentDate';
import AlarmDate from '../alarmDate';
import AlarmInterface from '../alarminterface/alarmInterface';
import { dom, testData } from './testData';

jest.mock('../alarminterface/alarmInfo');
jest.mock('../alarminterface/removeAlarm');
jest.mock('../alarminterface/saveAlarm');
jest.mock('../alarminterface/switchAlarm');
jest.mock('../alarminterface/terminateAlarm');

declare global {
  interface Element {
    flatpickr({});
  }
}

describe('CurrentDate Class Test', () => {
  beforeEach(() => {
    Element.prototype.flatpickr = function ({}) {};

    document.body.innerHTML = dom;
  });

  it('CurrentDate Format Dom Rendering Test', () => {
    const currentDate = new CurrentDate({
      setAlarmData: () => {},
      setAlarmDate: () => {},
    });

    currentDate.dateFormat(1612926000000);
    expect(currentDate.currentDate.textContent).toBe(
      '2021-02-10 12:00:00 수요일'
    );
  });

  it('Date ChangeBtn ClickEvent CurTime Update Test', () => {
    const currentDate = new CurrentDate({
      setAlarmDate: () => {},
      setAlarmData: () => {},
    });

    currentDate.timeSetting.value = '';
    currentDate.currentDate.textContent = 'anything';

    currentDate.changeBtn.click();

    expect(currentDate.currentDate.textContent).toBe('anything');

    currentDate.timeSetting.value = '2021-02-12 12:00';

    currentDate.changeBtn.click();

    expect(currentDate.currentDate.textContent).toBe(
      '2021-02-12 12:00:00 금요일'
    );
    expect(currentDate.timeSetting.value).toBe('');
  });

  it('Data ChangeBtn ClickEvent AlamDate Init Test', () => {
    const currentDate = new CurrentDate({
      setAlarmDate: (): void => alarmDate.render(),
      setAlarmData: () => {},
    });

    const alarmDate = new AlarmDate();

    currentDate.timeSetting.value = 'anything';
    alarmDate.selectDate.value = 'anything';

    currentDate.changeBtn.click();

    expect(currentDate.timeSetting.value).toBe('');
    expect(alarmDate.selectDate.value).toBe('');

    alarmDate.selectDate.value = 'anything';

    currentDate.changeBtn.click();

    expect(alarmDate.selectDate.value).toBe('anything');
  });

  it('Data Change ClickEvent AlarmInterface SetData Test', () => {
    const currentDate = new CurrentDate({
      setAlarmDate: () => {},
      setAlarmData: (mliSec: number): void => alarmInterface.setData(mliSec),
    });

    const alarmInterface = new AlarmInterface();

    alarmInterface.data = testData;

    currentDate.timeSetting.value = '2021-02-12 12:00';

    currentDate.changeBtn.click();

    alarmInterface.data.forEach((e) => {
      expect(e.mliSec > 1613098800000).toBeTruthy();
    });
  });
});
