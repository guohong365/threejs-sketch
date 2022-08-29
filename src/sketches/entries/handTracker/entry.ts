/**
 * This is a very minimal example showcasing various features of the Yoha engine.
 * The example creates a colored box that can be moved using hand movements. Performing
 * a pinch or fist gesture changes the color of the cursor.
 */
import * as yoha from "@handtracking.io/yoha";
import {
  SetCursorColor,
  SetCursorPosition,
  SetCursorVisibility,
  InitializeCursor,
} from "./cursor";
import boxModelJSON from "@handtracking.io/yoha/models/box/model.json?url";
import lanModelJSON from "@handtracking.io/yoha/models/lan/model.json?url";

async function Run() {
  // Download models.
  const modelFiles = await yoha.DownloadMultipleYohaTfjsModelBlobs(
    boxModelJSON,
    lanModelJSON,
    (rec, total) => {
      document.body.innerText =
        "Download progress: " + (rec / total) * 100 + "%";
    }
  );

  InitializeCursor();

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
  yoha.StartTfjsWasmEngine(
    { padding: 0.05 },
    wasmConfig,
    video,
    modelFiles,
    (res) => {
      if (res.isHandPresentProb < thresholds.IS_HAND_PRESENT) {
        SetCursorVisibility(false);
        return;
      }
      SetCursorVisibility(true);

      // Change color depending on gesture.
      if (res.poses.fistProb > thresholds.FIST) {
        SetCursorColor("red");
      } else if (res.poses.pinchProb > thresholds.PINCH) {
        SetCursorColor("green");
      } else {
        SetCursorColor("blue");
      }

      // Change cursor position.
      // We only use one coordinate here...
      SetCursorPosition(...res.coordinates[0]);
    }
  );
}

export default Run;
