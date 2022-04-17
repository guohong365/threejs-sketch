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
      layer.addPrimitive(box);
      box.round(0.1).translate(6, 0, 3);

      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      layer.addPrimitive(sphere);
      sphere.round(0.1).translate(4, 0, 3);

      const cylinder = new marcher.CylinderSDF({
        sdfVarName: "d3",
      });
      layer.addPrimitive(cylinder);
      cylinder.round(0.1).translate(2, 0, 3);

      const polygonHex = new marcher.PolygonSDF({
        sdfVarName: "d4",
      });
      layer.addPrimitive(polygonHex);
      polygonHex.round(0.1).translate(0, 0, 3);

      const polygonOct = new marcher.PolygonSDF({
        sdfVarName: "d5",
        edgeCount: 8,
      });
      layer.addPrimitive(polygonOct);
      polygonOct.round(0.1).translate(0, 0, 0);

      const triangle = new marcher.TriangleSDF({
        sdfVarName: "d6",
      });
      layer.addPrimitive(triangle);
      triangle.round(0.1).translate(-2, 0, 3);

      const joint = new marcher.JointSDF({
        sdfVarName: "d7",
      });
      layer.addPrimitive(joint);
      joint.round(0.1).translate(-4, 0, 3);

      const bezier = new marcher.BezierSDF({
        sdfVarName: "d8",
      });
      layer.addPrimitive(bezier);
      bezier.round(0.1).translate(-6, 0, 3);

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
