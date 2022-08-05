import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as marcher from "marcher.js";

import commonShader from "./shaders/common.glsl";
import bufferAShader from "./shaders/bufferA.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const createBufferScreenQuad = (
      bufferShader: string,
      uniforms: any = {}
    ) => {
      const bufferShaderTotal = marcher.joinLine([commonShader, bufferShader]);
      const bufferScreenQuad = new kokomi.ScreenQuad(this, {
        shadertoyMode: true,
        fragmentShader: bufferShaderTotal,
        uniforms,
      });
      return bufferScreenQuad;
    };

    // Buffer A
    const bufferA = new kokomi.RenderTexture(this);
    const bufferAScreenQuad = createBufferScreenQuad(bufferAShader);
    bufferA.add(bufferAScreenQuad.mesh);
    // bufferAScreenQuad.addExisting();

    // image
    const mainShader = marcher.joinLine([commonShader, fragmentShader]);
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: mainShader,
      uniforms: {
        iChannel0: {
          value: bufferA.texture,
        },
      },
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
