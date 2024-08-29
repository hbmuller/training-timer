const audioCtx = new AudioContext();

export const beep = (duration = 200, baseFrequency = 880) => {
  const osc1 = audioCtx.createOscillator();
  osc1.frequency.setValueAtTime(baseFrequency, audioCtx.currentTime); // value in hertz
  osc1.connect(audioCtx.destination);

  const osc2 = audioCtx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(baseFrequency / 4, audioCtx.currentTime); // value in hertz
  osc2.connect(audioCtx.destination);

  osc1.start();
  osc2.start();

  setTimeout(() => {
    osc1.stop();
    osc2.stop();
  }, duration);
};
