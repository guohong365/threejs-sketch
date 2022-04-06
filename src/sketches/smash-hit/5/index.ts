import * as kokomi from "kokomi.js";
import * as THREE from "three";
import Floor from "./components/floor";
import Environment from "./components/environment";
import Shooter from "./components/shooter";
import Breaker from "./components/breaker";
import resourceList from "./resources";
import type Ball from "./components/ball";
import Game from "./components/game";

class Sketch extends kokomi.Base {
  assetManager: kokomi.AssetManager;
  constructor(sel = "#sketch") {
    super(sel);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    this.assetManager = assetManager;
  }
  create() {
    const camera = this.camera as THREE.PerspectiveCamera;
    camera.fov = 90;
    camera.updateProjectionMatrix();

    kokomi.enableRealisticRender(this.renderer);

    this.assetManager.emitter.on("ready", () => {
      const listener = new THREE.AudioListener();
      this.camera.add(listener);

      const glassBreakAudio = new THREE.Audio(listener);
      glassBreakAudio.setBuffer(this.assetManager.items.glassBreakAudio);

      this.camera.position.set(0, 1, 6);

      const environment = new Environment(this);
      environment.addExisting();

      const floor = new Floor(this);
      floor.addExisting();

      const shooter = new Shooter(this);
      shooter.addExisting();

      const breaker = new Breaker(this);

      const game = new Game(this);

      game.emitter.on("create", (obj: any) => {
        breaker.add(obj);
      });

      game.createBreakablesByInterval();

      // 当弹珠发射时监听碰撞，如果触发碰撞则粉碎撞到的物体
      shooter.emitter.on("shoot", (ball: Ball) => {
        ball.body.addEventListener("collide", (e: any) => {
          breaker.onCollide(e);
        });
      });

      // 弹珠击中物体时
      breaker.emitter.on("hit", () => {
        game.incScore();
        document.querySelector(".score")!.textContent = `${game.score}`;
        glassBreakAudio.play();
      });

      this.update(() => {
        game.moveBreakables(breaker.objs);
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
