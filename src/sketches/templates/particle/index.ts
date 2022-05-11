import * as THREE from "three";

import * as kokomi from "kokomi.js";

import Particles from "./components/particles";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera = camera;
    this.interactionManager.camera = camera;
    camera.position.z = 1000;

    const particles = new Particles(this);
    particles.create();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
