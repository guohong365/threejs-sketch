import * as kokomi from "kokomi.js";

import * as THREE from "three";

import * as marcher from "marcher.js";

import commonShader from "./shaders/common.glsl";
import bufferAShader from "./shaders/bufferA.glsl";
import bufferBShader from "./shaders/bufferB.glsl";
import bufferCShader from "./shaders/bufferC.glsl";
import fragmentShader from "./shaders/fragment.glsl";

class Sketch extends kokomi.Base {
  create() {
    const createBufferPass = () => {
      const bufferRt = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight
      );
      const bufferCamera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        100
      );
      bufferCamera.position.z = 1;
      const bufferScene = new THREE.Scene();
      return { bufferRt, bufferScene, bufferCamera };
    };

    const createBufferScreenQuad = (
      bufferShader: string,
      uniforms: any = {}
    ) => {
      const bufferShaderTotal = marcher.joinLine([commonShader, bufferShader]);
      const bufferScreenQuad = new kokomi.ScreenQuad(this, {
        shadertoyMode: true,
        fragmentShader: bufferShaderTotal,
        uniforms,
      });
      return bufferScreenQuad;
    };

    // Buffer A - X Profile
    const {
      bufferRt: bufferARt,
      bufferScene: bufferAScene,
      bufferCamera: bufferACamera,
    } = createBufferPass();
    const bufferAScreenQuad = createBufferScreenQuad(bufferAShader);
    bufferAScene.add(bufferAScreenQuad.mesh);
    // bufferAScreenQuad.addExisting();

    this.update(async () => {
      this.renderer.setRenderTarget(bufferARt);
      this.renderer.render(bufferAScene, bufferACamera);
      this.renderer.setRenderTarget(null);
    });

    // Buffer B - Y Profile
    const {
      bufferRt: bufferBRt,
      bufferScene: bufferBScene,
      bufferCamera: bufferBCamera,
    } = createBufferPass();
    const bufferBScreenQuad = createBufferScreenQuad(bufferBShader);
    bufferBScene.add(bufferBScreenQuad.mesh);
    // bufferBScreenQuad.addExisting();

    this.update(() => {
      this.renderer.setRenderTarget(bufferBRt);
      this.renderer.render(bufferBScene, bufferBCamera);
      this.renderer.setRenderTarget(null);
    });

    // Buffer C - Z Profile
    const {
      bufferRt: bufferCRt,
      bufferScene: bufferCScene,
      bufferCamera: bufferCCamera,
    } = createBufferPass();
    const bufferCScreenQuad = createBufferScreenQuad(bufferCShader);
    bufferCScene.add(bufferCScreenQuad.mesh);
    // bufferCScreenQuad.addExisting();

    this.update(() => {
      this.renderer.setRenderTarget(bufferCRt);
      this.renderer.render(bufferCScene, bufferCCamera);
      this.renderer.setRenderTarget(null);
    });

    // image
    const mainShader = marcher.joinLine([commonShader, fragmentShader]);
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: mainShader,
      // vertexShader,
      uniforms: {
        iChannel0: {
          value: bufferARt.texture,
        },
        iChannel1: {
          value: bufferBRt.texture,
        },
        iChannel2: {
          value: bufferCRt.texture,
        },
        cameraRotation: {
          value: new THREE.Vector4(0, 0, 0, 0),
        },
      },
    });
    screenQuad.addExisting();

    screenQuad.mesh.visible = false;

    const box = new kokomi.Box(this, {
      width: 1,
      height: 1,
      depth: 1,
      material: new THREE.MeshBasicMaterial({ color: "red" }),
    });
    box.addExisting();

    new kokomi.OrbitControls(this);

    this.camera.position.z = 1.5;

    const axesHelper = new THREE.AxesHelper();
    this.scene.add(axesHelper);

    const shadowBox = new THREE.Group();
    shadowBox.add(screenQuad.mesh);
    this.scene.add(shadowBox);

    shadowBox.add(box.mesh);

    const d = 0.5 + 0.0001;

    const xPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: bufferARt.texture,
        side: THREE.DoubleSide,
      })
    );
    shadowBox.add(xPlane);
    xPlane.rotation.y = THREE.MathUtils.degToRad(90);
    xPlane.position.x = -d;

    const yPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: bufferBRt.texture,
        side: THREE.DoubleSide,
      })
    );
    shadowBox.add(yPlane);
    yPlane.rotation.x = THREE.MathUtils.degToRad(-90);
    yPlane.position.y = -d;

    const zPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: bufferCRt.texture,
        side: THREE.DoubleSide,
      })
    );
    shadowBox.add(zPlane);
    zPlane.position.z = -d;

    box.mesh.visible = false;

    screenQuad.mesh.visible = true;

    this.update(() => {
      const quat = this.camera.quaternion.clone();
      screenQuad.material.uniforms.cameraRotation.value = quat;
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
