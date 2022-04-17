import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const mar = new marcher.Marcher({
      antialias: false,
    });

    const map = new marcher.SDFMapFunction();

    // union
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      layer.addPrimitive(box);
      box.round(0.1).translate(3, 0, 2);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      layer.addPrimitive(sphere);
      sphere.translate(3, -0.75, 2);
      const r = sphere.union(box);

      map.addLayer(layer);
    }

    // intersection
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      layer.addPrimitive(box);
      box.round(0.1).translate(0, 0, 2);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      layer.addPrimitive(sphere);
      sphere.translate(0, -0.75, 2);
      const r = sphere.intersect(box);

      map.addLayer(layer);
    }

    // subtraction
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      layer.addPrimitive(box);
      box.round(0.1).translate(-3, 0, 2);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      layer.addPrimitive(sphere);
      sphere.translate(-3, -0.75, 2);
      const r = sphere.subtract(box);

      map.addLayer(layer);
    }

    // smooth union
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      layer.addPrimitive(box);
      box.round(0.1).translate(3, 0, -2);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      layer.addPrimitive(sphere);
      sphere.translate(3, -0.75, -2);
      const r = sphere.smoothUnion(box);

      map.addLayer(layer);
    }

    // smooth intersection
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      layer.addPrimitive(box);
      box.round(0.1).translate(0, 0, -2);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      layer.addPrimitive(sphere);
      sphere.translate(0, -0.75, -2);
      const r = sphere.smoothIntersect(box);

      map.addLayer(layer);
    }

    // smooth subtraction
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      layer.addPrimitive(box);
      box.round(0.1).translate(-3, 0, -2);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      layer.addPrimitive(sphere);
      sphere.translate(-3, -0.75, -2);
      const r = sphere.smoothSubtract(box);

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
