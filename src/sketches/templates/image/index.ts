import * as kokomi from "kokomi.js";

import mainVertexShader from "./shaders/main/vertex.glsl";
import mainFragmentShader from "./shaders/main/fragment.glsl";
import postprocessingVertexShader from "./shaders/postprocessing/vertex.glsl";
import postprocessingFragmentShader from "./shaders/postprocessing/fragment.glsl";

class Sketch extends kokomi.Base {
  async create() {
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    const gallary = new kokomi.Gallery(this, {
      vertexShader: mainVertexShader,
      fragmentShader: mainFragmentShader,
    });
    await gallary.addExisting();

    const customEffect = new kokomi.CustomEffect(this, {
      vertexShader: postprocessingVertexShader,
      fragmentShader: postprocessingFragmentShader,
    });
    customEffect.addExisting();
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
