import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as marcher from "marcher.js";

import commonShader from "./shaders/common.glsl";
import bufferAShader from "./shaders/bufferA.glsl";
import bufferBShader from "./shaders/bufferB.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
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
    const bufferAScreenQuad = createBufferScreenQuad(bufferAShader, {
      iChannel0: {
        value: bufferA.texture,
      },
    });
    bufferA.add(bufferAScreenQuad.mesh);

    // Buffer B
    const bufferB = new kokomi.RenderTexture(this);
    const bufferBScreenQuad = createBufferScreenQuad(bufferBShader, {
      iChannel0: {
        value: bufferA.texture,
      },
      iChannel1: {
        value: bufferB.texture,
      },
    });
    bufferB.add(bufferBScreenQuad.mesh);

    // Image
    const mainShader = marcher.joinLine([commonShader, fragmentShader]);
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: mainShader,
      uniforms: {
        iChannel0: {
          value: bufferB.texture,
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
