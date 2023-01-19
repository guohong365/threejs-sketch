import type * as THREE from "three";
import * as kokomi from "kokomi.js";
import type * as STDLIB from "three-stdlib";

import type createSketch from "@/sketches/templates/assetManage";

class Fox extends kokomi.Component {
  declare base: ReturnType<typeof createSketch>;
  gltf: STDLIB.GLTF;
  animations: kokomi.AnimationManager;
  currentAction: THREE.AnimationAction | null;
  constructor(base: kokomi.Base) {
    super(base);

    this.gltf = this.base.assetManager.items["foxModel"];

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
