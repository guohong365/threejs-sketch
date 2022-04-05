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
