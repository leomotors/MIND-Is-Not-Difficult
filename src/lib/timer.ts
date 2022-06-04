export class Timer {
  readonly startTime = new Date().getTime();
  readonly countdownTo: number;
  penalty = 0;

  constructor(sec: number) {
    this.countdownTo = sec * 1000;
  }

  static parse(ms: number) {
    const secs = Math.floor(ms / 1000);
    const mins = Math.floor(secs / 60);
    const remsecs = secs % 60;

    return `${mins}:${remsecs >= 10 ? remsecs : `0${remsecs}`}`;
  }

  toString() {
    const rem =
      this.countdownTo - (new Date().getTime() - this.startTime) - this.penalty;

    if (rem < 0) return "";
    return Timer.parse(rem);
  }
}
