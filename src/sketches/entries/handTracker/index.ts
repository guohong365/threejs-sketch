import * as kokomi from "kokomi.js";

import * as yoha from "@handtracking.io/yoha";
import boxModelJSON from "@handtracking.io/yoha/models/box/model.json?url";
import lanModelJSON from "@handtracking.io/yoha/models/lan/model.json?url";

class Sketch extends kokomi.Base {
  async create() {
    const modelFiles = await yoha.DownloadMultipleYohaTfjsModelBlobs(
      boxModelJSON,
      lanModelJSON,
      (rec, total) => {
        console.log(`Download progress: ${(rec / total) * 100}%`);
      }
    );

    // Setup video feed.
    const streamRes = await yoha.CreateMaxFpsMaxResStream();
    if (streamRes.error) {
      // Non-production ready error handling...
      console.error(streamRes.error);
      return;
    }
    const video = yoha.CreateVideoElementFromStream(streamRes.stream);
    document.body.appendChild(video);
    video.style.position = "fixed";
    video.style.zIndex = "-1";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.objectFit = "fill";
    video.style.transform = "rotateY(180deg)";

    // Note the 'wasmPath' argument. This has to be in sync with how you serve the respective
    // files. See webpack.config.js for an example.
    const wasmConfig = {
      wasmPaths: "./node_modules/@tensorflow/tfjs-backend-wasm/dist/",
    };

    const thresholds = yoha.RecommendedHandPoseProbabilityThresholds;

    // Run engine.
    // We configure small padding to avoid that users move their hand outside webcam view
    // when trying to move the cursor towards the border of the viewport.
    let isHandShown = false;
    let currentGesture = "";

    yoha.StartTfjsWasmEngine(
      { padding: 0.05 },
      wasmConfig,
      video,
      modelFiles,
      (res) => {
        if (res.isHandPresentProb < thresholds.IS_HAND_PRESENT) {
          isHandShown = false;
          return;
        }
        isHandShown = true;

        // Change color depending on gesture.
        if (res.poses.fistProb > thresholds.FIST) {
          currentGesture = "fist";
        } else if (res.poses.pinchProb > thresholds.PINCH) {
          currentGesture = "pinch";
        } else {
          currentGesture = "";
        }
      }
    );

    // scene
    new kokomi.OrbitControls(this);

    const box = new kokomi.Box(this);
    box.addExisting();
    box.mesh.visible = false;

    this.update((time: number) => {
      box.spin(time);

      if (!isHandShown) {
        box.mesh.visible = false;
      } else {
        if (currentGesture === "fist") {
          box.mesh.visible = false;
        } else {
          box.mesh.visible = true;
        }
      }
    });
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
