import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as marcher from "marcher.js";

import commonShader from "./shaders/common.glsl";
import cubeAShader from "./shaders/cubeA.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    // 问题
    // uberprim的孔洞有奇怪的渲染结果
    // https://twitter.com/alphardex007/status/1550302189834616832
    // cube A
    const cubeRt = new THREE.WebGLCubeRenderTarget(window.innerHeight);
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRt);
    const cubeScene = new THREE.Scene();
    const cubeShader = marcher.joinLine([commonShader, cubeAShader]);
    const cubeScreenQuad = new kokomi.CubemapQuad(this, {
      fragmentShader: cubeShader,
    });
    cubeScene.add(cubeScreenQuad.mesh);
    this.update(() => {
      cubeCamera.update(this.renderer, cubeScene);
    });

    // image
    const mainShader = marcher.joinLine([commonShader, fragmentShader]);
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: mainShader,
      uniforms: {
        iChannel0Cube: {
          value: cubeRt.texture,
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
