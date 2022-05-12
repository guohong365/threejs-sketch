import * as THREE from "three";

import * as kokomi from "kokomi.js";

import Particles from "./components/particles";

import * as dat from "lil-gui";

const params = {
  count: 10000,
  pointColor1: "#2155CD",
  pointColor2: "#FF4949",
  angularVelocity: 0,
  fadeFactor: 0.2,
};

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

    this.createDebug();
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
      count: params.count,
      pointColor1: params.pointColor1,
      pointColor2: params.pointColor2,
      angularVelocity: params.angularVelocity,
    });
    particles.addExisting();
    this.particles = particles;

    const persistenceEffect = new kokomi.PersistenceEffect(this, {
      fadeColor: new THREE.Color("#191919"),
      fadeFactor: params.fadeFactor,
    });
    persistenceEffect.addExisting();
    this.persistenceEffect = persistenceEffect;
  }
  createDebug() {
    const gui = new dat.GUI();

    gui
      .add(params, "count")
      .min(0)
      .max(50000)
      .step(1)
      .onChange(() => {
        this.createParticles();
      });

    gui.addColor(params, "pointColor1").onChange(() => {
      this.createParticles();
    });

    gui.addColor(params, "pointColor2").onChange(() => {
      this.createParticles();
    });

    gui
      .add(params, "angularVelocity")
      .min(0)
      .max(1)
      .step(0.001)
      .onChange(() => {
        this.createParticles();
      });

    gui
      .add(params, "fadeFactor")
      .min(0)
      .max(1)
      .step(0.001)
      .onChange(() => {
        this.createParticles();
      });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
