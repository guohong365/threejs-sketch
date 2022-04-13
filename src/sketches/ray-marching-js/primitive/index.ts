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
    box1.translate(6, 0, 3);
    layer1.addPrimitive(box1);

    const sphere1 = new marcher.SphereSDF({
      sdfVarName: "d2",
    });
    sphere1.round(0.1);
    sphere1.translate(4, 0, 3);
    layer1.addPrimitive(sphere1);

    const cylinder1 = new marcher.CylinderSDF({
      sdfVarName: "d3",
    });
    cylinder1.round(0.1);
    cylinder1.translate(2, 0, 3);
    layer1.addPrimitive(cylinder1);

    const polygonHex1 = new marcher.PolygonSDF({
      sdfVarName: "d4",
    });
    polygonHex1.round(0.1);
    polygonHex1.translate(0, 0, 3);
    layer1.addPrimitive(polygonHex1);

    const polygonOct1 = new marcher.PolygonSDF({
      sdfVarName: "d5",
      edgeCount: 8,
    });
    polygonOct1.round(0.1);
    polygonOct1.translate(0, 0, 0);
    layer1.addPrimitive(polygonOct1);

    const triangle1 = new marcher.TriangleSDF({
      sdfVarName: "d6",
    });
    triangle1.round(0.1);
    triangle1.translate(-2, 0, 3);
    layer1.addPrimitive(triangle1);

    const joint1 = new marcher.JointSDF({
      sdfVarName: "d7",
    });
    joint1.round(0.1);
    joint1.translate(-4, 0, 3);
    layer1.addPrimitive(joint1);

    map.addLayer(layer1);

    console.log(map.shader);

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
