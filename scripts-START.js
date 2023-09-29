let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const totalSeconds = seconds;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const now = Date.now();
  const then = now + totalSeconds * 1000;
  displayTimeLeft(hours, minutes, remainderSeconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    let secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    let remainingHours = Math.floor(secondsLeft / 3600);
    secondsLeft %= 3600;
    let remainingMinutes = Math.floor(secondsLeft / 60);
    let remainingSeconds = secondsLeft % 60;

    displayTimeLeft(remainingHours, remainingMinutes, remainingSeconds);
  }, 1000);
}

function displayTimeLeft(hours, minutes, seconds) {
  const display = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const seconds = this.minutes.value * 60;
  timer(seconds);
  this.reset();
});
