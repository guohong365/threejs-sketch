import * as THREE from "three";

import * as kokomi from "kokomi.js";

import Particles from "./components/particles";

class Sketch extends kokomi.Base {
  particles: Particles | null;
  persistenceEffect: kokomi.PersistenceEffect | null;
  constructor(sel = "#sketch") {
    super(sel);

    this.particles = null;
    this.persistenceEffect = null;
  }
  create() {
    this.createCamera();

    // new kokomi.OrbitControls(this);

    this.createParticles();

    window.addEventListener("resize", () => {
      this.createParticles();
    });
  }
  createCamera() {
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera = camera;
    this.interactionManager.camera = camera;
    camera.position.z = 1000;
  }
  createParticles() {
    if (this.particles) {
      this.particles.dispose();
    }

    if (this.persistenceEffect) {
      this.persistenceEffect.disable();
    }

    const particles = new Particles(this, {
      pointColor1: "#2155CD",
      pointColor2: "#FF4949",
    });
    particles.addExisting();
    this.particles = particles;

    const persistenceEffect = new kokomi.PersistenceEffect(this, {
      fadeColor: new THREE.Color("#191919"),
    });
    persistenceEffect.addExisting();
    this.persistenceEffect = persistenceEffect;
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
