import * as marcher from "marcher.js";

import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const mar = new marcher.Marcher({
      antialias: true,
    });

    // 材质
    const BLACK_MAT = "1.0";
    const WHITE_MAT = "2.0";
    const RED_MAT = "3.0";

    const mat = new marcher.SDFMaterial();
    mat.addColorMaterial(BLACK_MAT, 0, 0, 0);
    mat.addColorMaterial(WHITE_MAT, 255, 255, 255);
    mat.addColorMaterial(RED_MAT, 255, 0, 0);
    mar.setMaterial(mat);

    // sdf主函数
    const map = new marcher.SDFMapFunction();

    {
      // 图层
      const layer = new marcher.SDFLayer();

      // 球内
      const sphere = new marcher.SphereSDF({
        sdfVarName: "d1",
        materialId: BLACK_MAT,
      });
      layer.addPrimitive(sphere);

      // 按钮
      const button = new marcher.CylinderSDF({
        sdfVarName: "d2",
        materialId: WHITE_MAT,
        radius: 0.1,
        height: 0.54,
      });
      button.rotate(90, "x");
      layer.addPrimitive(button);

      // 球壳（上）
      const shellUpper = new marcher.SphereSDF({
        sdfVarName: "d3",
        materialId: "3",
        radius: 0.55,
      });

      const clipBoxUpper = new marcher.BoxSDF({
        sdfVarName: "d4",
        width: 0.55,
        height: 0.55,
        depth: 0.55,
      });
      clipBoxUpper.hide();
      clipBoxUpper.translate(0, -0.6, 0);

      layer.addPrimitive(clipBoxUpper);
      layer.addPrimitive(shellUpper);

      shellUpper.intersect(clipBoxUpper);

      // 球壳（下）
      const shellLower = new marcher.SphereSDF({
        sdfVarName: "d6",
        materialId: WHITE_MAT,
        radius: 0.55,
      });

      const clipBoxLower = new marcher.BoxSDF({
        sdfVarName: "d5",
        width: 0.55,
        height: 0.55,
        depth: 0.55,
      });
      clipBoxLower.hide();
      clipBoxLower.translate(0, 0.6, 0);

      layer.addPrimitive(clipBoxLower);
      layer.addPrimitive(shellLower);

      shellLower.intersect(clipBoxLower);

      // 球壳（上）：挖除中间镂空部分后
      const clipCylinderCenter1 = new marcher.CylinderSDF({
        sdfVarName: "d7",
        radius: 0.15,
        height: 0.6,
        materialId: RED_MAT,
      });
      clipCylinderCenter1.rotate(90, "x");

      layer.addPrimitive(clipCylinderCenter1);

      clipCylinderCenter1.subtract(shellUpper);

      shellUpper.hide();

      // 球壳下：挖除中间镂空部分后
      const clipCylinderCenter2 = new marcher.CylinderSDF({
        sdfVarName: "d8",
        radius: 0.15,
        height: 0.6,
        materialId: WHITE_MAT,
      });
      clipCylinderCenter2.rotate(90, "x");

      layer.addPrimitive(clipCylinderCenter2);

      clipCylinderCenter2.subtract(shellLower);

      shellLower.hide();

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
      vec3 ro=ta+vec3(4.5*cos(.1*time+7.*mo.x),1.3+2.*mo.y,4.5*sin(.1*time+7.*mo.x));
      
      // focal length
      const float fl=4.5;
      
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

    // 定制光照
    const lin = `
    vec3 lighting(in vec3 col,in vec3 pos,in vec3 rd,in vec3 nor){
      vec3 lin=vec3(0.);
      
      // reflection
      vec3 ref=reflect(rd,nor);
      
      // ao
      float occ=1.;
      
      // sun
      {
          // pos
          vec3 lig=normalize(vec3(-.5,.4,-.6));
          // dir
          vec3 hal=normalize(lig-rd);
          // diffuse
          float dif=diffuse(nor,lig);
          // softshadow
          dif*=softshadow(pos,lig,.02,2.5);
          // specular
          float spe=specular(nor,hal,16.);
          spe*=dif;
          // fresnel
          spe*=fresnel(.04,.96,5.,-lig,hal);
          // apply
          lin+=col*2.20*dif*vec3(1.30,1.,.70);
          lin+=5.*spe;
      }
      // sky
      {
          // diffuse
          float dif=sqrt(saturate_0(.5+.5*nor.y));
          // ao
          dif*=occ;
          // specular
          float spe=smoothstep(-.2,.2,ref.y);
          spe*=dif;
          // fresnel
          spe*=fresnel(.04,.96,5.,rd,nor);
          // softshadow
          spe*=softshadow(pos,ref,.02,2.5);
          // apply
          lin+=col*.60*dif;
          lin+=2.*spe;
      }
      // back
      {
          // diff
          float dif=diffuse(nor,normalize(vec3(.5,0.,.6)))*saturate_0(1.-pos.y);
          // ao
          dif*=occ;
          // apply
          lin+=col*.55*dif;
      }
      // sss
      {
          // fresnel
          float dif=fresnel(0.,1.,2.,rd,nor);
          // ao
          dif*=occ;
          // apply
          lin+=col*.25*dif;
      }
      
      return lin;
  }
    `;

    mar.setLighting(lin);

    // 渲染
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
