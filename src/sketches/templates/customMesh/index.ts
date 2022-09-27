import * as kokomi from "kokomi.js";

import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    this.camera.position.set(0, 0, 2);

    new kokomi.OrbitControls(this);

    const cm = new kokomi.CustomMesh(this, {
      baseMaterial: new THREE.ShaderMaterial(),
      geometry: new THREE.PlaneGeometry(1, 1, 16, 16),
      vertexShader,
      fragmentShader,
      materialParams: {
        side: THREE.DoubleSide,
      },
    });
    cm.addExisting();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
