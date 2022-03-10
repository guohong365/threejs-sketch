import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as STDLIB from "three-stdlib";
import ky from "kyouka";

class Sketch extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  create() {
    new kokomi.OrbitControls(this);
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
