import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

import ky from "kyouka";

import Base from "../common/base/base";
import Box from "./components/box";

class Sketch extends Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  create() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;

    this.animate(() => {
      controls.update();
    });

    const box = new Box(this);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);

    this.animate((time: number) => {
      box.spin(time);
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
