import * as kokomi from "kokomi.js";

import * as THREE from "three";

// import * as STDLIB from "three-stdlib";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import computeShader from "./shaders/compute.glsl";

class Sketch extends kokomi.Base {
  create() {
    this.camera.position.set(0, 0, 2);

    new kokomi.OrbitControls(this);

    const params = {
      width: 128,
      pointSize: 4,
      amplitude: 0.002,
      frequency: 1,
    };

    // gpu
    const gpu = new GPUComputationRenderer(
      params.width,
      params.width,
      this.renderer
    );
    const dtPosition = gpu.createTexture();

    // fill position texture
    const geo = new THREE.SphereGeometry(1, 128, 128);
    const posBuffer = geo.attributes.position.array;
    const vertCount = posBuffer.length / 3;

    const data = dtPosition.image.data;
    kokomi.iterateBuffer(
      data,
      data.length,
      (arr: number[], axis: any) => {
        const rand = Math.floor(Math.random() * vertCount);
        arr[axis.x] = posBuffer[rand * 3];
        arr[axis.y] = posBuffer[rand * 3 + 1];
        arr[axis.z] = posBuffer[rand * 3 + 2];
        arr[axis.w] = 1;
      },
      4
    );

    // get pos var
    const posVar = gpu.addVariable(
      "texturePosition",
      computeShader,
      dtPosition
    );
    posVar.wrapS = THREE.RepeatWrapping;
    posVar.wrapT = THREE.RepeatWrapping;
    const uj = new kokomi.UniformInjector(this);
    posVar.material.uniforms = {
      ...posVar.material.uniforms,
      ...uj.shadertoyUniforms,
      ...{
        uAmplitude: {
          value: params.amplitude,
        },
        uFrequency: {
          value: params.frequency,
        },
      },
    };
    this.update(() => {
      uj.injectShadertoyUniforms(posVar.material.uniforms);
    });

    // init gpu
    gpu.init();

    // geometry
    const geometry = new THREE.BufferGeometry();
    const width = params.width;
    const positions = new Float32Array(width * width * 3);
    const reference = new Float32Array(width * width * 2);
    for (let i = 0; i < width * width; i++) {
      const x = Math.random();
      const y = Math.random();
      const z = Math.random();
      positions.set([x, y, z], i * 3);
      const xx = (i % width) / width;
      const yy = Math.floor(i / width) / width;
      reference.set([xx, yy], i * 2);
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("reference", new THREE.BufferAttribute(reference, 2));

    // custom points
    const cp = new kokomi.CustomPoints(this, {
      baseMaterial: new THREE.ShaderMaterial(),
      geometry,
      vertexShader,
      fragmentShader,
      materialParams: {
        side: THREE.DoubleSide,
      },
      uniforms: {
        uPositionTexture: {
          value: null,
        },
        uPointSize: {
          value: params.pointSize,
        },
      },
    });
    cp.addExisting();

    // anime
    this.update(() => {
      gpu.compute();

      const posVarRt = gpu.getCurrentRenderTarget(posVar).texture;
      const mat = cp.points.material as THREE.ShaderMaterial;
      mat.uniforms.uPositionTexture.value = posVarRt;
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
