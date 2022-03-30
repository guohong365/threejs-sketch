import type * as kokomi from "kokomi.js";

import cubeNx from "./assets/textures/room/nx.jpg";
import cubeNy from "./assets/textures/room/ny.jpg";
import cubeNz from "./assets/textures/room/nz.jpg";
import cubePx from "./assets/textures/room/px.jpg";
import cubePy from "./assets/textures/room/py.jpg";
import cubePz from "./assets/textures/room/pz.jpg";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "cubeImage",
    type: "cubeTexture",
    path: [cubePx, cubeNx, cubePy, cubeNy, cubePz, cubeNz],
  },
];

export default resourceList;
