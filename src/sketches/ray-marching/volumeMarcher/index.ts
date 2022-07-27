import * as kokomi from "kokomi.js";

import * as THREE from "three";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import VolumeMarcher from "volumemarcher";

import * as marcher from "marcher.js";

import commonShader from "./shaders/common.glsl";
import bufferAShader from "./shaders/bufferA.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    this.camera.position.set(0, 0, -2);

    let isVolumeRendered = false;

    const renderVoxel = (volume: THREE.Data3DTexture) => {
      // const volumemarcher = new VolumeMarcher({
      //   volume,
      // });
      // this.scene.add(volumemarcher);
      const mainShader = marcher.joinLine([commonShader, fragmentShader]);
      console.log({ volume });
      const voxelQuad = new kokomi.ScreenQuad(this, {
        shadertoyMode: true,
        fragmentShader: mainShader,
        uniforms: {
          iChannel0Cube: {
            value: volume,
          },
        },
      });
      voxelQuad.addExisting();
      isVolumeRendered = true;
    };

    // buffer A
    const rt = new THREE.WebGL3DRenderTarget(
      window.innerWidth,
      window.innerHeight,
      1
    );
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    );
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const bufferTotalShader = marcher.joinLine([commonShader, bufferAShader]);
    const bufferQuadA = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: bufferTotalShader,
    });
    scene.add(bufferQuadA.mesh);
    this.update(() => {
      this.renderer.setRenderTarget(rt);
      this.renderer.render(scene, camera);
      this.renderer.setRenderTarget(null);

      if (!isVolumeRendered) {
        renderVoxel(rt.texture);
      }
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
