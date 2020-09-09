import * as THREE from "three";
import h337 from "../../../assets/js/mapModel/heatmap.min.js";

class Hotjar extends THREE.Object3D {
  constructor(props) {
    super(props);
    this.name = '热力图';
    this.plane = null;
    this.createAmmeter(props);

  }
  createAmmeter = (props) => {
    let _this = this;
    var geometry = new THREE.PlaneBufferGeometry(700.61, 700.26, 32);
    var plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      map: new THREE.CanvasTexture(this.creatTextTure(props))
    }));
    //plane.position.set(props.positionX, props.positionY, -props.positionZ);//TODO
    plane.usetype = 'sceen';
    _this.plane = plane;
    this.add(plane);
  }
  creatTextTure = (dataList) => {
    let min = 0
    let max = 100
    var data = [
      { x: 471, y: 277, value: 25 },
      { x: 438, y: 375, value: 97 },
      { x: 373, y: 19, value: 71 },
      { x: 473, y: 42, value: 63 },
      { x: 463, y: 95, value: 97 },
      { x: 590, y: 437, value: 34 },
      { x: 377, y: 442, value: 66 },
      { x: 171, y: 254, value: 20 },
      { x: 6, y: 582, value: 64 },
      { x: 387, y: 477, value: 14 },
      { x: 300, y: 300, value: 80 }
    ];
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    data.forEach(point => {
      let { x, y, value } = point;
      context.beginPath();
      context.arc(x, y, 3, 0, 2 * Math.PI);
      context.closePath();

      // 创建渐变色: r,g,b取值比较自由，我们只关注alpha的数值
      let radialGradient = context.createRadialGradient(x, y, 0, x, y, 3);
      radialGradient.addColorStop(0.0, "rgba(0,0,0,1)");
      radialGradient.addColorStop(1.0, "rgba(0,0,0,0)");
      context.fillStyle = radialGradient;

      // 设置globalAlpha: 需注意取值需规范在0-1之间
      let globalAlpha = (value - min) / (max - min);
      context.globalAlpha = Math.max(Math.min(globalAlpha, 1), 0);

      // 填充颜色
      context.fill();
    });
    return canvas;
  }
  /**
 * 取色器
 * @param {Number} position 像素位置
 * @return {Array.<Number>} [r, g, b]
 */
colorPicker (position) {
  return this.imageData.slice(position * 4, position * 4 + 3);
};


} export default Hotjar;