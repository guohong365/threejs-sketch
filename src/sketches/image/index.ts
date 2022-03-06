import * as THREE from "three";

import { getScreenFov } from "maku.js";

import gsap from "gsap";

import ky from "kyouka";

import Base from "../common/base/base";
import Gallery from "./components/gallary";
import Postprocessing from "./components/postprocessing";

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

    // Create gallery
    const gallary = new Gallery(this);
    await gallary.create();

    // Create postprocessing
    const postprocessing = new Postprocessing(this);
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
