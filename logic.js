const startBtn = document.querySelector('.startBtn');
const restartBtn = document.querySelector('.restartBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const minutesElement = document.querySelector('.minutes .timeNumber');
const secondsElement = document.querySelector('.seconds .timeNumber');
const achieveingMessage = document.querySelector('.message');

// 1. STATE VARIABLES (Our Single Source of Truth)
let timerInterval = null;
let totalSeconds = 25 * 60; // 25 minutes converted to total seconds (1500 seconds)

// initialize the audio
const alarm = new Audio('../images&audios/mixkit-digital-clock-digital-alarm-buzzer-992.wav');

// Events
startBtn.addEventListener('click', handleTimeStart);
pauseBtn.addEventListener('click', handleTimePause);
restartBtn.addEventListener('click', handleTimeRestart);


function updateScreen() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesElement.textContent = String(minutes).padStart(2, '0')
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

function handleTimeStart() {
    if (timerInterval !== null) return;
    startBtn.disabled = true
    timerInterval = setInterval(() => {
        --totalSeconds
        updateScreen()

        // End of the timer
        if (totalSeconds <= 0) {
            clearInterval(timerInterval)
            timerInterval = null
            achievementMessage()
            playAudio()
            // setting the restartBtn animation once ending
            restartBtn.classList.add('animation')
        }
    }, 1000)
}

function handleTimePause() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null; // Reset interval variable
        startBtn.disabled = false;
    }
}

function handleTimeRestart() {
    // Stop the timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Stop the sound if it's playing
    stopAudio()

    // Reset data state
    totalSeconds = 25 * 60;
    updateScreen();

    // Reset UI state
    startBtn.disabled = false;
    achieveingMessage.style.visibility = 'hidden'; // Hide message on restart
    // deleting the animation once restartBtn clicked, to start new sessionn
    restartBtn.classList.remove('animation')

}

function achievementMessage() {
    achieveingMessage.style.visibility = 'visible';
}

function playAudio() {
    alarm.play()
}

function stopAudio() {
    alarm.pause();
    alarm.currentTime = 0;
}

