document.addEventListener('DOMContentLoaded', () => {
  let count = 1;
  let intervalId = null;
  const countDisplay = document.getElementById('count');

  const video = document.querySelector('video');

  function startCounter() {
    if (intervalId !== null) return;
    intervalId = setInterval(() => {
      count++;
      countDisplay.textContent = count;
      if (count === 60) {
        count = 0;
        countDisplay.textContent = count;
      }
    }, 1000);
    video.play();
  }

  function stopCounter() {
    clearInterval(intervalId);
    intervalId = null;
    video.pause();
  }

  function resetCounter() {
    clearInterval(intervalId);
    intervalId = null;
    count = 0;
    countDisplay.textContent = count;
    video.currentTime = 0;
    video.pause();
  }

  document.getElementById('start').addEventListener('click', startCounter);
  document.getElementById('stop').addEventListener('click', stopCounter);
  document.getElementById('reset').addEventListener('click', resetCounter);
});