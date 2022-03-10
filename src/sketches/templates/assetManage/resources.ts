import type * as kokomi from "kokomi.js";

const url = (path: string | TemplateStringsArray) => {
  const url = new URL(path as string, import.meta.url).href;
  return url;
};

const resourceList: kokomi.ResourceItem[] = [
  {
    name: "foxModel",
    type: "gltfModel",
    path: url`./assets/models/Fox/glTF/Fox.gltf`,
  },
];

export default resourceList;
