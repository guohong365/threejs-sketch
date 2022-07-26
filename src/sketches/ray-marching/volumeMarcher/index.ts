import * as kokomi from "kokomi.js";

import * as THREE from "three";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VolumeMarcher from "volumemarcher";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    this.camera.position.set(0, 0, -2);

    const size = 64;
    const volume = new THREE.Data3DTexture(
      new Uint8Array((size * 4) ** 3),
      size,
      size,
      size
    );
    volume.minFilter = THREE.LinearFilter;
    volume.magFilter = THREE.LinearFilter;
    volume.unpackAlignment = 1;
    volume.needsUpdate = true;

    const { data, width, height, depth } = volume.image;
    for (let i = 0, z = 0; z < depth; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++, i += 4) {
          const color = new THREE.Color();
          color.setHSL(Math.random(), 0.5, 0.5).convertSRGBToLinear();
          const normal = [color.r * 255, color.g * 255, color.b * 255];

          const distance = 128;

          data.set([...normal, distance], i);
        }
      }
    }

    const volumemarcher = new VolumeMarcher({
      volume,
    });
    this.scene.add(volumemarcher);
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
