import type Base from "../base/base";

class Component {
  base: Base;
  constructor(base: Base) {
    this.base = base;
    this.base.animate((time: number) => this.animate(time));
  }
  animate(time: number) {
    return true;
  }
}

export default Component;
