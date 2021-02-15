declare global {
  interface Element {
    flatpickr({});
  }
}

export default class AlarmDate {
  currentDate: HTMLHeadElement;
  selectDate: HTMLInputElement;

  constructor() {
    const currentDate: HTMLHeadElement = document.querySelector(
      '.current_date'
    );
    const selectDate: HTMLInputElement = document.querySelector('.select_date');

    this.currentDate = currentDate;
    this.selectDate = selectDate;

    this.render();
  }

  // 선택가능한 최소날짜 설정.
  getMinDate(): string {
    const date: string = this.currentDate.textContent.slice(0, 10);

    return date;
  }

  // 알람시간 input rendering.
  render(): void {
    this.selectDate.flatpickr({
      minDate: this.getMinDate(),
      time_24hr: true,
      enableTime: true,
    });

    this.selectDate.value = '';
  }
}
