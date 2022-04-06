import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";
import Box from "./box";
import mitt, { type Emitter } from "mitt";

class Game extends kokomi.Component {
  breakables: any[];
  emitter: Emitter<any>;
  score: number;
  constructor(base: kokomi.Base) {
    super(base);

    this.breakables = [];

    this.emitter = mitt();

    this.score = 0;
  }
  // 创建可破碎物
  createBreakables(x = 0) {
    const box = new Box(this.base);
    box.addExisting();
    const position = new CANNON.Vec3(x, 2, -10);
    box.body.position.copy(position);
    this.breakables.push(box);
    this.emitter.emit("create", box);
  }
  // 移动可破碎物
  moveBreakables(objs: any) {
    objs.forEach((item: any) => {
      item.body.position.z += 0.05;

      // 超过边界则移除
      if (item.body.position.z > 10) {
        this.base.scene.remove(item.mesh);
        this.base.physics.world.removeBody(item.body);
      }
    });
  }
  // 定时创建可破碎物
  createBreakablesByInterval() {
    this.createBreakables();
    setInterval(() => {
      const x = THREE.MathUtils.randFloat(-3, 3);
      this.createBreakables(x);
    }, 3000);
  }
  // 加分
  incScore() {
    this.score += 1;
  }
}

export default Game;
