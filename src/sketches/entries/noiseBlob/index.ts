import * as kokomi from "kokomi.js";

import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    this.camera.position.set(1, 1, 5);

    new kokomi.OrbitControls(this);

    const cm = new kokomi.CustomMesh(this, {
      geometry: new THREE.IcosahedronGeometry(2, 20),
      vertexShader,
      fragmentShader,
      uniforms: {
        uIntensity: {
          value: 0.3,
        },
      },
    });
    cm.addExisting();

    const ambiLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
