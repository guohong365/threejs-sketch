import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as STDLIB from "three-stdlib";
import ky from "kyouka";

import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader,
      uniforms: {},
    });
    screenQuad.addExisting();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
