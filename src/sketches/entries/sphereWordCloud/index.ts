import * as kokomi from "kokomi.js";
import SphereWordCloud from "./components/sphereWordCloud";

class Sketch extends kokomi.Base {
  create() {
    const controls = new kokomi.OrbitControls(this);
    controls.controls.autoRotate = true;

    const swc = new SphereWordCloud(this, { segment: 5 });
    swc.addExisting();
    swc.addHtmls();
    swc.addLines();
    swc.listenForHoverHtml(
      (el: HTMLElement) => {
        controls.controls.autoRotate = false;
      },
      (el: HTMLElement) => {
        controls.controls.autoRotate = true;
      }
    );
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
