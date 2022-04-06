import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Environment extends kokomi.Component {
  ambiLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  constructor(base: kokomi.Base) {
    super(base);

    const ambiLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambiLight = ambiLight;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, -5);
    this.directionalLight = directionalLight;

    const fog = new THREE.Fog(new THREE.Color("#e6e9f0"), 0, 60);
    this.base.scene.fog = fog;
  }
  addExisting(): void {
    const scene = this.base.scene;
    scene.add(this.ambiLight);
    scene.add(this.directionalLight);
  }
}

export default Environment;
