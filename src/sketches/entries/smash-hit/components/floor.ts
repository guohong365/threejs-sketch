import * as THREE from "three";
import * as kokomi from "kokomi.js";

class Floor extends kokomi.Component {
  mesh: THREE.Mesh;
  constructor(base: kokomi.Base) {
    super(base);

    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#777777"),
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = THREE.MathUtils.degToRad(-90);

    this.mesh = mesh;
  }
  addExisting(): void {
    const scene = this.base.scene;
    scene.add(this.mesh);
  }
}

export default Floor;
