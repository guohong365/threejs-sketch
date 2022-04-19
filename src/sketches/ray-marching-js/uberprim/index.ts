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

    const params = {
      width: 0.5,
      height: 0.5,
      depth: 0.5,
      thickness: 0.25,
      xCornerRadius: 0,
      yCornerRadius: 0,
      zCornerRadius: 0,
    };

    const uberprim = new marcher.UberprimSDF({
      sdfVarName: "d1",
      ...params,
    });
    layer.addPrimitive(uberprim);
    uberprim.round(0.1);

    map.addLayer(layer);

    mar.setMapFunction(map);

    const rayMarchingQuad = new kokomi.RayMarchingQuad(this, mar);
    rayMarchingQuad.render();

    console.log(mar.fragmentShader);

    const gui = new dat.GUI();
    gui
      .add(params, "width")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Width")
      .onChange((value: number) => {
        uberprim.width = value;
        rayMarchingQuad.render();
      });
    gui
      .add(params, "height")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Height")
      .onChange((value: number) => {
        uberprim.height = value;
        rayMarchingQuad.render();
      });
    gui
      .add(params, "depth")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Depth")
      .onChange((value: number) => {
        uberprim.depth = value;
        rayMarchingQuad.render();
      });
    gui
      .add(params, "thickness")
      .min(0)
      .max(0.25)
      .step(0.01)
      .name("Thickness")
      .onChange((value: number) => {
        uberprim.thickness = value;
        rayMarchingQuad.render();
      });
    gui
      .add(params, "xCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("x Corner Radius")
      .onChange((value: number) => {
        uberprim.xCornerRadius = value;
        rayMarchingQuad.render();
      });
    gui
      .add(params, "yCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("y Corner Radius")
      .onChange((value: number) => {
        uberprim.yCornerRadius = value;
        rayMarchingQuad.render();
      });
    gui
      .add(params, "zCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("z Corner Radius")
      .onChange((value: number) => {
        uberprim.zCornerRadius = value;
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
