import AlarmDate from './alarmDate';
import CurrentDate from './currentDate';
import AlarmInterface from './alarminterface/alarmInterface';

export default class App {
  currentDate: CurrentDate;
  alarmDate: AlarmDate;
  alarmInterface: AlarmInterface;

  constructor(target: HTMLDivElement | null) {
    this.currentDate = new CurrentDate({
      setAlarmDate: (): void => this.alarmDate.render(),
      setAlarmData: (mliSec: number): void =>
        this.alarmInterface.setData(mliSec),
    });

    this.alarmDate = new AlarmDate();

    this.alarmInterface = new AlarmInterface();
  }
}
