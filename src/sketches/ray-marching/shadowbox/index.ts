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
    const bufferA = new kokomi.RenderTexture(this);
    const bufferAScreenQuad = createBufferScreenQuad(bufferAShader);
    bufferA.add(bufferAScreenQuad.mesh);

    // Buffer B - Y Profile
    const bufferB = new kokomi.RenderTexture(this);
    const bufferBScreenQuad = createBufferScreenQuad(bufferBShader);
    bufferB.add(bufferBScreenQuad.mesh);

    // Buffer C - Z Profile
    const bufferC = new kokomi.RenderTexture(this);
    const bufferCScreenQuad = createBufferScreenQuad(bufferCShader);
    bufferC.add(bufferCScreenQuad.mesh);

    // image
    const mainShader = marcher.joinLine([commonShader, fragmentShader]);
    const screenQuad = new kokomi.ScreenQuad(this, {
      shadertoyMode: true,
      fragmentShader: mainShader,
      // vertexShader,
      uniforms: {
        iChannel0: {
          value: bufferA.texture,
        },
        iChannel1: {
          value: bufferB.texture,
        },
        iChannel2: {
          value: bufferC.texture,
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
        map: bufferA.texture,
        side: THREE.DoubleSide,
      })
    );
    shadowBox.add(xPlane);
    xPlane.rotation.y = THREE.MathUtils.degToRad(90);
    xPlane.position.x = -d;

    const yPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: bufferB.texture,
        side: THREE.DoubleSide,
      })
    );
    shadowBox.add(yPlane);
    yPlane.rotation.x = THREE.MathUtils.degToRad(-90);
    yPlane.position.y = -d;

    const zPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: bufferC.texture,
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
