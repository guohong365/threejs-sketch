import * as THREE from "three";

import * as kokomi from "kokomi.js";

import * as CANNON from "cannon-es";

import resourceList from "./resources";

import Environment from "./components/environment";
import Dice from "./components/dice";
import Floor from "./components/floor";

class Sketch extends kokomi.Base {
  assetManager: kokomi.AssetManager;
  envMap: THREE.Texture | null;
  constructor(sel = "#sketch") {
    super(sel);

    kokomi.enableRealisticRender(this.renderer);

    const aspect = window.innerWidth / window.innerHeight;
    const d = 5;
    const camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      -10,
      100
    );
    this.camera = camera;
    this.interactionManager.camera = camera;

    this.camera.position.set(0, 2, 4.5);

    new kokomi.OrbitControls(this);

    this.camera.lookAt(this.scene.position);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    this.assetManager = assetManager;

    this.envMap = null;

    // new kokomi.Stats(this);
  }
  create() {
    this.assetManager.on("ready", async () => {
      const envMap = kokomi.getEnvmapFromHDRTexture(
        this.renderer,
        this.assetManager.items["envMap"]
      );
      this.envMap = envMap;

      const environment = new Environment(this);
      environment.addExisting();

      const floor = new Floor(this);
      floor.addExisting();

      const dicePositions = [...Array(8)].map((item, i) => {
        return new CANNON.Vec3(-(i % 4) * 3 + 4, 10, i * 2 - 4);
      });
      const dices = dicePositions.map((item) => {
        const dice = new Dice(this, {
          position: item,
        });
        dice.addExisting();
        return dice;
      });

      this.update(() => {
        dices.forEach((dice) => {
          if (dice.isIdle) {
            dice.lightenTopFace();
          }
        });
      });
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
