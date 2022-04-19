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
      shape: "cube",
    };

    const uberprim = new marcher.UberprimSDF({
      sdfVarName: "d1",
      width: 0.5,
      height: 0.5,
      depth: 0.5,
      thickness: 0.25,
      xCornerRadius: 0,
      yCornerRadius: 0,
      zCornerRadius: 0,
    });
    layer.addPrimitive(uberprim);
    uberprim.round(0.1).rotateX(90);

    map.addLayer(layer);

    mar.setMapFunction(map);

    const rayMarchingQuad = new kokomi.RayMarchingQuad(this, mar);
    rayMarchingQuad.render();

    console.log(mar.fragmentShader);

    const gui = new dat.GUI();

    const shapeDebug = gui
      .add(params, "shape", ["cube", "cylinder", "cone", "joint", "sphere"])
      .onChange((value: string) => {
        if (value === "cube") {
          widthDebug.setValue(0.5);
          heightDebug.setValue(0.5);
          depthDebug.setValue(0.5);
          thicknessDebug.setValue(0.25);
          xCornerRadiusDebug.setValue(0);
          yCornerRadiusDebug.setValue(0);
          zCornerRadiusDebug.setValue(0);
        } else if (value === "cylinder") {
          widthDebug.setValue(0.5);
          heightDebug.setValue(0.5);
          depthDebug.setValue(0.5);
          thicknessDebug.setValue(0.25);
          xCornerRadiusDebug.setValue(0.5);
          yCornerRadiusDebug.setValue(0);
          zCornerRadiusDebug.setValue(0);
        } else if (value === "cone") {
          widthDebug.setValue(0);
          heightDebug.setValue(0);
          depthDebug.setValue(0.5);
          thicknessDebug.setValue(0.5);
          xCornerRadiusDebug.setValue(0);
          yCornerRadiusDebug.setValue(0);
          zCornerRadiusDebug.setValue(0.5);
        } else if (value === "joint") {
          widthDebug.setValue(0.5);
          heightDebug.setValue(0.5);
          depthDebug.setValue(1);
          thicknessDebug.setValue(0.5);
          xCornerRadiusDebug.setValue(0.5);
          yCornerRadiusDebug.setValue(0.5);
          zCornerRadiusDebug.setValue(0);
        } else if (value === "sphere") {
          widthDebug.setValue(0.5);
          heightDebug.setValue(0.5);
          depthDebug.setValue(0.5);
          thicknessDebug.setValue(0.5);
          xCornerRadiusDebug.setValue(0.5);
          yCornerRadiusDebug.setValue(0.5);
          zCornerRadiusDebug.setValue(0);
        }
        rayMarchingQuad.render();
      });

    const customShape = () => {
      rayMarchingQuad.render();
    };

    const widthDebug = gui
      .add(uberprim, "width")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Width")
      .onChange(() => {
        customShape();
      });
    const heightDebug = gui
      .add(uberprim, "height")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Height")
      .onChange(() => {
        customShape();
      });
    const depthDebug = gui
      .add(uberprim, "depth")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Depth")
      .onChange(() => {
        customShape();
      });
    const thicknessDebug = gui
      .add(uberprim, "thickness")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Thickness")
      .onChange(() => {
        customShape();
      });
    const xCornerRadiusDebug = gui
      .add(uberprim, "xCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("x Corner Radius")
      .onChange(() => {
        customShape();
      });
    const yCornerRadiusDebug = gui
      .add(uberprim, "yCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("y Corner Radius")
      .onChange(() => {
        customShape();
      });
    const zCornerRadiusDebug = gui
      .add(uberprim, "zCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("z Corner Radius")
      .onChange(() => {
        customShape();
      });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
