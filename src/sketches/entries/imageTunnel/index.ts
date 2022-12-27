import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as STDLIB from "three-stdlib";

import ImageTunnel from "./components/imageTunnel";
import CustomLineGenerator from "./components/customLineGenerator";

class Sketch extends kokomi.Base {
  async create() {
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    // new kokomi.OrbitControls(this);

    // Scene1
    // document.querySelector(".loader-screen").classList.add("hollow");
    const rtScene1 = new THREE.Scene();
    const rtCamera1 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    rtCamera1.position.z = -1000;

    const pointLight = new THREE.PointLight(0xffffff, 1, 0, 2);
    pointLight.position.set(10, 20, 30);
    rtScene1.add(pointLight);

    const urls = [...Array(100).keys()].map((item, i) => {
      return `https://picsum.photos/id/${i}/100/100`;
      // return `https://s2.loli.net/2022/09/08/gGY4VloDAeUwWxt.jpg`;
    });

    const at = new ImageTunnel(this, {
      urls,
      container: rtScene1,
    });
    at.on("ready", () => {
      document.querySelector(".loader-screen").classList.add("hollow");
    });
    await at.addExisting();

    const rt1 = new kokomi.RenderTexture(this, {
      rtScene: rtScene1,
      rtCamera: rtCamera1,
    });

    const quad1 = new kokomi.CustomMesh(this, {
      vertexShader: "",
      fragmentShader: "",
      baseMaterial: new THREE.MeshBasicMaterial(),
      geometry: new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
      materialParams: {
        map: rt1.texture,
        transparent: true,
      },
    });
    quad1.addExisting();
    quad1.mesh.position.z = -1;

    // Scene2
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
        countLimit: 200,
        container: rtScene2,
        baseCamera: rtCamera2,
      },
      {}
    );
    lineGenerator.addExisting();
    lineGenerator.start();

    const rt2 = new kokomi.RenderTexture(this, {
      rtScene: rtScene2,
      rtCamera: rtCamera2,
    });

    const quad2 = new kokomi.CustomMesh(this, {
      vertexShader: "",
      fragmentShader: "",
      baseMaterial: new THREE.MeshBasicMaterial(),
      geometry: new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
      materialParams: {
        map: rt2.texture,
        transparent: true,
      },
    });
    quad2.addExisting();
    quad2.mesh.position.z = -2;

    // bg
    const bgQuad = new kokomi.CustomMesh(this, {
      vertexShader: "",
      fragmentShader: "",
      baseMaterial: new THREE.MeshBasicMaterial(),
      geometry: new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
      materialParams: {
        transparent: true,
        color: new THREE.Color("#0e1242"),
      },
    });
    bgQuad.addExisting();
    bgQuad.mesh.position.z = -3;

    // post
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

    bgQuad.material.opacity = 0.2;
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
