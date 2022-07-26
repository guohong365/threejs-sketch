import type * as kokomi from "kokomi.js";

import gradientReflect from "./assets/gradient_reflect_2.jpg";
import tetraModel from "/models/tetra/tetra.glb";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "gradientReflect",
    type: "texture",
    path: gradientReflect,
  },
  {
    name: "tetraModel",
    type: "gltfModel",
    path: tetraModel,
  },
];

export default resourceList;
