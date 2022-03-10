import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as STDLIB from "three-stdlib";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

class Plane extends kokomi.Component {
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  constructor(base: kokomi.Base, config: any = {}) {
    super(base);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {
          value: 0,
        },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
        },
      },
    });
    this.material = material;

    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
  }
  addExisting(): void {
    this.base.scene.add(this.mesh);
  }
  update(time: number): void {
    const uniforms = this.material.uniforms;
    uniforms.uTime.value = time / 1000;
    uniforms.uMouse.value = this.base.interactionManager.mouse;
  }
}

export default Plane;
