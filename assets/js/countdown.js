const title = document.querySelector('title');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
const clockText = document.querySelector('.clock span');
let hours = 0;
let minutes = 0;
let seconds = 0;
let countdown;

startButton.addEventListener('click', (e) => {
  if(e.target.classList.contains("started")) {
    pause();
    e.target.classList.remove("started");
  } else{
    start();
  };
});
resetButton.addEventListener('click', reset);

function displayClockText() {
  clockText.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  title.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function displayButtonText(text) {
  startButton.textContent = text;
}

function timer () {
  seconds++;
  if(seconds == 60) {
    seconds = 0;
    minutes++;
  };
  if(minutes > 59) {
    minutes = 0;
    hours++;
  };
  displayClockText();
};

function start() {
  startButton.classList.add("started");
  countdown = setInterval(timer, 1000);
  displayButtonText("PAUSE");
};

function pause() {
  clearInterval(countdown);
  displayButtonText("START");
};

function reset() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  displayClockText();
};

function formatTime(time) {
  return (time > 9) ? `${time}`:`0${time}`;
} ;

