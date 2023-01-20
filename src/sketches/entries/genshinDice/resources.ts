import type * as kokomi from "kokomi.js";

import diceModel from "/models/Dice/dice.glb";
import envMap from "/hdrs/potsdamer_platz_1k.hdr";
import anemoTex from "./components/dice/assets/anemo.png";
import geoTex from "./components/dice/assets/geo.png";
import electroTex from "./components/dice/assets/electro.png";
import dendroTex from "./components/dice/assets/dendro.png";
import hydroTex from "./components/dice/assets/hydro.png";
import pyroTex from "./components/dice/assets/pyro.png";
import cryoTex from "./components/dice/assets/cryo.png";
import primogemTex from "./components/dice/assets/primogem.png";
import diceRollSE from "./components/dice/assets/dice-roll.mp3";
import diceLightenSE from "./components/dice/assets/dice-lighten.mp3";

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "diceModel",
    type: "gltfModel",
    path: diceModel,
  },
  {
    name: "envMap",
    type: "hdrTexture",
    path: envMap,
  },
  {
    name: "anemoTex",
    type: "texture",
    path: anemoTex,
  },
  {
    name: "geoTex",
    type: "texture",
    path: geoTex,
  },
  {
    name: "electroTex",
    type: "texture",
    path: electroTex,
  },
  {
    name: "dendroTex",
    type: "texture",
    path: dendroTex,
  },
  {
    name: "hydroTex",
    type: "texture",
    path: hydroTex,
  },
  {
    name: "pyroTex",
    type: "texture",
    path: pyroTex,
  },
  {
    name: "cryoTex",
    type: "texture",
    path: cryoTex,
  },
  {
    name: "primogemTex",
    type: "texture",
    path: primogemTex,
  },
  {
    name: "diceRollSE",
    type: "audio",
    path: diceRollSE,
  },
  {
    name: "diceLightenSE",
    type: "audio",
    path: diceLightenSE,
  },
];

export default resourceList;
