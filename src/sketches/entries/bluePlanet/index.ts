import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as lamina from "lamina/vanilla";

import CustomLayer from "./layers/customLayer";

class Sketch extends kokomi.Base {
  create() {
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.camera.position.set(0, 0, 5);

    new kokomi.OrbitControls(this);

    const customLayer = new CustomLayer({
      time: 0,
      lacunarity: 2.3,
    });

    const cm = new kokomi.CustomMesh(this, {
      geometry: new THREE.IcosahedronGeometry(2, 11),
    });
    cm.mesh.material = new lamina.LayerMaterial({
      lighting: "lambert",
      layers: [
        customLayer,
        new lamina.Depth({
          colorA: new THREE.Color("blue"),
          colorB: new THREE.Color("aqua"),
          alpha: 0.9,
          mode: "add",
        }),
        new lamina.Fresnel({
          color: new THREE.Color("#FEB3D9"),
          mode: "add",
        }),
      ],
    });
    cm.mesh.rotation.y = THREE.MathUtils.degToRad(180);
    cm.addExisting();

    this.update(() => {
      const t = this.clock.elapsedTime;
      (customLayer as any).time = t;
    });

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
