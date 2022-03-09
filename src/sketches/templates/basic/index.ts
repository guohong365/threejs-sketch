import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  create() {
    new kokomi.OrbitControls(this);

    const box = new kokomi.Box(this);
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
