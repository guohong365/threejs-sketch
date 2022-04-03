import * as THREE from "three";

import * as kokomi from "kokomi.js";

import resourceList from "./resources";

import Environment from "./components/environment";
import Fox from "./components/fox";

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

    this.camera.position.copy(new THREE.Vector3(6, 4, 3));

    const environment = new Environment(this);
    environment.addExisting();

    this.assetManager.emitter.on("ready", () => {
      const fox = new Fox(this, this.assetManager.items.foxModel);
      fox.addExisting();
      fox.playAction("idle");
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
