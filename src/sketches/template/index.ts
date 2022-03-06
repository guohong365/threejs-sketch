import * as THREE from "three";

import ky from "kyouka";

import * as kokomi from "../kokomi";

import Box from "./components/box";

class Sketch extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  create() {
    const orbitControls = new kokomi.OrbitControls(this);

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
