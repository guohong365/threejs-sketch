import * as kokomi from "kokomi.js";

import * as THREE from "three";

import Planet from "./components/planet";

class Sketch extends kokomi.Base {
  create() {
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.camera.position.set(0, 0, 5);

    new kokomi.OrbitControls(this);

    const planet = new Planet(this);
    planet.addExisting();

    const ambiLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(0.3, 0.15, 0);
    this.scene.add(dirLight);
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
