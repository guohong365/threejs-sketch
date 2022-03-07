import * as THREE from "three";

import * as kokomi from "kokomi.js";

class Box extends kokomi.Component {
  mesh: THREE.Mesh;
  constructor(base: kokomi.Base, config: any = {}) {
    super(base);

    const {
      width = 0.2,
      height = 0.2,
      depth = 0.2,
      color = "#ffffff",
      position = new THREE.Vector3(0, 0, 0),
    } = config;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    this.mesh = mesh;
  }
  addExisting(): void {
    this.base.scene.add(this.mesh);
  }
  spin(time: number) {
    const mesh = this.mesh;
    mesh.rotation.y = time / 1000;
  }
}

export default Box;
