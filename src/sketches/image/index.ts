import * as kokomi from "kokomi.js";

import Gallery from "./components/gallary";
import Postprocessing from "./components/postprocessing";

class Sketch extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  async create() {
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    const gallary = new Gallery(this);
    await gallary.addExisting();

    const postprocessing = new Postprocessing(this);
    postprocessing.addExisting();
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
