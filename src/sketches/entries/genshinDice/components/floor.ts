import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";

class Floor extends kokomi.Component {
  mesh: THREE.Mesh;
  body: CANNON.Body;
  constructor(base: kokomi.Base) {
    super(base);

    const geometry = new THREE.PlaneGeometry(40, 40);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#455f5f"),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = THREE.MathUtils.degToRad(-90);
    this.mesh = mesh;
    mesh.receiveShadow = true;

    const shape = kokomi.convertGeometryToShape(geometry);
    const body = new CANNON.Body({
      mass: 0,
      shape,
    });
    body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      THREE.MathUtils.degToRad(-90)
    );
    this.body = body;
  }
  addExisting(): void {
    const { base, mesh, body } = this;
    const { scene, physics } = base;

    scene.add(mesh);
    physics.add({ mesh, body });
  }
}

export default Floor;
