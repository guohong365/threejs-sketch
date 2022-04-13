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
      box.round(0.1);
      box.translate(3, 0, 2);
      layer.addPrimitive(box);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      sphere.translate(3, -0.75, 2);
      layer.addPrimitive(sphere);
      box.hide();
      sphere.union(box);

      map.addLayer(layer);
    }

    // intersection
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      box.round(0.1);
      box.translate(0, 0, 2);
      layer.addPrimitive(box);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      sphere.translate(0, -0.75, 2);
      layer.addPrimitive(sphere);
      box.hide();
      sphere.intersect(box);

      map.addLayer(layer);
    }

    // subtraction
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      box.round(0.1);
      box.translate(-3, 0, 2);
      layer.addPrimitive(box);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      sphere.translate(-3, -0.75, 2);
      layer.addPrimitive(sphere);
      box.hide();
      sphere.subtract(box);

      map.addLayer(layer);
    }

    // smooth union
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      box.round(0.1);
      box.translate(3, 0, -2);
      layer.addPrimitive(box);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      sphere.translate(3, -0.75, -2);
      layer.addPrimitive(sphere);
      box.hide();
      sphere.smoothUnion(box);

      map.addLayer(layer);
    }

    // smooth intersection
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      box.round(0.1);
      box.translate(0, 0, -2);
      layer.addPrimitive(box);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      sphere.translate(0, -0.75, -2);
      layer.addPrimitive(sphere);
      box.hide();
      sphere.smoothIntersect(box);

      map.addLayer(layer);
    }

    // smooth subtraction
    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      box.round(0.1);
      box.translate(-3, 0, -2);
      layer.addPrimitive(box);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d2",
      });
      sphere.translate(-3, -0.75, -2);
      layer.addPrimitive(sphere);
      box.hide();
      sphere.smoothSubtract(box);

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
