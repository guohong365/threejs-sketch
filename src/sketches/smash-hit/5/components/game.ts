import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";
import mitt, { type Emitter } from "mitt";
import Box from "./box";
import Cone from "./cone";
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
    const p = Math.random();
    if (p < 0.3) {
      this.createCone(-2);
      this.createCone(2);
    } else {
      this.createBox(x);
    }
  }
  // 创建方块
  createBox(x = 0) {
    const obj = new Box(this.base);
    obj.addExisting();
    const position = new CANNON.Vec3(x, 2, -10);
    obj.body.position.copy(position);
    this.breakables.push(obj);
    this.emitter.emit("create", obj);
  }
  // 创建圆锥
  createCone(x = 0) {
    const obj = new Cone(this.base);
    obj.addExisting();
    const position = new CANNON.Vec3(x, 2, -10);
    obj.body.position.copy(position);
    this.breakables.push(obj);
    this.emitter.emit("create", obj);
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
