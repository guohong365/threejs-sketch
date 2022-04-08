import type * as kokomi from "kokomi.js";

import panoramaImage1 from "./assets/textures/field.jpg";
import panoramaImage2 from "./assets/textures/building.jpg";

const dummyConfig: kokomi.PanoramaConfig = [
  {
    id: "0",
    url: panoramaImage1,
    name: "草原",
    infospots: [
      {
        id: "0",
        point: { x: 15.04, y: 1696.49, z: -4698.64 },
      },
      {
        id: "1",
        point: { x: -803.91, y: 25.22, z: -4927.06 },
        jump: "1",
      },
    ],
  },
  {
    id: "1",
    url: panoramaImage2,
    name: "城市",
    infospots: [
      {
        id: "2",
        point: { x: 1450.64, y: -189.35, z: -4772.9 },
        jump: "0",
      },
    ],
  },
];

export default dummyConfig;
