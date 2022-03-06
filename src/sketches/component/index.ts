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

    const redBox = new Box(this, {
      color: "#ff0000",
      position: new THREE.Vector3(-1, 0, 0),
    });

    const greenBox = new Box(this, {
      color: "#00ff00",
      position: new THREE.Vector3(0, 0, 0),
      width: 0.4,
      height: 0.4,
      depth: 0.4,
    });

    const blueBox = new Box(this, {
      color: "#0000ff",
      position: new THREE.Vector3(1, 0, 0),
    });

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);

    this.animate(() => {
      controls.update();
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
