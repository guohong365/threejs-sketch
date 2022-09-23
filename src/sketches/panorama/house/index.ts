import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  generator: kokomi.PanoramaGenerator;
  constructor(sel = "#sketch") {
    super(sel);

    const generator = new kokomi.PanoramaGenerator(this);
    this.generator = generator;
  }
  create() {
    this.generator.generate();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
