import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as STDLIB from "three-stdlib";

import ImageTunnel from "./components/imageTunnel";
import CustomLineGenerator from "./components/customLineGenerator";

import resourceList from "./resources";

class Sketch extends kokomi.Base {
  am!: kokomi.AssetManager;
  bgQuad!: kokomi.RenderQuad;
  async createImageTunnel() {
    const rtScene1 = new THREE.Scene();
    const rtCamera1 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    rtCamera1.position.z = -1000;

    const urls = [...Array(100).keys()].map((item, i) => {
      return `https://picsum.photos/id/${i}/100/100`;
      // return `https://s2.loli.net/2022/09/08/gGY4VloDAeUwWxt.jpg`;
    });

    const at = new ImageTunnel(this, {
      urls,
    });
    at.container = rtScene1;
    at.on("ready", () => {
      document.querySelector(".loader-screen").classList.add("hollow");
    });
    await at.addExisting();

    const rt1 = new kokomi.RenderTexture(this, {
      rtScene: rtScene1,
      rtCamera: rtCamera1,
    });

    const quad1 = new kokomi.RenderQuad(this, rt1.texture);
    quad1.addExisting();
    quad1.mesh.position.z = -0.1;
  }
  createLines() {
    const rtScene2 = new THREE.Scene();
    const rtCamera2 = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    rtCamera2.position.z = 10;
    const lineGenerator = new CustomLineGenerator(
      this,
      {
        frequency: 0.9,
        countLimit: 180,
        lineSpeed: 2,
        baseCamera: rtCamera2,
      },
      {}
    );
    lineGenerator.container = rtScene2;
    lineGenerator.addExisting();
    lineGenerator.start();
    const rt2 = new kokomi.RenderTexture(this, {
      rtScene: rtScene2,
      rtCamera: rtCamera2,
    });
    const quad2 = new kokomi.RenderQuad(this, rt2.texture);
    quad2.addExisting();
    quad2.mesh.position.z = -0.2;
  }
  createBgQuad() {
    // const bgQuad = new kokomi.CustomMesh(this, {
    //   vertexShader: "",
    //   fragmentShader: "",
    //   baseMaterial: new THREE.MeshBasicMaterial(),
    //   geometry: new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
    //   materialParams: {
    //     transparent: true,
    //     color: new THREE.Color("#0e1242"),
    //   },
    // });
    // bgQuad.addExisting();
    // bgQuad.mesh.position.z = -0.3;
    // this.bgQuad = bgQuad;

    const bgQuad = new kokomi.RenderQuad(this, this.am.items["bgVideoTexture"]);
    bgQuad.addExisting();
    bgQuad.mesh.position.z = -0.3;
    this.bgQuad = bgQuad;
  }
  createPostprocessing() {
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
      bloomStrength: 0.8,
      bloomThreshold: 0,
      bloomRadius: 0,
    };
    bloomPass.threshold = bloomParams.bloomThreshold;
    bloomPass.strength = bloomParams.bloomStrength;
    bloomPass.radius = bloomParams.bloomRadius;
    composer.addPass(bloomPass);

    this.bgQuad.material.opacity = 0.2;
  }
  async create() {
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    // new kokomi.OrbitControls(this);

    const am = new kokomi.AssetManager(this, resourceList);
    this.am = am;
    am.on("ready", async () => {
      await this.createImageTunnel();

      // this.createLines();

      this.createBgQuad();

      // this.createPostprocessing();
    });
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
