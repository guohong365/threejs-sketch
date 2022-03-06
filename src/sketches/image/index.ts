import * as THREE from "three";

import { getScreenFov } from "maku.js";

import { EffectComposer, RenderPass, ShaderPass } from "three-stdlib";

import gsap from "gsap";

import ky from "kyouka";

import postprocessingVertexShader from "./shaders/postprocessing/vertex.glsl";
import postprocessingFragmentShader from "./shaders/postprocessing/fragment.glsl";

import Base from "../common/base/base";
import Gallery from "./components/gallary";

class Sketch extends Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  async create() {
    // Create camera
    const cameraPosition = new THREE.Vector3(0, 0, 600);
    const fov = getScreenFov(cameraPosition.z);
    const container = this.container;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 100, 2000);
    camera.position.copy(cameraPosition);
    this.camera = camera;
    this.interactionManager.camera = camera;

    // create gallery
    const gallary = new Gallery(this);
    await gallary.create();

    // postprocessing
    const composer = new EffectComposer(this.renderer);
    this.composer = composer;

    const renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(renderPass);

    const customPass = new ShaderPass({
      vertexShader: postprocessingVertexShader,
      fragmentShader: postprocessingFragmentShader,
      uniforms: {
        tDiffuse: {
          value: null,
        },
        uTime: {
          value: 0,
        },
      },
    });
    customPass.renderToScreen = true;
    composer.addPass(customPass);

    this.animate((time: number) => {
      const uniforms = customPass.uniforms;
      uniforms.uTime.value = time / 1000;
    });
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
