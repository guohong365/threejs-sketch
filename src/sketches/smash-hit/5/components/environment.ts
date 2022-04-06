import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Environment extends kokomi.Component {
  ambiLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  spotLight: THREE.SpotLight;
  constructor(base: kokomi.Base) {
    super(base);

    kokomi.enableRealisticRender(this.base.renderer);

    const ambiLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambiLight = ambiLight;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 5, -5);
    this.directionalLight = directionalLight;

    const spotLight = new THREE.SpotLight(new THREE.Color("#c3cfe2"));
    spotLight.position.set(20, 20, 25);
    this.spotLight = spotLight;
  }
  addExisting(): void {
    const scene = this.base.scene;
    scene.add(this.ambiLight);
    scene.add(this.directionalLight);
    scene.add(this.spotLight);
  }
}

export default Environment;
