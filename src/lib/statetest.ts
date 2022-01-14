class State {
  state: Number;

  constructor() {
    this.state = Math.random();
  }
}

export const state = new State();
