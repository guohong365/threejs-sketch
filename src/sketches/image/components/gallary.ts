import * as THREE from "three";

import { Maku, MakuGroup, Scroller } from "maku.js";

import * as kokomi from "../../kokomi";

import mainVertexShader from "../shaders/main/vertex.glsl";
import mainFragmentShader from "../shaders/main/fragment.glsl";

class Gallery extends kokomi.Component {
  makuGroup: MakuGroup | null;
  scroller: Scroller | null;
  constructor(base: kokomi.Base) {
    super(base);

    this.makuGroup = null;
    this.scroller = null;
  }
  async addExisting(): Promise<void> {
    // Load all the images
    await kokomi.preloadImages();

    // Select all the images you want to render in WebGL
    const images = [...document.querySelectorAll("img")];

    // Create a ShaderMaterial
    const imagePlaneMaterial = new THREE.ShaderMaterial({
      vertexShader: mainVertexShader,
      fragmentShader: mainFragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTexture: {
          value: null,
        },
        uTime: {
          value: 0,
        },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
        },
      },
    });

    // Make a MakuGroup that contains all the makus!
    const makuGroup = new MakuGroup();
    this.makuGroup = makuGroup;
    const makus = images.map(
      (image) => new Maku(image, imagePlaneMaterial, this.base.scene)
    );
    makuGroup.addMultiple(makus);

    // Sync images positions
    makuGroup.setPositions();

    // Make a scroller
    const scroller = new Scroller();
    this.scroller = scroller;
    scroller.listenForScroll();
  }
  animate(time: number): void {
    const makuGroup = this.makuGroup;
    const scroller = this.scroller;

    scroller?.syncScroll();
    makuGroup?.setPositions(scroller?.scroll.current);

    makuGroup?.makus.forEach((maku) => {
      const material = maku.mesh.material as THREE.ShaderMaterial;
      const uniforms = material.uniforms;
      uniforms.uTime.value = time / 1000;
      uniforms.uMouse.value = this.base.interactionManager.mouse;
    });
  }
}

export default Gallery;
