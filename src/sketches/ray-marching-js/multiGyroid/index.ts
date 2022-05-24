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

      // 组
      const group = new marcher.GroupSDF({
        mapFuncName: "g1",
        sdfVarName: "d0",
      });
      mar.addGroup(group);
      layer.addPrimitive(group);

      const sphere = new marcher.SphereSDF({
        sdfVarName: "d1",
        radius: 0.8,
      });
      // group.addPrimitive(sphere);

      const gyroidTex = new marcher.GyroidSDF({
        sdfVarName: "d2",
        thickness: 0.03,
      });
      gyroidTex.operationsBefore.push(`d2p*=10.00;`);
      gyroidTex.operationsAfter.push(`d2/=10.00;`);
      group.addPrimitive(gyroidTex);

      const gyroid = sphere.intersect(gyroidTex);

      const gyroidTex2 = new marcher.GyroidSDF({
        sdfVarName: "d3",
        thickness: 0.3,
      });
      gyroidTex2.operationsBefore.push(`d3p*=100.00;`);
      gyroidTex2.operationsAfter.push(`d3/=100.00;`);
      group.addPrimitive(gyroidTex2);

      const gyroid2 = gyroid.intersect(gyroidTex2);

      group.addPrimitive(gyroid2);

      map.addLayer(layer);
    }

    mar.setMapFunction(map);

    mar.enableOrbitControls();

    const gsc = `
    vec3 getSceneColor(vec2 fragCoord){
      vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);
      
      vec3 ro=vec3(0.,4.,8.);
      vec3 ta=vec3(0.,0.,0.);
      const float fl=9.;
      
      vec2 m=iMouse.xy/iResolution.xy;
      ro.yz=rotate(ro.yz,-m.y*PI_1+1.);
      ro.xz=rotate(ro.xz,-m.x*TWO_PI_2666156403);
      
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
