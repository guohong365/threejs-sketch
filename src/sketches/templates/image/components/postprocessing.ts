import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as STDLIB from "three-stdlib";
import ky from "kyouka";

import postprocessingVertexShader from "../shaders/postprocessing/vertex.glsl";
import postprocessingFragmentShader from "../shaders/postprocessing/fragment.glsl";

class Postprocessing extends kokomi.Component {
  composer: STDLIB.EffectComposer;
  customPass: STDLIB.ShaderPass;
  constructor(base: kokomi.Base) {
    super(base);

    const composer = new STDLIB.EffectComposer(base.renderer);
    this.composer = composer;

    const renderPass = new STDLIB.RenderPass(base.scene, base.camera);
    composer.addPass(renderPass);

    const customPass = new STDLIB.ShaderPass({
      vertexShader: postprocessingVertexShader,
      fragmentShader: postprocessingFragmentShader,
      uniforms: {
        tDiffuse: {
          value: null,
        },
        iTime: {
          value: 0,
        },
      },
    });
    this.customPass = customPass;
    customPass.renderToScreen = true;
    composer.addPass(customPass);
  }
  addExisting(): void {
    this.base.composer = this.composer;
  }
  update(time: number): void {
    const uniforms = this.customPass.uniforms;
    uniforms.iTime.value = time / 1000;
  }
}

export default Postprocessing;
