import type * as THREE from "three";

import * as kokomi from "kokomi.js";

import resourceList from "./resources";

import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.Stats(this);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    assetManager.emitter.on("ready", () => {
      const colorTexture = assetManager.items.colorTexture as THREE.Texture;

      const screenQuad = new kokomi.ScreenQuad(this, {
        shadertoyMode: true,
        fragmentShader,
        uniforms: {
          iChannel0: {
            value: colorTexture,
          },
        },
      });
      screenQuad.addExisting();
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
