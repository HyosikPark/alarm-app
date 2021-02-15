# 1. 문서 구조

```
src
│  alarmDate.ts
│  app.ts
│  currentDate.ts
│  index.ts
│
├─alarminterface
│      alarmInfo.ts
│      alarmInterface.ts
│      removeAlarm.ts
│      saveAlarm.ts
│      switchAlarm.ts
│      terminateAlarm.ts
│
├─styles
│      styles.css
│
├─templates
│      index.html
│
└─test
        AlarmInterface.test.ts
        currentDate.test.ts
        saveAlarm.test.ts
        testData.ts
```

# 2. 모듈 구조

- index.ts (entry point)

  - app.ts <br>
    currentDate.ts, alarmDate.ts, alarmInterface.ts의 Class instance를 관리합니다.

    - curretDate.ts <br>
      현재시간을 나타내는 format(yyyy-mm-dd hh:mm:ss 금요일)을 설정하고, 1초마다 시간을 나타내는 DOM을 업데이트합니다. <br>
      현재시간을 재 설정할 수 있습니다.

    - alarmDate.ts <br>
      알람등록란의 알람 날짜를 현재시간보다 앞설 수 없도록 설정합니다. <br>
      현재시간을 재 설정할 때마다 렌더링됩니다.

    - alarmInterface.ts <br>
      saveAlarm.ts, switchAlarm.ts, removeAlarm.ts, alarmInfo.ts, terminateAlarm.ts의 Class instance를 관리합니다. <br>
      현재 등록되어 있는 알람 각각의 정보를 data 배열에 저장하여 관리합니다. <br>
      알람 각각의 정보는 object로 관리합니다. <br>
      알람의 추가,삭제, onOff 현재시간 변경 등을 감지하여 data를 수정한 뒤 data를 이용하여 DOM을 렌더링하고 sessionStorage에 저장합니다.
      알람이 추가되어 있는 상태에서 현재시간을 변경하게 되면 재 설정한 시간 보다 앞선 시간의 알람 데이터는 알림없이 삭제됩니다.

      - saveAlarm.ts <br>
        알람추가 버튼을 누르면 알람시간 설정 여부 및 알람시간이 현재시간보다 앞서 있는지 비교하여 에러사항을 판별합니다. <br>
        이상이 없으면 입력한 알람정보를 담은 object를 생성하여 AlarmInterface.ts의 AlarmInterface Class 에 전달합니다.

      - switchAlarm.ts <br>
        알람기능의 onOff 클릭을 감지하여 AlarmInterface.ts에 전달합니다.

      - removeAlarm.ts <br>
        알람기능의 삭제 클릭을 감지하여 AlarmInterface.ts에 전달합니다.

      - alarmInfo.ts <br>
        알람의 상세보기 기능을 감지하여 AlarmInterface.ts에 전달합니다.

      - terminateAlarm.ts <br>
        MutationObserver API를 통해 현재시간의 변경 사항을 관찰합니다. <br>
        data의 각 알람 object의 시간과 비교하여 알람시간에 도달할 경우 종료메시지를 렌더링합니다. <br>
        data가 수정되어 등록된 알람이 리렌더링 될 때마다 MutationObserver를 다시 생성하여 등록된 data를 최신 상태로 유지합니다. <br>
        종료된 알람은 alarmInterface.ts에 삭제를 요청합니다.

# 3. 알람 Object

```
{
  id: number    등록된 알람을 구분하는 고유 id 값.  ex) 1
  fullDate: string    날짜와 시간 정보.  ex) yyyy-mm-dd hh:mm
  date: string    날짜 정보.  ex) yyyy-mm-dd
  time: string    시간 정보.  ex) hh:mm
  mliSec: number    UTC 기준(UTC+0) 1970년 1월 1일 0시 0분 0초에서 milliseconds 밀리초(1/1000 초) 후의 알람시점.  ex) 1519211809934
  clockMode: string    시계모드 정보.  ex) 진동
  alarmMode: string    알람모드 정보.  ex) 긴급
  sound: string    알림 종류  ex) 무음
  memo: string    알림 등록 시 사용자가 기록해둔 메모 사항.
  switchOn: boolean    알람기능 onOff 관리.
  detail: boolean    알람 상세보기 onOff 관리.
}
```

# 4. 실행방법

- npm install

  - npm start

    - http://localhost:3000/ 접속하여 실행합니다.

  - npm build

    - build file output: ./dist: html,css,javascript bundle

  - npm test
    - jest

# 5. 참고사항

- html head script

  - MutationObserver API Polyfill
  - Pulling flatpickr.js
