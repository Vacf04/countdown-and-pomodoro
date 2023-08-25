const title = document.querySelector('title');
const startButton = document.querySelector('.start');
const clockText = document.querySelector('.clock span');
const textAlert = document.querySelector('.text-alert');
const notification = new Audio('assets/sounds/notification.mp3');
let minutes;
let seconds;
let breakTime = false;
let pomodoro;

function pomodoroTimer() {
  seconds--;
  if(seconds < 0) {
    minutes --;
    seconds = 59;
  }
  displayClockText();
  if(minutes === 0 && seconds === 0) {
    notification.play();
    pausePomodoro();  
    breakTime = true;
    minutes = 5;
    seconds = 0;
    displayClockText();
    textAlert.textContent = 'BREAK TIME!!';  
  };
}

function breakTimer() {
  
  seconds--;
  if(seconds < 0) {
    minutes --;
    seconds = 59;
  }
  displayClockText();
  if(minutes === 0 && seconds === 0) {
    notification.play();
    pausePomodoro();
    breakTime = false;
    minutes = 25;
    seconds = 0;
    displayClockText();
    textAlert.textContent = 'WORK TIME!!';  
  }
}


function displayClockText() {
  clockText.textContent = `00:${formatTime(minutes)}:${formatTime(seconds)}`;
  title.textContent = clockText.textContent;
}

function formatTime(time) {
  return (time > 9) ? `${time}`:`0${time}`;
} 

function editButton(add, text, remove) {
  if(remove) startButton.classList.remove(remove);
  startButton.classList.add(add); 
  startButton.textContent = text;
}

function startPomodoro(timer, initialMinutes, initialSeconds) {
  clearInterval(pomodoro);
  minutes = initialMinutes;
  seconds = initialSeconds;
  editButton('started', 'PAUSE')
  pomodoro = setInterval(timer, 1000);
}

function pausePomodoro() {
  clearInterval(pomodoro);
  editButton('paused', 'START', 'started')
}

function resumePomodoro(restMinutes, restSeconds) {
  clearInterval(pomodoro);
  editButton('started', 'PAUSE', 'paused');
  if(breakTime) {
    startPomodoro(breakTimer, restMinutes, restSeconds);
  } else {
    startPomodoro(pomodoroTimer, restMinutes, restSeconds);
  }
  }

startButton.addEventListener('click', (e) => {
  if(e.target.classList.contains('started')) {
    pausePomodoro();
  } else if(e.target.classList.contains('paused')){
    resumePomodoro(minutes, seconds);
  }else {
    if(breakTime) {
      startPomodoro(breakTimer, 5, 0, 'BREAK TIME!!');
    } else {
      startPomodoro(pomodoroTimer, 25, 0, 'WORK TIME!!');
    }
  };
});

