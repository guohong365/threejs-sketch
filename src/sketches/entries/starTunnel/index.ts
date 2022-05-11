import * as THREE from "three";

import * as kokomi from "kokomi.js";

import Particles from "./components/particles";

class Sketch extends kokomi.Base {
  create() {
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera = camera;
    this.interactionManager.camera = camera;
    camera.position.z = 1000;

    // new kokomi.OrbitControls(this);

    const particles = new Particles(this, {
      pointColor1: "#2155CD",
      pointColor2: "#FF4949",
    });
    particles.addExisting();

    const persistenceEffect = new kokomi.PersistenceEffect(this, {
      fadeColor: new THREE.Color("#191919"),
    });
    persistenceEffect.addExisting();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
