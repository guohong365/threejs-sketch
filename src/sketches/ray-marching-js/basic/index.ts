import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const mar = new marcher.Marcher();

    const sdfMapFunction = new marcher.SDFMapFunction();

    const sdfLayer1 = new marcher.SDFLayer();

    const boxSDF = new marcher.BoxSDF({ sdfVarName: "d1" });
    boxSDF.round(0.1);
    sdfLayer1.addPrimitive(boxSDF);

    const sphereSDF = new marcher.SphereSDF({ sdfVarName: "d2" });
    sphereSDF.translate(0, -0.75, 0);
    sdfLayer1.addPrimitive(sphereSDF);

    sphereSDF.smoothUnion(boxSDF);

    sdfMapFunction.addLayer(sdfLayer1);

    mar.setMapFunction(sdfMapFunction);

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
