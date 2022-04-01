import * as kokomi from "kokomi.js";
import SphereWordCloud from "./components/sphereWordCloud";

class Sketch extends kokomi.Base {
  create() {
    const controls = new kokomi.OrbitControls(this);
    controls.controls.autoRotate = true;

    const swc = new SphereWordCloud(this);
    swc.addExisting();
    swc.addHtmls();
    swc.addLines();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
