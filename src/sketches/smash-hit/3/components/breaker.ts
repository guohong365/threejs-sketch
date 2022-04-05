import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";

class Breaker extends kokomi.Component {
  constructor(base: kokomi.Base) {
    super(base);
  }
  // 添加可分割物体
  add(body: CANNON.Body) {
    console.log(body);
  }
  // 分割物体
  break(body: CANNON.Body) {
    console.log(body);
  }
}

export default Breaker;
