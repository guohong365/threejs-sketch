import * as THREE from "three";

import * as kokomi from "kokomi.js";

import resourceList from "./resources";

import Environment from "./components/environment";
import Dice from "./components/dice";

class Sketch extends kokomi.Base {
  assetManager: kokomi.AssetManager;
  constructor(sel = "#sketch") {
    super(sel);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    this.assetManager = assetManager;
  }
  create() {
    kokomi.enableRealisticRender(this.renderer);

    new kokomi.OrbitControls(this);

    this.camera.position.copy(new THREE.Vector3(3, 1, 1.5));

    this.assetManager.on("ready", () => {
      const environment = new Environment(this);
      environment.addExisting();

      const dice = new Dice(this);
      dice.addExisting();
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
