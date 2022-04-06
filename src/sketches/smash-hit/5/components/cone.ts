import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";
import * as STDLIB from "three-stdlib";

class Cone extends kokomi.Component {
  mesh: THREE.Mesh;
  body: CANNON.Body;
  constructor(base: kokomi.Base) {
    super(base);

    const coneHalfExtents = new THREE.Vector3(0.5, 2, 0.5);
    const conePoints = [];
    conePoints.push(
      new THREE.Vector3(
        coneHalfExtents.x,
        -coneHalfExtents.y,
        coneHalfExtents.z
      )
    );
    conePoints.push(
      new THREE.Vector3(
        -coneHalfExtents.x,
        -coneHalfExtents.y,
        coneHalfExtents.z
      )
    );
    conePoints.push(
      new THREE.Vector3(
        coneHalfExtents.x,
        -coneHalfExtents.y,
        -coneHalfExtents.z
      )
    );
    conePoints.push(
      new THREE.Vector3(
        -coneHalfExtents.x,
        -coneHalfExtents.y,
        -coneHalfExtents.z
      )
    );
    conePoints.push(new THREE.Vector3(0, coneHalfExtents.y, 0));

    const geometry = new STDLIB.ConvexGeometry(conePoints);

    const normalMap = (this.base as any).assetManager.items.normalTexture;
    const envMap = new THREE.PMREMGenerator(
      this.base.renderer
    ).fromEquirectangular(
      (this.base as any).assetManager.items.orbitaHdr
    ).texture;
    const material = new kokomi.GlassMaterial({
      color: "#66ccff",
      transmission: 0.5,
      normalMap,
      clearcoatMap: normalMap,
      envMap,
      envMapIntensity: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;

    const shape = new CANNON.Box(
      new CANNON.Vec3(coneHalfExtents.x, coneHalfExtents.y, coneHalfExtents.z)
    );
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

export default Cone;
