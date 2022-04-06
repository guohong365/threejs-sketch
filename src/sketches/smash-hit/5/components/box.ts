import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";

export interface BoxConfig {
  width: number;
  height: number;
  depth: number;
}

class Box extends kokomi.Component {
  mesh: THREE.Mesh;
  body: CANNON.Body;
  constructor(base: kokomi.Base, config: Partial<BoxConfig> = {}) {
    super(base);

    const { width = 2, height = 4, depth = 0.1 } = config;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new kokomi.GlassMaterial({
      color: "#c3cfe2",
      transmission: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;

    const shape = kokomi.convertGeometryToShape(geometry);
    const body = new CANNON.Body({
      mass: 1,
      shape,
    });
    this.body = body;
  }
  addExisting(): void {
    const { base, mesh, body } = this;
    const { scene, physics } = base;

    scene.add(mesh);
    physics.add({ mesh, body });
  }
}

export default Box;
