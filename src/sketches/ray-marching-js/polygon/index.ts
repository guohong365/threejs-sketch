import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

import * as dat from "lil-gui";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const mar = new marcher.Marcher({
      antialias: false,
    });

    const mat = new marcher.SDFMaterial();
    mat.addColorMaterial("1.0", 0, 0, 0);
    mar.setMaterial(mat);

    const map = new marcher.SDFMapFunction();

    const layer = new marcher.SDFLayer();

    const polygon = new marcher.PolygonSDF({
      sdfVarName: "d1",
    });
    layer.addPrimitive(polygon);
    polygon.round(0.1);

    map.addLayer(layer);

    mar.setMapFunction(map);

    const rayMarchingQuad = new kokomi.RayMarchingQuad(this, mar);
    rayMarchingQuad.render();

    console.log(mar.fragmentShader);

    const gui = new dat.GUI();

    gui
      .add(polygon, "edgeCount")
      .min(3)
      .max(8)
      .step(1)
      .name("Edge Count")
      .onChange(() => {
        rayMarchingQuad.render();
      });

    gui
      .add(polygon, "angleDivisor")
      .min(2)
      .max(8)
      .step(1)
      .name("Angle Divisor")
      .onChange(() => {
        rayMarchingQuad.render();
      });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
