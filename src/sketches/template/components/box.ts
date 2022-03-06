import * as THREE from "three";

import type Base from "@/sketches/common/base/base";
import Component from "../../common/components/component";

class Box extends Component {
  mesh: THREE.Mesh;
  constructor(base: Base, config: any = {}) {
    super(base);

    const scene = base.scene;

    const {
      width = 0.2,
      height = 0.2,
      depth = 0.2,
      color = "#ffffff",
      position = new THREE.Vector3(0, 0, 0),
    } = config;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    scene.add(mesh);
    this.mesh = mesh;
  }
  spin(time: number) {
    const mesh = this.mesh;
    mesh.rotation.y = time / 1000;
  }
}

export default Box;
