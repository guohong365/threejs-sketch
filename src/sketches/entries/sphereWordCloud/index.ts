import * as kokomi from "kokomi.js";

import SphereWordCloud from "./components/sphereWordCloud";

class Sketch extends kokomi.Base {
  buffer: ArrayLike<number>;
  constructor(sel = "#sketch") {
    super(sel);

    this.buffer = [];
  }
  create() {
    const controls = new kokomi.OrbitControls(this);
    controls.controls.autoRotate = true;

    const swc = new SphereWordCloud(this);
    swc.addExisting();
    swc.addHtmls();
    console.log(swc);
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
