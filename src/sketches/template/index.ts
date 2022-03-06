import * as THREE from "three";

import ky from "kyouka";

import Base from "../common/base/base";
import OrbitControls from "../common/controls/orbitControls";
import Box from "./components/box";

class Sketch extends Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  create() {
    const orbitControls = new OrbitControls(this);

    const box = new Box(this);
    box.addExisting();

    this.animate((time: number) => {
      box.spin(time);
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
