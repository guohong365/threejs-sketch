import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const marcher = new kokomi.Marcher(this);

    const sdfMapFunction = new kokomi.SDFMapFunction();

    const sdfLayer = new kokomi.SDFLayer();

    const boxSDF = new kokomi.BoxSDF({ sdfVarName: "d1" });
    boxSDF.round(0.1);
    sdfLayer.addPrimitive(boxSDF);

    const sphereSDF = new kokomi.SphereSDF({ sdfVarName: "d2" });
    sphereSDF.translate(0, -0.75, 0);
    sdfLayer.addPrimitive(sphereSDF);

    sphereSDF.smoothUnion(boxSDF);

    sdfMapFunction.addLayer(sdfLayer);

    marcher.setMapFunction(sdfMapFunction);
    marcher.render();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
