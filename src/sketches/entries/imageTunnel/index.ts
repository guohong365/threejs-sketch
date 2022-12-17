import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as STDLIB from "three-stdlib";

import ImageTunnel from "./components/imageTunnel";

class Sketch extends kokomi.Base {
  async create() {
    (this.camera as THREE.PerspectiveCamera).fov = 60;
    this.camera.near = 0.1;
    this.camera.far = 10000;
    this.camera.updateProjectionMatrix();
    this.camera.position.z = -1000;

    // new kokomi.OrbitControls(this);

    const urls = [...Array(100).keys()].map((item, i) => {
      return `https://picsum.photos/id/${i}/100/100`;
      // return `https://s2.loli.net/2022/09/08/gGY4VloDAeUwWxt.jpg`;
    });

    const at = new ImageTunnel(this, {
      urls,
      // speed: 1,
    });
    at.on("ready", () => {
      document.querySelector(".loader-screen").classList.add("hollow");
    });
    await at.addExisting();

    // test single mesh
    // at.emit("ready");
    // const mesh = at.addMesh();
    // mesh.position.z = -1025;

    // test add image at rand XY
    // await kokomi.sleep(1000);
    // at.emit("ready");
    // at.run();
    // await at.addImageAtRandXY(
    //   "https://s2.loli.net/2022/09/08/gGY4VloDAeUwWxt.jpg"
    // );

    const composer = new STDLIB.EffectComposer(this.renderer);
    this.composer = composer;

    const renderScene = new STDLIB.RenderPass(this.scene, this.camera);
    composer.addPass(renderScene);

    const bloomPass = new STDLIB.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    const bloomParams = {
      bloomStrength: 1,
      bloomThreshold: 0.5,
      bloomRadius: 0,
    };
    bloomPass.threshold = bloomParams.bloomThreshold;
    bloomPass.strength = bloomParams.bloomStrength;
    bloomPass.radius = bloomParams.bloomRadius;
    composer.addPass(bloomPass);
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
