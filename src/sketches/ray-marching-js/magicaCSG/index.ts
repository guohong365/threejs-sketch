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
      round: 0.1,
      onion: 0,
      halfX: false,
      halfY: false,
      halfZ: false,
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
    uberprim.round(params.round).rotateX(90);

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

    const basicFolder = gui.addFolder("Basic");
    basicFolder.hide();

    const widthDebug = basicFolder
      .add(uberprim, "width")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Width")
      .onChange(() => {
        customShape();
      });
    const heightDebug = basicFolder
      .add(uberprim, "height")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Height")
      .onChange(() => {
        customShape();
      });
    const depthDebug = basicFolder
      .add(uberprim, "depth")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Depth")
      .onChange(() => {
        customShape();
      });
    const thicknessDebug = basicFolder
      .add(uberprim, "thickness")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Thickness")
      .onChange(() => {
        customShape();
      });
    const xCornerRadiusDebug = basicFolder
      .add(uberprim, "xCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("x Corner Radius")
      .onChange(() => {
        customShape();
      });
    const yCornerRadiusDebug = basicFolder
      .add(uberprim, "yCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("y Corner Radius")
      .onChange(() => {
        customShape();
      });
    const zCornerRadiusDebug = basicFolder
      .add(uberprim, "zCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("z Corner Radius")
      .onChange(() => {
        customShape();
      });

    const magicaCSGFolder = gui.addFolder("Magica CSG");
    magicaCSGFolder
      .add(params, "halfX")
      .name("HalfX")
      .onChange((value: boolean) => {
        if (value) {
          uberprim.halfX();
        } else {
          uberprim.operationsAfter = uberprim.operationsAfter.filter(
            (e) => !e.includes("opHalfX")
          );
        }
        customShape();
      });
    magicaCSGFolder
      .add(params, "halfY")
      .name("HalfY")
      .onChange((value: boolean) => {
        if (value) {
          uberprim.halfY();
        } else {
          uberprim.operationsAfter = uberprim.operationsAfter.filter(
            (e) => !e.includes("opHalfY")
          );
        }
        customShape();
      });
    magicaCSGFolder
      .add(params, "halfZ")
      .name("HalfZ")
      .onChange((value: boolean) => {
        if (value) {
          uberprim.halfZ();
        } else {
          uberprim.operationsAfter = uberprim.operationsAfter.filter(
            (e) => !e.includes("opHalfZ")
          );
        }
        customShape();
      });
    magicaCSGFolder
      .add(params, "onion")
      .min(0)
      .max(0.1)
      .step(0.0001)
      .name("Shell")
      .onChange((value: number) => {
        uberprim.operationsAfter = uberprim.operationsAfter.filter(
          (e) => !e.includes("opOnion")
        );
        uberprim.onion(value);
        customShape();
      });
    magicaCSGFolder
      .add(uberprim, "thickness")
      .min(0)
      .max(0.25)
      .step(0.01)
      .name("Hole")
      .onChange(() => {
        customShape();
      });
    magicaCSGFolder
      .add(uberprim, "xCornerRadius")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Bevel")
      .onChange(() => {
        customShape();
      });
    magicaCSGFolder
      .add(params, "round")
      .min(0)
      .max(0.5)
      .step(0.01)
      .name("Round")
      .onChange((value: number) => {
        uberprim.operationsAfter = uberprim.operationsAfter.filter(
          (e) => !e.includes("opRound")
        );
        uberprim.round(value);
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
