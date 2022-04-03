import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Environment extends kokomi.Component {
  ambiLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  constructor(base: kokomi.Base) {
    super(base);

    const ambiLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambiLight = ambiLight;

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.copy(new THREE.Vector3(1, 2, 3));
    this.directionalLight = dirLight;
  }
  addExisting(): void {
    const scene = this.base.scene;
    scene.add(this.ambiLight);
    scene.add(this.directionalLight);
  }
}

export default Environment;
