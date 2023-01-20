import * as THREE from "three";
import * as kokomi from "kokomi.js";
import resourceList from "./resources";

class Sketch extends kokomi.Base {
  create() {
    const viewer = new kokomi.Viewer(this);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    assetManager.on("ready", () => {
      const panoramaImage1 = assetManager.items.panoramaImage1;
      const panorama1 = new kokomi.ImagePanorama(this, panoramaImage1);
      viewer.add(panorama1);

      const panoramaImage2 = assetManager.items.panoramaImage2;
      const panorama2 = new kokomi.ImagePanorama(this, panoramaImage2);
      viewer.add(panorama2);

      viewer.setPanorama(panorama1, 0);

      const points1 = [
        {
          position: new THREE.Vector3(15.04, 1696.49, -4698.64),
          element: document.querySelector(".point-1") as HTMLElement,
        },
        {
          position: new THREE.Vector3(-803.91, 25.22, -4927.06),
          element: document.querySelector(".point-2") as HTMLElement,
        },
      ].map((item) => {
        const html = new kokomi.Html(this, item.element, item.position);
        html.addExisting();
        return html;
      });
      panorama1.addGroup(points1);

      const points2 = [
        {
          position: new THREE.Vector3(1450.64, -189.35, -4772.9),
          element: document.querySelector(".point-3") as HTMLElement,
        },
      ].map((item) => {
        const html = new kokomi.Html(this, item.element, item.position);
        html.addExisting();
        return html;
      });
      panorama2.addGroup(points2);

      points1[1].el.addEventListener("click", () => {
        viewer.setPanorama(panorama2);
      });

      points2[0].el.addEventListener("click", () => {
        viewer.setPanorama(panorama1);
      });
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
