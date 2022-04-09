import * as kokomi from "kokomi.js";
import * as THREE from "three";
import Floor from "./components/floor";
import Environment from "./components/environment";
import Box from "./components/box";
import Ball from "./components/ball";
import Shooter from "./components/shooter";
import Breaker from "./components/breaker";
import resourceList from "./resources";

class Sketch extends kokomi.Base {
  create() {
    const assetManager = new kokomi.AssetManager(this, resourceList);
    assetManager.emitter.on("ready", () => {
      const listener = new THREE.AudioListener();
      this.camera.add(listener);

      const glassBreakAudio = new THREE.Audio(listener);
      glassBreakAudio.setBuffer(assetManager.items.glassBreakAudio);

      new kokomi.OrbitControls(this);

      this.camera.position.set(-3, 3, 4);

      const environment = new Environment(this);
      environment.addExisting();

      const floor = new Floor(this);
      floor.addExisting();

      const box = new Box(this);
      box.addExisting();

      const ball = new Ball(this);
      ball.addExisting();

      const shooter = new Shooter(this);
      shooter.addExisting();

      const breaker = new Breaker(this);

      // 定义好所有可粉碎的物体
      const breakables = [box];
      breakables.forEach((item) => {
        breaker.add(item);
      });

      // 当弹珠发射时监听碰撞，如果触发碰撞则粉碎撞到的物体
      shooter.emitter.on("shoot", (ball: Ball) => {
        ball.body.addEventListener("collide", (e: any) => {
          breaker.onCollide(e);
        });
      });

      // 弹珠击中物体时
      breaker.emitter.on("hit", () => {
        if (!glassBreakAudio.isPlaying) {
          glassBreakAudio.play();
        } else {
          glassBreakAudio.stop();
          glassBreakAudio.play();
        }
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
