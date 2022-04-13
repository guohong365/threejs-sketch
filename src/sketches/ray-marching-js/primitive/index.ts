import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const mar = new marcher.Marcher({
      antialias: false,
    });

    const map = new marcher.SDFMapFunction();

    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      box.round(0.1);
      box.translate(6, 0, 3);
      layer.addPrimitive(box);

      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      sphere.round(0.1);
      sphere.translate(4, 0, 3);
      layer.addPrimitive(sphere);

      const cylinder = new marcher.CylinderSDF({
        sdfVarName: "d3",
      });
      cylinder.round(0.1);
      cylinder.translate(2, 0, 3);
      layer.addPrimitive(cylinder);

      const polygonHex = new marcher.PolygonSDF({
        sdfVarName: "d4",
      });
      polygonHex.round(0.1);
      polygonHex.translate(0, 0, 3);
      layer.addPrimitive(polygonHex);

      const polygonOct = new marcher.PolygonSDF({
        sdfVarName: "d5",
        edgeCount: 8,
      });
      polygonOct.round(0.1);
      polygonOct.translate(0, 0, 0);
      layer.addPrimitive(polygonOct);

      const triangle = new marcher.TriangleSDF({
        sdfVarName: "d6",
      });
      triangle.round(0.1);
      triangle.translate(-2, 0, 3);
      layer.addPrimitive(triangle);

      const joint = new marcher.JointSDF({
        sdfVarName: "d7",
      });
      joint.round(0.1);
      joint.translate(-4, 0, 3);
      layer.addPrimitive(joint);

      map.addLayer(layer);
    }

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
