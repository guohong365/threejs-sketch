import { EffectComposer, RenderPass, ShaderPass } from "three-stdlib";

import postprocessingVertexShader from "../shaders/postprocessing/vertex.glsl";
import postprocessingFragmentShader from "../shaders/postprocessing/fragment.glsl";

import type Base from "../../common/base/base";
import Component from "../../common/components/component";

class Postprocessing extends Component {
  customPass: ShaderPass;
  constructor(base: Base) {
    super(base);

    const composer = new EffectComposer(base.renderer);
    base.composer = composer;

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
  animate(time: number) {
    const uniforms = this.customPass.uniforms;
    uniforms.uTime.value = time / 1000;
  }
}

export default Postprocessing;
