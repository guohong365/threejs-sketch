import type * as kokomi from "kokomi.js";

import panoramaImage1 from "./assets/textures/field.jpg?url";
import panoramaImage2 from "./assets/textures/building.jpg?url";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "panoramaImage1",
    type: "texture",
    path: panoramaImage1,
  },
  {
    name: "panoramaImage2",
    type: "texture",
    path: panoramaImage2,
  },
];

export default resourceList;
