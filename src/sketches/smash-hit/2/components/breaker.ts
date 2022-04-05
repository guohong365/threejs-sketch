import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";

class Breaker extends kokomi.Component {
  constructor(base: kokomi.Base) {
    super(base);
  }
  break(body: CANNON.Body) {
    console.log(body);
  }
}

export default Breaker;
