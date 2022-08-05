import * as kokomi from "kokomi.js";

import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import { CanvasCapture } from "canvas-capture";

class Sketch extends kokomi.Base {
  create() {
    const controls = new kokomi.OrbitControls(this);
    controls.controls.autoRotate = true;
    controls.controls.autoRotateSpeed = 25;

    this.camera.position.z = 3;

    const cm = new kokomi.CustomMesh(this, {
      geometry: new kokomi.HyperbolicHelicoidGeometry(64, 64),
      vertexShader,
      fragmentShader,
    });
    cm.material.side = THREE.DoubleSide;
    cm.addExisting();

    const ambiLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);

    const record = () => {
      // Initialize and pass in canvas.
      CanvasCapture.init(
        document.querySelector("canvas")!,
        {
          showRecDot: true,
          ffmpegCorePath: "/ffmpeg/ffmpeg-core.js",
        } // Options are optional, more info below.
      );

      // Bind key presses to begin/end recordings.
      CanvasCapture.bindKeyToVideoRecord("v", {
        format: "mp4", // Options are optional, more info below.
        name: "myVideo",
        quality: 0.6,
      });
      CanvasCapture.bindKeyToGIFRecord("g");

      // These methods immediately save a single snapshot on keydown.
      CanvasCapture.bindKeyToPNGSnapshot("p");
      CanvasCapture.bindKeyToJPEGSnapshot("j", {
        name: "myJpeg", // Options are optional, more info below.
        quality: 0.8,
      });
    };

    record();

    this.update(() => {
      this.renderer.render(this.scene, this.camera);

      CanvasCapture.checkHotkeys();

      // You need to call recordFrame() only if you are recording
      // a video, gif, or frames.
      if (CanvasCapture.isRecording()) {
        CanvasCapture.recordFrame();
      }
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

export default createSketch;
