/**
 * 广告牌
 */
import * as THREE from "three";
class Billboards extends THREE.Object3D{
    constructor(props){
        super(props);
        this.name = '';
        this.plane = null;
        this.createAmmeter(props);
    }
    createAmmeter= (props)=>{
        console.log('创建广告牌的内容',props);
        let _this = this;
        var geometry = new THREE.PlaneBufferGeometry(20.61, 15.26, 32);
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
    creatTextTure=(msg) =>{
        var width = 300, height = 256;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '255, 255, 255, 0';
        ctx.fillRect(0, 0, width, height);
        ctx.font = 35 + 'px " bold';
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('area:'+msg.area, width / 2 + 40, 20);
        ctx.fillText('area_name:'+msg.area_name, width / 2 , 70);
        ctx.fillText('id:'+msg.area_id, width / 2,120);
        ctx.fillText('layer:'+msg.area_layer, width / 2 , 170);
        ctx.fillText('level:'+msg.area_level, width / 2 ,230);
        return canvas;
    
    }
}export default Billboards;