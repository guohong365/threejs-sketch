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

      const g = new marcher.GroupSDF({
        mapFuncName: "g1",
      });
      mar.addGroup(g);
      layer.addPrimitive(g);
      g.translateZ(4);

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      g.addPrimitive(box);
      box.round(0.1).translateX(6);

      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      g.addPrimitive(sphere);
      sphere.round(0.1).translateX(4);

      const cylinder = new marcher.CylinderSDF({
        sdfVarName: "d3",
      });
      g.addPrimitive(cylinder);
      cylinder.round(0.1).translateX(2);

      const polygonHex = new marcher.PolygonSDF({
        sdfVarName: "d4",
      });
      g.addPrimitive(polygonHex);
      polygonHex.round(0.1).translateX(0);

      const triangle = new marcher.TriangleSDF({
        sdfVarName: "d5",
      });
      g.addPrimitive(triangle);
      triangle.round(0.1).translateX(-2);

      const joint = new marcher.JointSDF({
        sdfVarName: "d6",
      });
      g.addPrimitive(joint);
      joint.round(0.1).translateX(-4);

      const bezier = new marcher.BezierSDF({
        sdfVarName: "d7",
      });
      g.addPrimitive(bezier);
      bezier.round(0.1).translateX(-6);

      map.addLayer(layer);
    }

    mar.setMapFunction(map);

    const rayMarchingQuad = new kokomi.RayMarchingQuad(this, mar);
    rayMarchingQuad.render();

    console.log(mar.fragmentShader);
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
