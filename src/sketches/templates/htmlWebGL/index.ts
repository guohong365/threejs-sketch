import * as kokomi from "kokomi.js";
import ky from "kyouka";

import imgVertexShader from "./shaders/img/vertex.glsl";
import imgFragmentShader from "./shaders/img/fragment.glsl";
import textVertexShader from "./shaders/text/vertex.glsl";
import textFragmentShader from "./shaders/text/fragment.glsl";
import videoVertexShader from "./shaders/video/vertex.glsl";
import videoFragmentShader from "./shaders/video/fragment.glsl";

import type { HTMLIVCElement } from "maku.js/types/types";

import fontUrl from "@/assets/SourceHanSansCN-Regular.otf";

class Sketch extends kokomi.Base {
  scroller!: InstanceType<typeof kokomi.NormalScroller>;
  async create() {
    // sync
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    // scroll
    const scroller = new kokomi.NormalScroller();
    scroller.listenForScroll();
    this.scroller = scroller;

    // img
    const webglImgs = new kokomi.Gallery(this, {
      vertexShader: imgVertexShader,
      fragmentShader: imgFragmentShader,
      elList: [...document.querySelectorAll(".webgl-img")] as HTMLIVCElement[],
      scroller,
    });
    await webglImgs.addExisting();

    await webglImgs.checkImagesLoaded();

    // text
    await kokomi.preloadSDFFont(fontUrl);

    const webglTexts = new kokomi.MojiGroup(this, {
      vertexShader: textVertexShader,
      fragmentShader: textFragmentShader,
      elList: [...document.querySelectorAll(".webgl-text")] as HTMLElement[],
      scroller,
    });
    await webglTexts.addExisting();
    webglTexts.mojis.forEach((moji) => {
      moji.textMesh.mesh.font = fontUrl;
    });

    // video
    const webglVideos = new kokomi.Gallery(this, {
      vertexShader: videoVertexShader,
      fragmentShader: videoFragmentShader,
      elList: [
        ...document.querySelectorAll(".webgl-video"),
      ] as HTMLIVCElement[],
      scroller,
    });
    await webglVideos.addExisting();

    webglVideos.makuGroup?.makus.forEach(async (maku) => {
      const material = maku.mesh.material as THREE.ShaderMaterial;
      const el = maku.el as HTMLVideoElement;
      const videoTexture = await kokomi.loadVideoTexture(el.src);
      material.uniforms.uTexture.value = videoTexture;
    });
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
