import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Environment extends kokomi.Component {
  ambiLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  constructor(base: kokomi.Base) {
    super(base);

    const ambiLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.ambiLight = ambiLight;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    this.directionalLight = directionalLight;
  }
  addExisting(): void {
    const scene = this.base.scene;
    scene.add(this.ambiLight);
    scene.add(this.directionalLight);
  }
}

export default Environment;
