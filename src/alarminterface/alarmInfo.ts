interface AlarmInfoProps {
  onDetail: (id: number) => void;
}

export default class AlarmInfo {
  constructor({ onDetail }: AlarmInfoProps) {
    const alarmList: HTMLOListElement = document.querySelector('.alarm_list');

    // 알람 상세보기 버튼 event delegation
    alarmList.addEventListener('click', (e: MouseEvent) => {
      const detailBtn = e.target as HTMLButtonElement;

      if (detailBtn.className !== 'detail') return;

      const id: number = +detailBtn.parentElement.parentElement.id;

      // toggle할 알람 id AlarmInterface에 전달.
      onDetail(id);
    });
  }
}
