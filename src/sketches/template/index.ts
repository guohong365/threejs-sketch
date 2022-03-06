import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

import ky from "kyouka";

import Base from "../common/base/base";

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

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshPhongMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);

    this.animate((time: number) => {
      mesh.rotation.y = time / 1000;
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
