import * as THREE from "three";
import * as kokomi from "kokomi.js";
import type * as STDLIB from "three-stdlib";

class Fox extends kokomi.Component {
  gltf: STDLIB.GLTF;
  mixer: THREE.AnimationMixer;
  currentActionId: number;
  constructor(base: kokomi.Base, gltf: STDLIB.GLTF) {
    super(base);

    this.gltf = gltf;

    const mixer = new THREE.AnimationMixer(this.gltf.scene);
    this.mixer = mixer;

    this.currentActionId = 0;
  }
  addExisting(): void {
    this.gltf.scene.scale.set(0.02, 0.02, 0.02);
    this.base.scene.add(this.gltf.scene);
  }
  update(time: number): void {
    const delta = this.base.clock.getDelta();
    this.mixer.update(delta);
  }
  playAction(id = 0) {
    this.mixer.stopAllAction();
    const action = this.mixer.clipAction(this.gltf.animations[id]);
    action.play();
    this.currentActionId = id;
  }
  idle() {
    this.playAction(0);
  }
  walk() {
    this.playAction(1);
  }
  run() {
    this.playAction(2);
  }
  onClickSwitchAction() {
    console.log("点击狐狸切换动画");
    this.base.interactionManager.add(this.gltf.scene);
    this.gltf.scene.addEventListener("click", () => {
      if (this.currentActionId === 0) {
        this.playAction(1);
      } else if (this.currentActionId === 1) {
        this.playAction(2);
      } else if (this.currentActionId === 2) {
        this.playAction(0);
      }
    });
  }
}

export default Fox;
