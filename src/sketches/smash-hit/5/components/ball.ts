import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";

class Ball extends kokomi.Component {
  mesh: THREE.Mesh;
  body: CANNON.Body;
  constructor(base: kokomi.Base) {
    super(base);

    const geometry = new THREE.SphereGeometry(0.25, 64, 64);
    const material = new THREE.MeshMatcapMaterial({
      matcap: (this.base as any).assetManager.items.matcapTexture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;

    const shape = kokomi.convertGeometryToShape(geometry);
    const body = new CANNON.Body({
      mass: 4,
      shape,
      position: new CANNON.Vec3(0, 1, 2),
    });
    this.body = body;
  }
  addExisting(): void {
    const { base, mesh, body } = this;
    const { scene, physics } = base;

    scene.add(mesh);
    physics.add({ mesh, body });
  }
  update(time: number): void {
    if (
      Math.abs(this.mesh.position.x) > 5 ||
      Math.abs(this.mesh.position.z) > 20
    ) {
      this.base.scene.remove(this.mesh);
      this.base.physics.world.removeBody(this.body);
    }
  }
}

export default Ball;
