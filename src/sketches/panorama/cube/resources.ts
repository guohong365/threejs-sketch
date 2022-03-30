import type * as kokomi from "kokomi.js";

import cubeNx from "./assets/textures/room/nx.jpg?url";
import cubeNy from "./assets/textures/room/ny.jpg?url";
import cubeNz from "./assets/textures/room/nz.jpg?url";
import cubePx from "./assets/textures/room/px.jpg?url";
import cubePy from "./assets/textures/room/py.jpg?url";
import cubePz from "./assets/textures/room/pz.jpg?url";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "cubeImage",
    type: "cubeTexture",
    path: [cubePx, cubeNx, cubePy, cubeNy, cubePz, cubeNz],
  },
];

export default resourceList;
