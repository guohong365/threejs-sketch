import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Box extends kokomi.Component {
  mesh: THREE.Mesh;
  constructor(base: kokomi.Base) {
    super(base);

    const geometry = new THREE.BoxGeometry(2, 2, 0.5);
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
  }
  addExisting(): void {
    const scene = this.base.scene;
    scene.add(this.mesh);
  }
}

export default Box;
