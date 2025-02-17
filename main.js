// 랜덤번호 지정
// 랜덤번호 화면단 노출
// 유저가 번호를 입력 [go]버튼 클릭
// 랜덤번호 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호 Down!
// 랜덤번호 > 유저번호 Up!
// [Reset]버튼 누르면 게임 리셋
// 3번의 기회를 다 쓰면 게임종료 (버튼 disable)
// 유저가 1~100범위 밖에 숫자를 입력하면 알려줌, 기회 깎지 않음
// 유저가 이미 입력한 숫자를 또 입력하면 알려줌, 기회 깎지 않음

// 변수 선언
let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let answerArea = document.getElementById("answer-area"); 
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");

let chances = 3;
let gameOver = false;
let history = []

// 이벤트 등록
playButton.addEventListener("click", play);  // 함수도 매개변수로 넘길 수 있다
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function(){
  userInput.value = "";
});

// 랜덤 번호 생성
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100)+1; //Math.floor()소숫점 버림
  answerArea.textContent = `정답: ${computerNum}`;
}

// 게임 실행
function play(){
  let userValue = userInput.value;

  // 입력값 유효성 검사
  if(userValue<1 || userValue>100){
    resultArea.textContent = "1~100 사이의 숫자를 입력해 주세요."
    return;
  }

  // 중복 입력 확인
  if(history.includes(userValue)){
    resultArea.textContent ="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요."
    return;
  }

  // 남은 기회 감소
  chances --;
  chanceArea.textContent = `남은기회: ${chances}번`; //동적 넣으려면 "" 안됨, `${변수}`사용
  
  // 입력 기록 저장
  history.push(userValue);

  // 콘솔 출력
  console.log(`남은기회: ${chances}번`);
  console.log("입력한 숫자 목록:" ,history);

  // 정답 비교
  if (userValue < computerNum) {
    resultArea.textContent = "Up!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!";
  } else {
    endGame("맞췄습니다!");
    return;
  }

  // 기회 소진 확인
  if (chances < 1) {
    endGame("기회 소진! 게임이 종료되었습니다.");
  }
}

// 게임 종료  처리
function endGame(message) {
  resultArea.textContent = message;
  gameOver = true;
  playButton.disabled = true;
}

// 게임 리셋
function reset() {
  userInput.value = "";
  pickRandomNum();
  resultArea.textContent = "1~100 사이의 숫자를 입력해 주세요."
  chances = 3;
  chanceArea.textContent = `남은기회: ${chances}번`;
  history = []
  playButton.disabled = false;
  gameOver = false;
}

// 게임 시작 시 랜덤 번호 지정
pickRandomNum();
