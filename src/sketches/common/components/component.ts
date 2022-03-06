import type Base from "../base/base";

class Component {
  base: Base;
  constructor(base: Base) {
    this.base = base;
    this.base.animate((time: number) => this.animate(time));
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  animate(time: number) {}
}

export default Component;
