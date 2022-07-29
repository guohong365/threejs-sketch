import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as lamina from "lamina/vanilla";

import CustomLayer from "./layers/customLayer";

class Planet extends kokomi.Component {
  customLayer: CustomLayer;
  cm: kokomi.CustomMesh;
  constructor(base: kokomi.Base) {
    super(base);

    const customLayer = new CustomLayer({
      time: 0,
      lacunarity: 2.3,
    });
    this.customLayer = customLayer;

    const cm = new kokomi.CustomMesh(base, {
      geometry: new THREE.IcosahedronGeometry(2, 11),
    });
    this.cm = cm;
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
  }
  addExisting() {
    this.cm.addExisting();
  }
  update() {
    const t = this.base.clock.elapsedTime;
    (this.customLayer as any).time = t;
  }
}

export default Planet;
