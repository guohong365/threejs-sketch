import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const mar = new marcher.Marcher({
      antialias: false,
    });

    const map = new marcher.SDFMapFunction();

    const layer1 = new marcher.SDFLayer();

    const box1 = new marcher.BoxSDF({
      sdfVarName: "d1",
    });
    box1.round(0.1);
    layer1.addPrimitive(box1);

    map.addLayer(layer1);

    mar.setMapFunction(map);

    const rayMarchingQuad = new kokomi.RayMarchingQuad(this, mar);
    rayMarchingQuad.render();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
