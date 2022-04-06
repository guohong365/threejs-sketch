import type * as kokomi from "kokomi.js";

import glassBreakAudio from "./assets/audios/glass-break.mp3";
import matcapTexture from "./assets/textures/matcap-1.png";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "glassBreakAudio",
    type: "audio",
    path: glassBreakAudio,
  },
  {
    name: "matcapTexture",
    type: "texture",
    path: matcapTexture,
  },
];

export default resourceList;
