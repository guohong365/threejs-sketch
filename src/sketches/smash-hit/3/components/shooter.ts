import * as THREE from "three";
import * as kokomi from "kokomi.js";
import Ball from "./ball";
import mitt, { type Emitter } from "mitt";

class Shooter extends kokomi.Component {
  emitter: Emitter<any>;
  constructor(base: kokomi.Base) {
    super(base);

    this.emitter = mitt();
  }
  addExisting(): void {
    window.addEventListener("click", () => {
      this.shootBall();
    });
  }
  // 发射弹珠
  shootBall() {
    const ball = new Ball(this.base);
    ball.addExisting();

    // 追踪鼠标位置
    const p = new THREE.Vector3(0, 0, 0);
    p.copy(this.base.interactionManager.raycaster.ray.direction);
    p.add(this.base.interactionManager.raycaster.ray.origin);
    ball.body.position.set(p.x, p.y, p.z);

    // 给予鼠标方向的速度
    const v = new THREE.Vector3(0, 0, 0);
    v.copy(this.base.interactionManager.raycaster.ray.direction);
    v.multiplyScalar(24);
    ball.body.velocity.set(v.x, v.y, v.z);

    this.emit("shoot", ball);
  }
}

export default Shooter;
