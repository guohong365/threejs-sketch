import type * as kokomi from "kokomi.js";

import panoramaImage1 from "./assets/textures/rh.jpg";
import panoramaImage2 from "./assets/textures/kt.jpg";

const dummyConfig: kokomi.PanoramaConfig = [
  {
    id: "0",
    url: panoramaImage1,
    name: "入户",
    infospots: [
      {
        id: "0",
        point: { x: 2714.98, y: -2688.06, z: -3214.77 },
        name: "客厅",
        jump: "1",
      },
    ],
  },
  {
    id: "1",
    url: panoramaImage2,
    name: "客厅",
    infospots: [
      {
        id: "1",
        point: { x: 2952.34, y: -1265.93, z: 3820.93 },
        name: "入户",
        jump: "0",
      },
    ],
  },
];

export default dummyConfig;
