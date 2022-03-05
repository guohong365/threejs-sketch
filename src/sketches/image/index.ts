import * as THREE from "three";

import Base from "../common/base/base";

import { Maku, MakuGroup, Scroller, getScreenFov } from "maku.js";
import { preloadImages } from "../common/utils/dom";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  async create() {
    const cameraPosition = new THREE.Vector3(0, 0, 600);
    const fov = getScreenFov(cameraPosition.z);
    const container = this.container;
    const aspect = container.clientWidth / container.clientHeight;
    this.camera.fov = fov;
    this.camera.aspect = aspect;
    this.camera.near = 100;
    this.camera.far = 2000;
    this.camera.updateProjectionMatrix();
    this.camera.position.copy(cameraPosition);

    await preloadImages();

    // Select all the images you want to render in WebGL
    const images = [...document.querySelectorAll("img")];

    // Create a ShaderMaterial
    const imagePlaneMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTexture: {
          value: null,
        },
      },
    });

    // Make a MakuGroup that contains all the makus!
    const makuGroup = new MakuGroup();
    const makus = images.map(
      (image) => new Maku(image, imagePlaneMaterial, this.scene)
    );
    makuGroup.addMultiple(makus);

    // Sync images positions
    makuGroup.setPositions();

    // Make a scroller
    const scroller = new Scroller();
    scroller.listenForScroll();

    this.animate(() => {
      scroller.syncScroll();
      makuGroup.setPositions(scroller.scroll.current);
    });
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
