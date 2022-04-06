import * as THREE from "three";
import * as kokomi from "kokomi.js";
import * as CANNON from "cannon-es";
import * as STDLIB from "three-stdlib";
import mitt, { type Emitter } from "mitt";

class Breaker extends kokomi.Component {
  cob: STDLIB.ConvexObjectBreaker;
  objs: any[];
  emitter: Emitter<any>;
  constructor(base: kokomi.Base) {
    super(base);

    const cob = new STDLIB.ConvexObjectBreaker();
    this.cob = cob;

    this.objs = [];

    this.emitter = mitt();
  }
  // 添加可粉碎物体
  add(obj: any, splitCount = 0) {
    this.cob.prepareBreakableObject(
      obj.mesh,
      obj.body.mass,
      obj.body.velocity,
      obj.body.angularVelocity,
      true
    );
    obj.body.userData = {
      splitCount, // 已经被分割的次数
      meshId: obj.mesh.id, // 使body能对应上其相应的mesh
    };
    this.objs.push(obj);
  }
  // 通过id获取obj
  getObjById(id: any) {
    const obj = this.objs.find((item: any) => item.mesh.id === id);
    return obj;
  }
  // 碰撞时
  onCollide(e: any) {
    const obj = this.getObjById(e.body.userData?.meshId);
    if (obj && obj.body.userData.splitCount < 2) {
      this.splitObj(e);
      this.emitter.emit("hit");
    }
  }
  // 分割物体
  splitObj(e: any) {
    const obj = this.getObjById(e.body.userData?.meshId); // 碰撞物
    const mesh = obj.mesh; // 网格
    const body = e.body as CANNON.Body;
    const contact = e.contact as CANNON.ContactEquation; // 接触
    const poi = body.pointToLocalFrame(contact.bj.position).vadd(contact.rj); // 碰撞点
    const nor = new THREE.Vector3(
      contact.ni.x,
      contact.ni.y,
      contact.ni.z
    ).negate(); // 法线
    const fragments = this.cob.subdivideByImpact(
      mesh,
      new THREE.Vector3(poi.x, poi.y, poi.z),
      nor,
      2,
      1
    ); // 将网格分割成碎片

    // 移除已经破碎的物体
    this.base.scene.remove(mesh);
    setTimeout(() => {
      this.base.physics.world.removeBody(body);
    });

    // 将碎片添加至当前的世界
    fragments.forEach((mesh: THREE.Object3D) => {
      // 将mesh转化为物理世界的shape
      const geometry = (mesh as THREE.Mesh).geometry;
      const shape = kokomi.convertGeometryToShape(geometry);
      const body = new CANNON.Body({
        mass: mesh.userData.mass,
        shape,
        position: new CANNON.Vec3(
          mesh.position.x,
          mesh.position.y,
          mesh.position.z
        ), // 这里别忘了同步碎片的位置，不然碎片会飞出去
        quaternion: new CANNON.Quaternion(
          mesh.quaternion.x,
          mesh.quaternion.y,
          mesh.quaternion.z,
          mesh.quaternion.w
        ), // 旋转方向也要同步
      });
      this.base.scene.add(mesh);
      this.base.physics.add({ mesh, body });

      // 将碎片添加至可破坏物中
      const obj = {
        mesh,
        body,
      };
      this.add(obj, e.body.userData.splitCount + 1);
    });
  }
}

export default Breaker;
