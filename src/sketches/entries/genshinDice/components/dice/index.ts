import * as THREE from "three";
import * as kokomi from "kokomi.js";
import type * as STDLIB from "three-stdlib";

import type createSketch from "@/sketches/entries/genshinDice";

import diceVertexShader from "./shaders/vertex.glsl";
import diceFragmentShader from "./shaders/fragment.glsl";

interface InnerMatConfig {
  elementColor: THREE.Color;
  elementTex: THREE.Texture;
  materialParams: kokomi.AllMaterialParams;
  uvRotate: number;
  uvScale: number;
  uvFlipX: boolean;
  uvFlipY: boolean;
  uvTx: THREE.Vector2;
  uvSkew: THREE.Vector2;
}

interface Face {
  name: string;
  element: string;
  mesh: THREE.Mesh;
  color: string;
  config: Partial<InnerMatConfig>;
}

class Dice extends kokomi.Component {
  declare base: ReturnType<typeof createSketch>;
  gltf: STDLIB.GLTF;
  faces: Face[];
  constructor(base: kokomi.Base) {
    super(base);

    this.gltf = this.base.assetManager.items["diceModel"];

    const modelParts = kokomi.flatModel(this.gltf.scene);

    kokomi.printModel(modelParts);

    const dummyGeometry = new THREE.PlaneGeometry();

    const inner = modelParts[1] as THREE.Mesh;
    const frame = modelParts[2] as THREE.Mesh;
    const face1 = modelParts[3] as THREE.Mesh;
    const face2 = modelParts[4] as THREE.Mesh;
    const face3 = modelParts[5] as THREE.Mesh;
    const face4 = modelParts[6] as THREE.Mesh;
    const face5 = modelParts[7] as THREE.Mesh;
    const face6 = modelParts[8] as THREE.Mesh;
    const face7 = modelParts[9] as THREE.Mesh;
    const face8 = modelParts[10] as THREE.Mesh;

    face1.geometry.attributes.uv = dummyGeometry.attributes.uv;
    face2.geometry.attributes.uv = dummyGeometry.attributes.uv;
    face3.geometry.attributes.uv = dummyGeometry.attributes.uv;
    face4.geometry.attributes.uv = dummyGeometry.attributes.uv;
    face5.geometry.attributes.uv = dummyGeometry.attributes.uv;
    face6.geometry.attributes.uv = dummyGeometry.attributes.uv;
    face7.geometry.attributes.uv = dummyGeometry.attributes.uv;
    face8.geometry.attributes.uv = dummyGeometry.attributes.uv;

    // frame.visible = false;

    const frameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#795c30"),
      metalness: 1,
      roughness: 0.2,
    });

    const createInnerMat = (config: Partial<InnerMatConfig> = {}) => {
      const {
        elementColor = new THREE.Color("#095f44"),
        elementTex = this.base.assetManager.items["anemoTex"] as THREE.Texture,
        materialParams = {},
        uvRotate = THREE.MathUtils.degToRad(90 - 8),
        uvScale = 0.8,
        uvFlipX = false,
        uvFlipY = true,
        uvTx = new THREE.Vector2(0.6, 0.23),
        uvSkew = new THREE.Vector2(-0.56, 0.14),
      } = config;

      elementTex.minFilter = THREE.NearestFilter;
      // elementTex.wrapS = elementTex.wrapT = THREE.RepeatWrapping;

      const uj = new kokomi.UniformInjector(this.base);
      const innerMat = new kokomi.CustomShaderMaterial({
        baseMaterial: new THREE.MeshStandardMaterial(),
        vertexShader: diceVertexShader,
        fragmentShader: diceFragmentShader,
        uniforms: {
          ...uj.shadertoyUniforms,
          uElementColor: {
            value: elementColor,
          },
          uElementTex: {
            value: elementTex,
          },
          uUvRotate: {
            value: uvRotate,
          },
          uUvScale: {
            value: uvScale,
          },
          uUvFlipX: {
            value: uvFlipX,
          },
          uUvFlipY: {
            value: uvFlipY,
          },
          uUvTx: {
            value: uvTx,
          },
          uUvSkew: {
            value: uvSkew,
          },
          uBrightness: {
            value: 0.2,
          },
        },
        transparent: true,
        ...materialParams,
      });
      return innerMat;
    };

    frame.material = frameMat;

    const faces: Face[] = [
      {
        name: "face1",
        element: "primogem",
        mesh: face1,
        color: "#111111",
        config: {
          uvRotate: THREE.MathUtils.degToRad(4),
          uvFlipY: false,
          uvTx: new THREE.Vector2(1.1, 0.3),
        },
      },
      {
        name: "face2",
        element: "anemo",
        mesh: face2,
        color: "#095f44",
        config: {},
      },
      {
        name: "face3",
        element: "geo",
        mesh: face3,
        color: "#3f2205",
        config: {},
      },
      {
        name: "face4",
        element: "electro",
        mesh: face4,
        color: "#871b87",
        config: {},
      },
      {
        name: "face5",
        element: "dendro",
        mesh: face5,
        color: "#118111",
        config: {},
      },
      {
        name: "face6",
        element: "hydro",
        mesh: face6,
        color: "#1818c9",
        config: {},
      },
      {
        name: "face7",
        element: "pyro",
        mesh: face7,
        color: "#c81a1a",
        config: {},
      },
      {
        name: "face8",
        element: "cryo",
        mesh: face8,
        color: "#1fbbbb",
        config: {},
      },
    ];
    faces.forEach((face) => {
      face.mesh.material = createInnerMat({
        elementColor: new THREE.Color(face.color),
        elementTex: this.base.assetManager.items[`${face.element}Tex`],
        ...face.config,
      });
    });
    this.faces = faces;
  }
  addExisting(): void {
    this.base.scene.add(this.gltf.scene);
  }
  lightenElement(element: string) {
    const activeElement = this.faces.find((face) => face.element === element);
    const mat = activeElement?.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.uBrightness.value = 1;
  }
  darkenElement(element: string) {
    const activeElement = this.faces.find((face) => face.element === element);
    const mat = activeElement?.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.uBrightness.value = 0.2;
  }
}

export default Dice;
