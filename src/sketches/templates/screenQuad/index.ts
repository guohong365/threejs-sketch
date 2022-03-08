import * as kokomi from "kokomijs";

import Plane from "./components/plane";

class Sketch extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  create() {
    const plane = new Plane(this);
    plane.addExisting();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
