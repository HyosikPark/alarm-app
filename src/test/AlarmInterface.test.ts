import AlarmInterface from '../alarminterface/alarmInterface';
import { dom, testData } from './testData';

jest.mock('../alarminterface/alarmInfo');
jest.mock('../alarminterface/removeAlarm');
jest.mock('../alarminterface/saveAlarm');
jest.mock('../alarminterface/switchAlarm');
jest.mock('../alarminterface/terminateAlarm');

describe('AlarmInterface Class Test', () => {
  beforeEach(() => {
    document.body.innerHTML = dom;
  });

  it('toggleSwitch Alarm Data Test', () => {
    const alarmInterface = new AlarmInterface();

    alarmInterface.data = testData;

    alarmInterface.toggleSwitch(1);

    expect(alarmInterface.data[0].switchOn).toBeFalsy();

    alarmInterface.toggleSwitch(1);

    expect(alarmInterface.data[0].switchOn).toBeTruthy();
  });

  it('toggleDetail Alarm Data Test', () => {
    const alarmInterface = new AlarmInterface();

    alarmInterface.data = testData;

    alarmInterface.toggleDetail(1);

    expect(alarmInterface.data[0].detail).toBeTruthy();

    alarmInterface.toggleDetail(1);

    expect(alarmInterface.data[0].detail).toBeFalsy();
  });

  it('Remove Alarm Data Test', () => {
    const alarmInterface = new AlarmInterface();

    alarmInterface.data = testData;

    alarmInterface.removeData(1);

    expect(alarmInterface.data[0].id).not.toBe(1);
    expect(alarmInterface.data).toHaveLength(5);
  });
});
