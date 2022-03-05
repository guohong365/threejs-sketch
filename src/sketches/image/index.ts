import * as THREE from "three";

import Base from "../common/base/base";

import { Maku, MakuGroup, Scroller, getScreenFov } from "maku.js";
import { preloadImages } from "../common/utils/dom";

import gsap from "gsap";

import mainVertexShader from "./shaders/main/vertex.glsl";
import mainFragmentShader from "./shaders/main/fragment.glsl";

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

    // Load all the images
    await preloadImages();

    // Select all the images you want to render in WebGL
    const images = [...document.querySelectorAll("img")];

    // Create a ShaderMaterial
    const imagePlaneMaterial = new THREE.ShaderMaterial({
      vertexShader: mainVertexShader,
      fragmentShader: mainFragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTexture: {
          value: null,
        },
        uTime: {
          value: 0,
        },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
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

    this.animate((time: number) => {
      scroller.syncScroll();
      makuGroup.setPositions(scroller.scroll.current);

      makuGroup.makus.forEach((maku) => {
        const material = maku.mesh.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = time / 1000;
        material.uniforms.uMouse.value = this.interactionManager.mouse;
      });
    });
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
