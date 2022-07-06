import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const mar = new marcher.Marcher({
      antialias: false,
      showIsoline: false,
    });

    const mat = new marcher.SDFMaterial();
    mat.addIsolineMaterial(marcher.DEFAULT_MATERIAL_ID, 1, 1, 0);
    mar.setMaterial(mat);

    const map = new marcher.SDFMapFunction();

    {
      const layer = new marcher.SDFLayer();

      const box = new marcher.BoxSDF({
        sdfVarName: "d1",
      });
      layer.addPrimitive(box);
      box.round(0.1);

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
