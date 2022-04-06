import type * as kokomi from "kokomi.js";

import glassBreakAudio from "./assets/audios/glass-break.mp3";
import normalTexture from "./assets/textures/normal.jpg";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "glassBreakAudio",
    type: "audio",
    path: glassBreakAudio,
  },
  {
    name: "normalTexture",
    type: "texture",
    path: normalTexture,
  },
];

export default resourceList;
