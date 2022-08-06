import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as marcher from "marcher.js";

import commonShader from "./shaders/common.glsl";
import bufferAShader from "./shaders/bufferA.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    // Shadertoy
    // No Texture: https://www.shadertoy.com/view/NtcyD4
    // Texture: https://www.shadertoy.com/view/flcyD4

    // Parameters to tweak
    const useBufferTexture = true;
    const SDFGridI = 10;
    const SDFGridJ = 10;

    // Main Logic
    new kokomi.Stats(this);

    new kokomi.OrbitControls(this);

    const bufferTextureDefine = `#define USE_BUFFER_TEXTURE ${Number(
      useBufferTexture
    )}`;

    const commonShaderTotal = marcher.joinLine([
      bufferTextureDefine,
      commonShader,
    ]);

    const getMapFunctionShader = () => {
      // marcher
      const mar = new marcher.Marcher({
        antialias: false,
        showIsoline: false,
      });

      // material
      const mat = new marcher.SDFMaterial();
      mat.addIsolineMaterial(marcher.DEFAULT_MATERIAL_ID, 1, 1, 0);
      mar.setMaterial(mat);

      // define sdf map function
      const map = new marcher.SDFMapFunction();

      // layer start
      const layer = new marcher.SDFLayer();

      for (let i = 0; i < SDFGridI; i++) {
        for (let j = 0; j < SDFGridJ; j++) {
          const box = new marcher.BoxSDF({
            sdfVarName: `d1${i}${j}`,
          });
          layer.addPrimitive(box);
          box.round(0.2).translateX(i).translateZ(j);
        }
      }

      map.addLayer(layer);
      // layer end

      // set sdf map function
      mar.setMapFunction(map);

      // orbit controls
      mar.enableOrbitControls();

      // map function shader
      const mfs = mar.mapFunction?.shader;
      return mfs || "";
    };

    const createBufferScreenQuad = (
      bufferShader: string,
      uniforms: any = {}
    ) => {
      const bufferShaderTotal = marcher.joinLine([
        commonShaderTotal,
        bufferShader,
      ]);
      const bufferScreenQuad = new kokomi.ScreenQuad(this, {
        shadertoyMode: true,
        fragmentShader: bufferShaderTotal,
        uniforms,
      });
      return bufferScreenQuad;
    };

    // SDF Model Function Shader
    const modelShader = getMapFunctionShader();

    // Common Shader
    console.log("Common Shader");
    console.log(commonShaderTotal);

    // Buffer A
    const bufferA = new kokomi.RenderTexture(this);
    const bufferAShaderTotal = marcher.joinLine([
      useBufferTexture ? modelShader : "",
      bufferAShader,
    ]);
    const bufferAScreenQuad = createBufferScreenQuad(bufferAShaderTotal);
    bufferA.add(bufferAScreenQuad.mesh);
    // bufferAScreenQuad.addExisting();

    console.log("Buffer A Shader");
    console.log(bufferAShaderTotal);

    // image
    const imageShaderTotal = marcher.joinLine([
      useBufferTexture ? "" : modelShader,
      fragmentShader,
    ]);
    const mainShader = marcher.joinLine([commonShaderTotal, imageShaderTotal]);
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: mainShader,
      uniforms: {
        iChannel0: {
          value: bufferA.texture,
        },
      },
    });
    screenQuad.addExisting();

    console.log("Image Shader");
    console.log(imageShaderTotal);
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
