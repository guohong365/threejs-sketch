import * as THREE from "three";

import * as kokomi from "kokomi.js";
import resourceList from "./resources";

class Sketch extends kokomi.Base {
  create() {
    const viewer = new kokomi.Viewer(this);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    assetManager.emitter.on("ready", () => {
      const panoramaImage = assetManager.items.panoramaImage;
      const panorama = new kokomi.ImagePanorama(this, panoramaImage);
      panorama.outputPosition();
      viewer.add(panorama);

      const points = [
        {
          position: new THREE.Vector3(15.04, 1696.49, -4698.64),
          element: document.querySelector(".point-1") as HTMLElement,
        },
        {
          position: new THREE.Vector3(-803.91, 25.22, -4927.06),
          element: document.querySelector(".point-2") as HTMLElement,
        },
        {
          position: new THREE.Vector3(1450.64, -189.35, -4772.9),
          element: document.querySelector(".point-3") as HTMLElement,
        },
      ].map((item) => new kokomi.Html(this, item.element, item.position));
      panorama.addGroup(points);
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
