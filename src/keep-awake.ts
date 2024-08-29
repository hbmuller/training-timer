let wakeLock: WakeLockSentinel | null = null;

export const keepAwake = {
  request: async () => {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
      console.error("WakeLock not granted");
    }
  },
  release: async () => {
    if (wakeLock !== null) {
      wakeLock.release().then(() => {
        wakeLock = null;
      });
    }
  },
};
