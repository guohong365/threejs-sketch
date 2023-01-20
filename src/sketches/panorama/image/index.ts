import * as kokomi from "kokomi.js";
import resourceList from "./resources";

class Sketch extends kokomi.Base {
  create() {
    const viewer = new kokomi.Viewer(this);

    const assetManager = new kokomi.AssetManager(this, resourceList);
    assetManager.on("ready", () => {
      const panoramaImage = assetManager.items.panoramaImage;
      const panorama = new kokomi.ImagePanorama(this, panoramaImage);
      viewer.add(panorama);
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
