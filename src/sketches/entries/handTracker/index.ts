import * as kokomi from "kokomi.js";

import Run from "./entry";

class Sketch extends kokomi.Base {
  create() {
    Run();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
