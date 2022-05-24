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

    const triangle = new marcher.TriangleSDF({
      sdfVarName: "d1",
      x2: 0,
      xMax: 1.3,
      yMax: 0.9,
      zMax: 0.1,
    });
    layer.addPrimitive(triangle);
    triangle.round(0.1);

    map.addLayer(layer);

    mar.setMapFunction(map);

    const rayMarchingQuad = new kokomi.RayMarchingQuad(this, mar);
    rayMarchingQuad.render();

    console.log(mar.fragmentShader);

    const gui = new dat.GUI();
    gui
      .add(triangle, "x2")
      .min(0)
      .max(1)
      .step(0.01)
      .name("Top Vertex")
      .onChange(() => {
        rayMarchingQuad.render();
      });

    const size = gui.addFolder("Size");

    size
      .add(triangle, "xMax")
      .min(0)
      .max(5)
      .step(0.01)
      .name("x")
      .onChange(() => {
        rayMarchingQuad.render();
      });
    size
      .add(triangle, "yMax")
      .min(0)
      .max(5)
      .step(0.01)
      .name("y")
      .onChange(() => {
        rayMarchingQuad.render();
      });
    size
      .add(triangle, "zMax")
      .min(0)
      .max(2)
      .step(0.01)
      .name("z")
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
