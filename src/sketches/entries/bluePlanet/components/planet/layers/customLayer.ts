import * as lamina from "lamina/vanilla";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

class CustomLayer extends lamina.Abstract {
  static u_colorA = "#124dd8";
  static u_colorB = "#2bffe7";
  static u_cloudTint = "#001741";
  static u_gain = 0.5;
  static u_lacunarity = 2.0;
  static u_time = 0.0;

  static fragmentShader = fragmentShader;

  static vertexShader = vertexShader;

  constructor(props) {
    super(CustomLayer, {
      name: "CustomLayer",
      ...props,
    });
  }
}

export default CustomLayer;
