import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

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

    {
      const layer = new marcher.SDFLayer();

      const g = new marcher.GroupSDF({
        mapFuncName: "g1",
      });
      mar.addGroup(g);
      layer.addPrimitive(g);

      const sphere = new marcher.SphereSDF({
        sdfVarName: "d1",
        radius: 1,
      });
      g.addPrimitive(sphere);

      const box = new marcher.BoxSDF({
        sdfVarName: "d2",
        width: 1.5,
        height: 1.5,
        depth: 1.5,
      });
      g.addPrimitive(box);

      const ball = sphere.intersect(box);

      const c1 = new marcher.CylinderSDF({
        sdfVarName: "d3",
        radius: 0.5,
        height: 2,
      });
      g.addPrimitive(c1);

      const c2 = new marcher.CylinderSDF({
        sdfVarName: "d4",
        radius: 0.5,
        height: 2,
      });
      c2.rotateX(90);
      g.addPrimitive(c2);

      const c3 = new marcher.CylinderSDF({
        sdfVarName: "d5",
        radius: 0.5,
        height: 2,
      });
      c3.rotateZ(90);
      g.addPrimitive(c3);

      const result = ball.subtract(c1).subtract(c2).subtract(c3);

      map.addLayer(layer);
    }

    mar.setMapFunction(map);

    mar.enableOrbitControls();

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
