import type * as kokomi from "kokomi.js";

import glassBreakAudio from "./assets/audios/glass-break.mp3";
import normalTexture from "./assets/textures/normal.jpg";
import orbitaHdr from "./assets/textures/orbita.hdr?url";

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
  {
    name: "orbitaHdr",
    type: "hdrTexture",
    path: orbitaHdr,
  },
];

export default resourceList;
