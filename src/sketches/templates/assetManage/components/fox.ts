import * as THREE from "three";
import * as kokomi from "kokomi.js";
import type * as STDLIB from "three-stdlib";

class Fox extends kokomi.Component {
  gltf: STDLIB.GLTF;
  animations: kokomi.AnimationManager;
  currentAction: THREE.AnimationAction | null;
  constructor(base: kokomi.Base, gltf: STDLIB.GLTF) {
    super(base);

    this.gltf = gltf;

    this.animations = new kokomi.AnimationManager(
      this.base,
      this.gltf.animations,
      this.gltf.scene
    );
    this.currentAction = null;
  }
  addExisting(): void {
    this.gltf.scene.scale.set(0.02, 0.02, 0.02);
    this.base.scene.add(this.gltf.scene);
  }
  playAction(name: string) {
    if (this.currentAction) {
      this.currentAction.fadeOut(0.5);
    }
    const action = this.animations.actions[name];
    action.reset().fadeIn(0.5).play();
    this.currentAction = action;
  }
}

export default Fox;
