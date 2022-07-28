import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as marcher from "marcher.js";

import commonShader from "./shaders/common.glsl";
import bufferAShader from "./shaders/bufferA.glsl";
import bufferBShader from "./shaders/bufferB.glsl";
import bufferCShader from "./shaders/bufferC.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    const createBufferPass = () => {
      const bufferRt = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight
      );
      const bufferCamera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        100
      );
      bufferCamera.position.z = 1;
      const bufferScene = new THREE.Scene();
      return { bufferRt, bufferScene, bufferCamera };
    };

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

    // Buffer A - X Face
    const {
      bufferRt: bufferARt,
      bufferScene: bufferAScene,
      bufferCamera: bufferACamera,
    } = createBufferPass();
    const bufferAScreenQuad = createBufferScreenQuad(bufferAShader);
    bufferAScene.add(bufferAScreenQuad.mesh);
    // bufferAScreenQuad.addExisting();

    this.update(async () => {
      this.renderer.setRenderTarget(bufferARt);
      this.renderer.render(bufferAScene, bufferACamera);
      this.renderer.setRenderTarget(null);
    });

    // Buffer B - Y Face
    const {
      bufferRt: bufferBRt,
      bufferScene: bufferBScene,
      bufferCamera: bufferBCamera,
    } = createBufferPass();
    const bufferBScreenQuad = createBufferScreenQuad(bufferBShader);
    bufferBScene.add(bufferBScreenQuad.mesh);
    // bufferBScreenQuad.addExisting();

    this.update(() => {
      this.renderer.setRenderTarget(bufferBRt);
      this.renderer.render(bufferBScene, bufferBCamera);
      this.renderer.setRenderTarget(null);
    });

    // Buffer C - Z Face
    const {
      bufferRt: bufferCRt,
      bufferScene: bufferCScene,
      bufferCamera: bufferCCamera,
    } = createBufferPass();
    const bufferCScreenQuad = createBufferScreenQuad(bufferCShader);
    bufferCScene.add(bufferCScreenQuad.mesh);
    // bufferCScreenQuad.addExisting();

    this.update(() => {
      this.renderer.setRenderTarget(bufferCRt);
      this.renderer.render(bufferCScene, bufferCCamera);
      this.renderer.setRenderTarget(null);
    });

    // image
    const mainShader = marcher.joinLine([commonShader, fragmentShader]);
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: mainShader,
      uniforms: {
        iChannel0: {
          value: bufferARt.texture,
        },
        iChannel1: {
          value: bufferBRt.texture,
        },
        iChannel2: {
          value: bufferCRt.texture,
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
