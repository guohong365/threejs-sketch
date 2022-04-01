import * as THREE from "three";
import * as kokomi from "kokomi.js";

class SphereWordCloud extends kokomi.Component {
  points: THREE.Points;
  htmls: kokomi.Html[];
  constructor(base: kokomi.Base) {
    super(base);

    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    const material = new THREE.PointsMaterial({
      size: 0.01,
      transparent: true,
      opacity: 0,
    });
    const points = new THREE.Points(geometry, material);
    this.points = points;

    this.htmls = [];
  }
  addExisting(): void {
    const { base, points } = this;
    const { scene } = base;

    scene.add(points);
  }
  addHtmls() {
    const bufferAttribute = this.points.geometry.attributes
      .position as THREE.BufferAttribute;
    const positions = kokomi.convertBufferAttributeToVector(bufferAttribute);
    const htmls = positions.map((position, i) => {
      const el = document.querySelector(`.point-${i + 1}`) as HTMLElement;
      const html = new kokomi.Html(this.base, el, position);
      return html;
    });
    this.htmls = htmls;
  }
}

export default SphereWordCloud;
