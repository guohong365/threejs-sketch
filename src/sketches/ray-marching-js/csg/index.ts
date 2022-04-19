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

      const box = new marcher.BoxSDF({
        sdfVarName: "d2",
        width: 1.5,
        height: 1.5,
        depth: 1.5,
      });
      g.addPrimitive(box);
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d1",
        radius: 1,
      });
      const f = sphere.intersect(box);

      // g.addPrimitive(f);

      const c1 = new marcher.CylinderSDF({
        sdfVarName: "d3",
        radius: 0.5,
        height: 2,
      });
      g.addPrimitive(c1);
      const a = f.subtract(c1);

      // g.addPrimitive(a);

      const c2 = new marcher.CylinderSDF({
        sdfVarName: "d4",
        radius: 0.5,
        height: 2,
      });
      g.addPrimitive(c2);
      c2.rotateX(90);
      const b = a.subtract(c2);

      // g.addPrimitive(b);

      const c3 = new marcher.CylinderSDF({
        sdfVarName: "d5",
        radius: 0.5,
        height: 2,
      });
      g.addPrimitive(c3);
      c3.rotateZ(90);
      const c = b.subtract(c3);

      g.addPrimitive(c);

      map.addLayer(layer);
    }

    mar.setMapFunction(map);

    // 定制相机
    const gsc = `
        vec3 getSceneColor(vec2 fragCoord){
          // pixel coordinates
          vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
          
          // mouse
          vec2 mo=iMouse.xy/iResolution.xy;
          
          // time
          float time=32.+iTime*1.5;
          
          // camera
          // look-at target
          vec3 ta=vec3(0.,0.,0.);
          
          // ray origin
          // vec3 ro=ta+vec3(4.5*cos(7.*mo.x),1.3+2.*mo.y,4.5*sin(7.*mo.x));
          vec3 ro=ta+vec3(4.5,4.5,4.5);
          
          // focal length
          const float fl=2.5;
          
          // ray direction
          vec3 rd=getRayDirection(p,ro,ta,fl);
          
          // render
          vec3 col=render(ro,rd);
          
          // gamma
          col=toGamma(col);
          
          return col;
      }
        `;

    mar.setGetSceneColor(gsc);

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
