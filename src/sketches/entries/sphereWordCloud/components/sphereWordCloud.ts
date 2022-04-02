import * as THREE from "three";
import * as kokomi from "kokomi.js";
import _ from "lodash";

export interface SphereWordCloudConfig {
  segment: number;
}

class SphereWordCloud extends kokomi.Component {
  points: THREE.Points;
  positions: THREE.Vector3[];
  htmls: kokomi.Html[];
  lines: THREE.Line[];
  constructor(base: kokomi.Base, config: Partial<SphereWordCloudConfig> = {}) {
    super(base);

    const { segment = 8 } = config;

    const geometry = new THREE.SphereGeometry(0.5, segment, segment);
    const material = new THREE.PointsMaterial({
      size: 0.01,
      transparent: true,
    });
    const points = new THREE.Points(geometry, material);
    this.points = points;

    this.positions = [];
    this.htmls = [];
    this.lines = [];

    this.getPositions();
  }
  addExisting(): void {
    const { base, points } = this;
    const { scene } = base;

    scene.add(points);
  }
  getPositions() {
    const positionAttribute = this.points.geometry.attributes.position;
    const positions = kokomi.convertBufferAttributeToVector(positionAttribute);
    const uniqPositions = _.uniqWith(positions, _.isEqual);
    this.positions = uniqPositions;
  }
  randomizePositions() {
    this.positions = this.positions.map((position) => {
      const offset = THREE.MathUtils.randFloat(0.4, 1);
      const offsetVector = new THREE.Vector3(offset, offset, offset);
      const targetPosition = position.multiply(offsetVector);
      return targetPosition;
    });
  }
  addHtmls() {
    const { positions } = this;
    const htmls = positions.map((position, i) => {
      const el = document.querySelector(`.point-${i + 1}`) as HTMLElement;
      const html = new kokomi.Html(this.base, el, position);
      return html;
    });
    this.htmls = htmls;
  }
  addLines() {
    const { positions } = this;
    const material = new THREE.LineBasicMaterial();
    const lines = positions.map((position) => {
      const points = [this.points.position, position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      this.base.scene.add(line);
      return line;
    });
    this.lines = lines;
  }
}

export default SphereWordCloud;
