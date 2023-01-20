import * as THREE from "three";

import * as kokomi from "kokomi.js";

import * as CANNON from "cannon-es";

import * as dat from "lil-gui";

import ky from "kyouka";

import resourceList from "./resources";

import Environment from "./components/environment";
import Dice from "./components/dice";
import Floor from "./components/floor";

class Sketch extends kokomi.Base {
  assetManager: kokomi.AssetManager;
  envMap: THREE.Texture | null;
  dicePositions: CANNON.Vec3[];
  dices: Dice[];
  listener: THREE.AudioListener;
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

    this.dicePositions = [];
    this.dices = [];

    const listener = new THREE.AudioListener();
    this.listener = listener;
    this.camera.add(listener);
  }
  create() {
    this.assetManager.on("ready", async () => {
      const rollSE = new THREE.Audio(this.listener);
      rollSE.setBuffer(this.assetManager.items["diceRollSE"]);

      const lightenSE = new THREE.Audio(this.listener);
      lightenSE.setBuffer(this.assetManager.items["diceLightenSE"]);

      const envMap = kokomi.getEnvmapFromHDRTexture(
        this.renderer,
        this.assetManager.items["envMap"]
      );
      this.envMap = envMap;

      const environment = new Environment(this);
      environment.addExisting();

      const floor = new Floor(this);
      floor.addExisting();

      let dicePositions = [];
      let dices: Dice[] = [];

      let isDiceFloorCollided = false;

      const throwDice = () => {
        isDiceFloorCollided = false;

        if (!ky.isEmpty(dices)) {
          dices.forEach((dice) => {
            dice.destroy();
          });
        }
        dicePositions = [...Array(8)].map((item, i) => {
          return new CANNON.Vec3(-(i % 4) * 3 + 4, 10, i * 2 - 4);
        });
        dices = dicePositions.map((item) => {
          const dice = new Dice(this, {
            position: item,
          });
          dice.addExisting();
          return dice;
        });
        dices.forEach((dice) => {
          dice.body.addEventListener("collide", () => {
            if (!isDiceFloorCollided) {
              isDiceFloorCollided = true;
              rollSE.play();
            }
          });

          const onDiceIdle = () => {
            dice.lightenTopFace();
            lightenSE.play();
            dice.off("idle", onDiceIdle);
          };

          dice.on("idle", onDiceIdle);
        });
      };

      this.update(() => {
        dices.forEach((dice) => {
          dice.checkIdle();
        });
      });

      // debug
      const gui = new dat.GUI();
      const debugParams = {
        throw: () => {
          throwDice();
        },
      };
      gui.add(debugParams, "throw");
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
