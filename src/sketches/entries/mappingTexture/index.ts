import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as dat from "lil-gui";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import resourceList from "./resources";

class Sketch extends kokomi.Base {
  assetManager: kokomi.AssetManager;
  cm: kokomi.CustomMesh | null;
  constructor(sel = "#sketch") {
    super(sel);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    this.assetManager = assetManager;

    this.cm = null;
  }
  create() {
    this.camera.position.set(0, 0, 3);

    new kokomi.OrbitControls(this);

    this.assetManager.emitter.on("ready", () => {
      const cm = new kokomi.CustomMesh(this, {
        baseMaterial: new THREE.MeshPhysicalMaterial(),
        geometry: new THREE.PlaneGeometry(2, 2, 100, 100),
        vertexShader,
        fragmentShader,
        materialParams: {
          side: THREE.DoubleSide,
          // wireframe: true,
          transparent: true,
          displacementMap: this.assetManager.items["displaceTex"],
          normalMap: this.assetManager.items["normalTex"],
          map: this.assetManager.items["mapTex"],
        },
        uniforms: {
          uTexture: {
            value: this.assetManager.items["mapTex"],
          },
          uTranslate: {
            value: new THREE.Vector2(0, 0),
          },
          uScale: {
            value: new THREE.Vector2(1, 3),
          },
        },
      });
      cm.addExisting();
      this.cm = cm;

      const ambiLight = new THREE.AmbientLight(0xffffff, 0.4);
      this.scene.add(ambiLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(1, 2, 3);
      this.scene.add(dirLight);

      this.container.addEventListener("mousemove", () => {
        const { x, y } = this.interactionManager.mouse;
        cm.mesh.rotation.y = 0.45 * x;
        cm.mesh.rotation.x = -0.3 * y;
      });

      // this.update(() => {
      //   const t = this.clock.elapsedTime;

      //   const translate = Math.sin(t * 0.2) * 0.75;

      //   cm.material.uniforms.uTranslate.value = new THREE.Vector2(
      //     translate,
      //     translate
      //   );
      // });

      // this.createDebug();
    });
  }
  createDebug() {
    const params = {
      translateX: 0,
      translateY: 0,
    };

    const gui = new dat.GUI();
    gui
      .add(params, "translateX")
      .min(-2)
      .max(2)
      .step(0.01)
      .onChange((value: number) => {
        const uniforms = (this.cm?.mesh.material as THREE.ShaderMaterial)
          .uniforms;
        if (uniforms) {
          uniforms.uTranslate.value.x = value;
        }
      });
    gui
      .add(params, "translateY")
      .min(-2)
      .max(2)
      .step(0.01)
      .onChange((value: number) => {
        const uniforms = (this.cm?.mesh.material as THREE.ShaderMaterial)
          .uniforms;
        if (uniforms) {
          uniforms.uTranslate.value.y = value;
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
