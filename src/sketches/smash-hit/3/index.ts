import * as kokomi from "kokomi.js";
import Floor from "./components/floor";
import Environment from "./components/environment";
import Box from "./components/box";
import Ball from "./components/ball";
import Shooter from "./components/shooter";
import Breaker from "./components/breaker";

class Sketch extends kokomi.Base {
  create() {
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

    // 定义好所有可分割的物体
    const breakables = [box];
    breakables.forEach((item) => {
      breaker.add(item.body);
    });

    // 当弹珠发射时监听碰撞，如果触发碰撞则分割撞到的物体
    shooter.emitter.on("shoot", (ball: Ball) => {
      ball.body.addEventListener("collide", (e: any) => {
        breaker.break(e.body);
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
