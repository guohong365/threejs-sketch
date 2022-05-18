import * as THREE from "three";

import * as kokomi from "kokomi.js";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

interface ParticlesConfig {
  count: number;
  pointColor1: string;
  pointColor2: string;
  pointSize: number;
  angularVelocity: number;
  velocity: number;
}

class Particles extends kokomi.Component {
  count: number;
  pointColor1: string;
  pointColor2: string;
  pointSize: number;
  angularVelocity: number;
  velocity: number;
  geometry: THREE.BufferGeometry | null;
  material: THREE.ShaderMaterial | null;
  points: THREE.Points | null;
  constructor(base: kokomi.Base, config: Partial<ParticlesConfig> = {}) {
    super(base);

    const {
      count = 10000,
      pointColor1 = "#ff6030",
      pointColor2 = "#1b3984",
      pointSize = 3,
      angularVelocity = 0,
      velocity = 0.01,
    } = config;

    this.count = count;
    this.pointColor1 = pointColor1;
    this.pointColor2 = pointColor2;
    this.pointSize = pointSize;
    this.angularVelocity = angularVelocity;
    this.velocity = velocity;

    this.geometry = null;
    this.material = null;
    this.points = null;

    this.create();
  }
  create() {
    const { base, count } = this;
    const { scene } = base;

    this.dispose();

    const geometry = new THREE.BufferGeometry();
    this.geometry = geometry;

    const positions = kokomi.makeBuffer(
      count,
      () => THREE.MathUtils.randFloat(-0.5, 0.5) * 50
    );
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const seeds = kokomi.makeBuffer(
      count,
      () => THREE.MathUtils.randFloat(0, 1),
      2
    );
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 2));

    const sizes = kokomi.makeBuffer(
      count,
      () => this.pointSize + THREE.MathUtils.randFloat(0, 1),
      1
    );
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        iTime: {
          value: 0,
        },
        iColor1: {
          value: new THREE.Color(this.pointColor1),
        },
        iColor2: {
          value: new THREE.Color(this.pointColor2),
        },
        iVelocity: {
          value: this.velocity,
        },
      },
    });
    this.material = material;

    const points = new THREE.Points(geometry, material);
    this.points = points;

    this.changePos();
  }
  addExisting(): void {
    const { base, points } = this;
    const { scene } = base;

    if (points) {
      scene.add(points);
    }
  }
  update(time: number): void {
    const elapsedTime = time / 1000;

    if (this.material) {
      const uniforms = this.material.uniforms;
      uniforms.iTime.value = elapsedTime;
    }

    if (this.points) {
      this.points.rotation.z += this.angularVelocity * 0.01;
    }
  }
  changePos() {
    const { geometry, count } = this;
    if (geometry) {
      const positionAttrib = geometry.attributes.position;

      kokomi.iterateBuffer(
        positionAttrib.array,
        count,
        (arr: number[], axis: THREE.Vector3) => {
          const theta = THREE.MathUtils.randFloat(0, 360);
          const r = THREE.MathUtils.randFloat(10, 50);
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const z = THREE.MathUtils.randFloat(0, 2000);
          arr[axis.x] = x;
          arr[axis.y] = y;
          arr[axis.z] = z;
        }
      );
    }
  }
  dispose() {
    const { base } = this;
    const { scene } = base;

    if (this.geometry) {
      this.geometry.dispose();
    }

    if (this.material) {
      this.material.dispose();
    }

    if (this.points) {
      scene.remove(this.points);
    }
  }
}

export default Particles;
