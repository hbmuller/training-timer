import { beep } from "./beep.js";
const mainWrapper = document.querySelector(".main-wrapper");
const inputTime = document.querySelector("#input-seconds");
const inputReps = document.querySelector("#input-times");
const buttonStart = document.querySelector("#button-start");
const buttonStop = document.querySelector("#button-stop");
const fieldTotalTimer = document.querySelector(".total-timer");
const fieldLapTimer = document.querySelector(".lap-timer");
const DEFAULT_DURATION = 15;
const DEFAULT_REPETITIONS = 12;
const UPDATE_INTERVAL = 100;
let repetitions = 0;
let duration = 0;
let startTime = 0;
let endTime = 0;
let nextLapTime = 0;
let stopInterval = null;
const beepStart = () => beep(800);
const beepLap = () => beep(200, 1320);
const beepEnd = () => beep(800, 440);
const startTimer = () => {
    repetitions = parseInt(inputReps.value);
    duration = parseInt(inputTime.value) * 1000;
    startTime = performance.now();
    nextLapTime = startTime + duration;
    endTime = startTime + duration * repetitions;
    mainWrapper.classList.add("running");
    beepStart();
    const intervalId = setInterval(() => updateTimer(), UPDATE_INTERVAL);
    stopInterval = () => clearInterval(intervalId);
};
const leadingZeros = (value, length = 2) => {
    const decimal = value / Math.pow(10, length);
    return decimal >= 1 ? value.toString() : decimal.toFixed(length).substring(2);
};
const formatDuration = (duration) => {
    const minutes = leadingZeros(Math.floor(duration / 60000));
    const seconds = leadingZeros(Math.floor((duration % 60000) / 1000));
    const hundredths = Math.floor((duration % 1000) / 100);
    return `${minutes}:${seconds}.${hundredths}`;
};
const updateTimer = () => {
    const currentTime = performance.now();
    const lapsCount = Math.floor((currentTime - startTime) / duration);
    const totalTimeLeft = endTime - currentTime;
    const totalLapLeft = totalTimeLeft % duration;
    if (totalTimeLeft <= 0)
        return stopTimer();
    if (currentTime >= nextLapTime) {
        beepLap();
        nextLapTime = startTime + (lapsCount + 1) * duration;
    }
    fieldLapTimer.innerHTML = `${formatDuration(totalLapLeft)} (${repetitions - lapsCount}x)`;
    fieldTotalTimer.innerHTML = formatDuration(totalTimeLeft);
};
const stopTimer = (completed = true) => {
    stopInterval?.();
    completed ? beepEnd() : beepLap();
    mainWrapper.classList.remove("running");
};
const cancelTimer = () => stopTimer(false);
const init = () => {
    inputTime.value = DEFAULT_DURATION.toString();
    inputReps.value = DEFAULT_REPETITIONS.toString();
    buttonStart.addEventListener("click", startTimer);
    buttonStop.addEventListener("click", cancelTimer);
};
init();
