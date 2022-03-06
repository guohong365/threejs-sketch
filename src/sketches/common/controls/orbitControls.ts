import type Base from "../base/base";
import Component from "../components/component";

import { OrbitControls as OC } from "three-stdlib";

class OrbitControls extends Component {
  controls: OC;
  constructor(base: Base) {
    super(base);

    const controls = new OC(base.camera, base.renderer.domElement);
    this.controls = controls;
    controls.enableDamping = true;
  }
  animate(time: number): void {
    this.controls.update();
  }
}

export default OrbitControls;
