import * as THREE from "three";
class RotatingRing extends THREE.Object3D{
    constructor(props){
        super(props);
        this.name = '动画圆盘';
        this.rotatingRing(props);
    }
    rotatingRing= (props)=>{
       

        var geometry = new THREE.RingBufferGeometry( 0.001, 2, 32 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh = new THREE.Mesh( geometry, material );
        this.add( mesh );

        let group1 = new THREE.Group()
        group1.name = 'left';
        var geometry1 = new THREE.RingBufferGeometry(  3.5, 4, 42 ,8,0, Math.PI * 0.3  ); 
       
        var material1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh1 = new THREE.Mesh( geometry1, material1 );
        group1.add( mesh1 );
        var geometry1 = new THREE.RingBufferGeometry(  3.5, 4, 42 ,8,1.3, Math.PI * 0.3  ); 
        
        var material1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh1 = new THREE.Mesh( geometry1, material1 );
        group1.add( mesh1 );
        var geometry1 = new THREE.RingBufferGeometry(  3.5, 4, 42 ,8,2.6, Math.PI * 0.3 ); 
        
        var material1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh1 = new THREE.Mesh( geometry1, material1 );
        group1.add( mesh1 );

        var geometry1 = new THREE.RingBufferGeometry(  3.5, 4, 42 ,8,3.9, Math.PI * 0.3 ); 
        var material1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh1 = new THREE.Mesh( geometry1, material1 );
        group1.add( mesh1 );

        var geometry1 = new THREE.RingBufferGeometry(  3.5, 4, 42 ,8,5.1, Math.PI * 0.3 ); 
        var material1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh1 = new THREE.Mesh( geometry1, material1 );
        group1.add( mesh1 );

        var geometry1 = new THREE.RingGeometry( 8.5, 9, 42 ); 
        var material1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh1 = new THREE.Mesh( geometry1, material1 );
        this.add( mesh1 );

        
        
        var geometry1 = new THREE.RingBufferGeometry(  6.5, 7, 42 ,8,0.1, Math.PI * 2  ); 
        geometry1.thetaLength  = Math.PI * 2 / 5
        var material1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var mesh1 = new THREE.Mesh( geometry1, material1 );
        this.add( mesh1 );

        this.add(group1);
        this.rotation.x = Math.PI / 2
        // group.position.x = props.position.x;
        // group.position.y = props.position.y;
        // group.position.z = props.position.z;
        // this.add(group)
    }

    /**
     * 底部圆环动画
     * 
     */
    modelAnimate= ()=>{
        console.log('底部圆环旋转动画',this);
        this.children.forEach(ele={

        })
    }
   
}export default RotatingRing;