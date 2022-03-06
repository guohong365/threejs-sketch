import * as THREE from "three";

import gsap from "gsap";

import ky from "kyouka";

import Base from "../common/base/base";
import ScreenCamera from "../common/camera/ScreenCamera";

import Gallery from "./components/gallary";
import Postprocessing from "./components/postprocessing";

class Sketch extends Base {
  constructor(sel = "#sketch") {
    super(sel);
  }
  async create() {
    const screenCamera = new ScreenCamera(this);
    screenCamera.addExisting();

    const gallary = new Gallery(this);
    await gallary.addExisting();

    const postprocessing = new Postprocessing(this);
    postprocessing.addExisting();
  }
}

const createSketch = async () => {
  const sketch = new Sketch();
  await sketch.create();
  return sketch;
};

export default createSketch;
