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

      window.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key === "1") {
          viewer.setPanorama(panorama1);
        } else if (key === "2") {
          viewer.setPanorama(panorama2);
        }
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
