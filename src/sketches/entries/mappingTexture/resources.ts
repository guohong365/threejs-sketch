import type * as kokomi from "kokomi.js";

import displaceTex from "./assets/textures/face.exr?url";
import normalTex from "./assets/textures/face-normal.png";
import mapTex from "./assets/textures/sticker-tex.png";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "displaceTex",
    type: "exrTexture",
    path: displaceTex,
  },
  {
    name: "normalTex",
    type: "texture",
    path: normalTex,
  },
  {
    name: "mapTex",
    type: "texture",
    path: mapTex,
  },
];

export default resourceList;
