import * as kokomi from "kokomi.js";

import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import resourceList from "./resources";

class Sketch extends kokomi.Base {
  create() {
    const assetManager = new kokomi.AssetManager(this, resourceList, {
      useDracoLoader: true,
    });
    assetManager.emitter.on("ready", () => {
      new kokomi.OrbitControls(this);

      const tetraGeo = assetManager.items.tetraModel.scene.children[0]
        .geometry as THREE.BufferGeometry;
      tetraGeo.computeVertexNormals();

      const cm = new kokomi.CustomMesh(this, {
        // geometry: new THREE.SphereGeometry(2, 162, 162),
        geometry: tetraGeo,
        baseMaterial: new THREE.MeshPhysicalMaterial({
          map: assetManager.items.gradientReflect,
          roughness: 0.34,
          metalness: 0.05,
          reflectivity: 0,
          clearcoat: 0,
          side: THREE.DoubleSide,
        }),
        // baseMaterial: new kokomi.GlassMaterial({
        //   side: THREE.DoubleSide,
        // }),
        vertexShader,
        fragmentShader,
      });
      cm.mesh.scale.set(0.25, 0.25, 0.25);
      cm.addExisting();

      const ambiLight = new THREE.AmbientLight(0xffffff, 0.3);
      this.scene.add(ambiLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(1, 2, 3);
      this.scene.add(dirLight);

      this.camera.position.set(0, 0, 2);
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
