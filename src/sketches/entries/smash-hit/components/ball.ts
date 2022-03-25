import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Ball extends kokomi.Component {
  mesh: THREE.Mesh;
  constructor(base: kokomi.Base) {
    super(base);

    const geometry = new THREE.SphereGeometry(0.25, 64, 64);
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

export default Ball;
