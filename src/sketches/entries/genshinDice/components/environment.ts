import * as THREE from "three";
import * as kokomi from "kokomi.js";

import type createSketch from "@/sketches/entries/genshinDice";

class Environment extends kokomi.Component {
  declare base: ReturnType<typeof createSketch>;
  ambiLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  constructor(base: kokomi.Base) {
    super(base);

    const envMap = kokomi.getEnvmapFromHDRTexture(
      this.base.renderer,
      this.base.assetManager.items["envMap"]
    );

    this.base.scene.environment = envMap;

    const ambiLight = new THREE.AmbientLight(0xffffff, 1);
    this.ambiLight = ambiLight;

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
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
