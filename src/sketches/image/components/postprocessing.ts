import { EffectComposer, RenderPass, ShaderPass } from "three-stdlib";

import postprocessingVertexShader from "../shaders/postprocessing/vertex.glsl";
import postprocessingFragmentShader from "../shaders/postprocessing/fragment.glsl";

import * as kokomi from "kokomijs";

class Postprocessing extends kokomi.Component {
  composer: EffectComposer;
  customPass: ShaderPass;
  constructor(base: kokomi.Base) {
    super(base);

    const composer = new EffectComposer(base.renderer);
    this.composer = composer;

    const renderPass = new RenderPass(base.scene, base.camera);
    composer.addPass(renderPass);

    const customPass = new ShaderPass({
      vertexShader: postprocessingVertexShader,
      fragmentShader: postprocessingFragmentShader,
      uniforms: {
        tDiffuse: {
          value: null,
        },
        uTime: {
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
  animate(time: number): void {
    const uniforms = this.customPass.uniforms;
    uniforms.uTime.value = time / 1000;
  }
}

export default Postprocessing;
