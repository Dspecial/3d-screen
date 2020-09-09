<template>
  <div>
    <div id="container"></div>
    <div id="container1" style="width: 100%;height: 100%"></div>
    <!-- <div id="heatmap" style="width:600px; height:400px;border: 1px solid;border-color: grey;"></div> -->
  </div>
</template>

<script>
import * as THREE from "three";
import echarts from "echarts";
// import echarts from '../../assets/js/mapModel/echarts.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshLine, MeshLineMaterial } from "@/assets/js/mapModel/meshLine";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import LinearInterpolant from "three/src/math/interpolants/LinearInterpolant"; //LinearInterpolant
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { GeometryUtils } from "three/examples/jsm/utils/GeometryUtils.js";

import util from "../../assets/js/mapModel/util";
import Billboards from "../../assets/js/mapModel/Billboards";
// import Heatmap from "../../assets/js/mapModel/heatmap";
// import h337 from "../../assets/js/mapModel/heatmap.min.js";

import Hotjar from "../../assets/js/mapModel/Hotjar";
import Stats from "three/examples/jsm/libs/stats.module.js";
import RotatingRing from "../../assets/js/mapModel/rotatingRing";
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      mouse: new THREE.Vector2(),
      selectObject: null,
      stats: null,
      boxGroup: null,
      personGroup: null,
      line1: null,
      texture2: null,
      pointMovePath: null,
      textureLoader: new THREE.TextureLoader(),
      carPathPointNum: 0,
      count: 0,
      container: null,
      selectStore: "焊装",

      pointsdata: [
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
        { x: 300, y: 300, value: 80 },
      ],
      layerArr: [],
      materials: {},
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    //初始化
    init: function () {
      //  创建场景对象Scene
      let container = document.getElementById("container");
      this.scene = new THREE.Scene();
      window.scene = this.scene;

      /**
       * 相机设置 透视相机
       */

      this.camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        10000
      );

      // /**
      //  * 正交相机
      //  */
      // this.camera = new THREE.OrthographicCamera(
      //   container.clientWidth / -2,container.clientWidth / 2,container.clientHeight / 2,
      //   container.clientHeight / - 2,
      //   0.1,
      //   10000
      // );

      // //之前位置
      // this.camera.position.x = 35;
      // this.camera.position.y = 300;
      // this.camera.position.z = 408;

      this.camera.position.x = 35;
      this.camera.position.y = 200;
      this.camera.position.z = 238;

      this.scene.add(this.camera);
      this.creatLight();
      this.creatMaterials();

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.stats = new Stats();
      container.appendChild(this.stats.dom);
      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.enableRotate = false;
      this.controls.enableRotate = true;
      container.addEventListener("click", this.onDocumentMouseClick, false);
      this.container = container;
      // this.scene.add(this.modelarr);

      this.creatCar();
      // this.creatPersion();
      // this.creatHotjar();
      // this.creatline();
      // this.creatline2();
      // this.RotatingRing();
      // this.loaderModel();
      //json数据名，距离x ，距离y, 高度，颜色

      this.creatPlane();

      this.location(
        "焊装_库位",
        12557216.6,
        2670815.3,
        2,
        0x1374ff,
        0x1374ff,
        "库位"
      ); //2E3092  0x004f6d  2e3192  ff66c4
      // this.workPoint("焊装_工位", 12557216.6, 2670815.3);

      this.location(
        "焊装_库区",
        12557216.6,
        2670815.3,
        -0.04,
        0x001139,
        0x001139,
        "库区"
      ); //0x00ffff   0x3399cc  0x050745
      this.location(
        "焊装_产线",
        12557216.6,
        2670815.3,
        2,
        0x1e47a5,
        0x2755bf,
        "产线"
      ); //4c2ed0
      this.roadGrid("焊装_路网", 12557216.6, 2670815.3, 0x041237, "路网"); //0x024e8a  0xa61512  09254c  0xb344e5
      // this.creatFatLine("焊装_路网", 12557216.6, 2670815.3, 0x0000ff, "路网");
      this.roadGrid("焊装_墙体", 12557216.6, 2670815.3, 0x0a62d7, "墙体");
      // this.creatWall();

      // this.location("pack_库位", 12557284.6, 2671295.3, 1.5, 0x00ffff, "库位");
      // this.workPoint("pack_工位", 12557284.6, 2671295.3);

      // this.location("pack_库区", 12557284.6, 2671295.3, 4, 0x00ffff, "库区"); //0x00ffff   0x3399cc
      // this.location("pack_产线", 12557284.6, 2671295.3, 2, 0x3399cc, "产线");
      // this.roadGrid("pack_路网", 12557284.6, 2671295.3, 0x0000ff, "路网");
      // this.roadGrid("pack_墙体", 12557284.6, 2671295.3, 0xffff00, "墙体");

      // this.location("总装_库位", 12557284.6, 2671295.3, 1.5, 0x00ffff, "库位");
      // this.workPoint("总装_工位", 12557284.6, 2671295.3);

      // this.location("总装_库区", 12557206.6, 2671137.3, 2, 0x00ffff, "库区"); //0x00ffff   0x3399cc
      // this.location("总装_产线", 12557206.6, 2671137.3, 2, 0x3399cc, "产线");
      // this.roadGrid("总装_路网", 12557206.6, 2671137.3, 0x0000ff, "路网");
      // this.roadGrid("总装_墙体", 12557206.6, 2671137.3, 0xffff00, "墙体");

      // this.movePath(12557216.6, 2670815.3);
      // this.initEcharts();
    },

    /**
     * 添加灯光
     */
    creatLight: function () {
      var light = new THREE.AmbientLight(0xffffff); // soft white light
      this.scene.add(light);

      let light_one = new THREE.DirectionalLight(0xc8c5c0); //C8C5C0
      light_one.position.set(-100, 200, -100);
      this.scene.add(light_one);
      // var helper = new THREE.DirectionalLightHelper(light_one, 150);
      // scene.add(helper);

      let light_two = new THREE.DirectionalLight(0xffffff); //c2ccd0  0x7f8184
      light_two.position.set(150, 150, 200);
      this.scene.add(light_two);
      // var helper1 = new THREE.DirectionalLightHelper(light_two, 30);
      // scene.add(helper1);

      // var spotLight = new THREE.SpotLight(0xffffff);
      // spotLight.position.set(0, 120, 0);

      // spotLight.castShadow = true;

      // spotLight.shadow.mapSize.width = 84;
      // spotLight.shadow.mapSize.height = 84;

      // spotLight.shadow.camera.near = 500;
      // spotLight.shadow.camera.far = 400;
      // spotLight.shadow.camera.fov = 30;

      // var spotLightHelper = new THREE.SpotLightHelper(spotLight);
      // scene.add(spotLightHelper);

      // this.scene.add(spotLight);
    },

    creatMaterials() {
      this.materials["phoneMaterial"] = new THREE.MeshPhongMaterial({
        color: 0x003366,
      });
    },

    /**
     * todo: 地面
     */
    creatPlane() {
      var geometry = new THREE.PlaneBufferGeometry(650, 200, 32);
      var material = new THREE.MeshBasicMaterial({
        //MeshBasicMaterial  MeshLambertMaterial.
        transparent: true,
        opacity: 0.25,
        color: 0x0a62d7, //1c0b55  502999  050929  0x5f5e66
        // color: 0x060859, //
        side: THREE.DoubleSide,
      });
      var plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = Math.PI / 2;
      plane.position.y = -10;
      plane.position.z = -23;
      plane.position.x = -40;

      this.scene.add(plane);
    },
    /**
     *鼠标点击事件
     */
    onDocumentMouseClick: function (even) {
      event.preventDefault();

      this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      console.log("intersects", intersects[0]);
      //选中模型
      if (intersects.length > 0) {
        if (this.selectObject)
            this.selectObject.material.color.set(this.selectObject.color);
            this.selectObject = intersects[0].object;
        if (this.selectObject.modeltype === "gemo") {
          this.selectObject.material.color.set(0x9d2933);
          //显示广告牌
          // console.log("7777", this.selectObject);
          if (this.selectObject.children.length > 0) {
          } else {
            // let billboards = new Billboards(this.selectObject);
            // billboards.position.x = this.selectObject.geometry.boundingSphere.center.x;
            // billboards.position.y = this.selectObject.geometry.boundingSphere.center.y;
            // billboards.position.z = 20;
            // billboards.rotation.x = Math.PI / 2;
            // this.selectObject.add(billboards);
          }
        }else if(this.selectObject.modeltype === "outline"){
          console.log(this.selectObject);
          this.selectObject=this.selectObject.parent
           this.selectObject.material.color.set(0x9d2933);
        }
      } else {
        //点击到的空白处或者非点击模型
        if (this.selectObject) {
          if (this.selectObject)
            this.selectObject.material.color.set(this.selectObject.color);
        }
      }
    },

    /**
     * 模拟叉车
     */
    creatCar: function () {
      let group = new THREE.Group();
      let geometry = new THREE.BoxGeometry(6, 9, 9);
      let material = new THREE.MeshNormalMaterial({
        color: 0xffffff,
      });
      let mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);

      let geometry1 = new THREE.BoxGeometry(1, 1, 6);
      let material1 = new THREE.MeshNormalMaterial({
        color: 0xffffff,
      });
      let mesh1 = new THREE.Mesh(geometry1, material1);
      mesh1.position.set(-2, -2, 6);
      group.add(mesh1);

      let geometry2 = new THREE.BoxGeometry(1, 1, 6);
      let material2 = new THREE.MeshNormalMaterial({
        color: 0xffffff,
      });
      let mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.position.set(2, -2, 6);
      group.add(mesh2);
      group.rotation.y = Math.PI / 2;
      this.boxGroup = group;
      group.scale.set(0.3, 0.3, 0.3);
      this.scene.add(group);
    },
    /**
     * 模拟工人
     */
    creatPersion: function () {
      let group = new THREE.Group();
      let geometry = new THREE.BoxGeometry(3, 3, 3);
      let material = new THREE.MeshNormalMaterial({
        color: 0xffffff, //"white"
      });
      let mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
      group.position.x = -90;
      this.personGroup = group;
      this.scene.add(group);
    },
    /**
     * 创建热力图
     * param : data
     */
    creatHotjar: function () {
      let hotjar = new Hotjar(this.pointsdata);
      hotjar.rotation.x = Math.PI / 2;
      this.scene.add(hotjar);
    },

    creatline: function () {
      const vertexshader1 = `attribute float size;
        attribute vec3 customColor;

        varying vec3 vColor;

        void main() {

            vColor = customColor;

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

            gl_PointSize = size * ( 300.0 / -mvPosition.z );

            gl_Position = projectionMatrix * mvPosition;

        }`;

      const fragmentshader1 = ` uniform vec3 color;
        uniform sampler2D pointTexture;

        varying vec3 vColor;

        void main() {

            gl_FragColor = vec4( color * vColor, 1.0 );
            gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

        }`;
      var amount = 1000;

      var radius = 200;

      var positions = new Float32Array(amount * 3);
      var colors = new Float32Array(amount * 3);
      var sizes = new Float32Array(amount);

      var vertex = new THREE.Vector3();
      var color = new THREE.Color(0xffffff);

      for (var i = 0; i < amount; i++) {
        vertex.x = (Math.random() * 2 - 1) * radius;
        vertex.y = (Math.random() * 2 - 1) * radius;
        vertex.z = (Math.random() * 2 - 1) * radius;
        vertex.toArray(positions, i * 3);

        if (vertex.x < 0) {
          color.setHSL(0.5 + 0.1 * (i / amount), 0.7, 0.5);
        } else {
          color.setHSL(0.0 + 0.1 * (i / amount), 0.9, 0.5);
        }

        color.toArray(colors, i * 3);

        sizes[i] = 20; //线粗细
      }
      var curve = new THREE.CatmullRomCurve3();
      function Point(pos) {
        this.vector = new THREE.Vector3(pos.x, pos.y, pos.z);
      }
      var points = [
        new Point({ x: -100, y: 0, z: 0 }),
        new Point({ x: -50, y: 50, z: 0 }),
        new Point({ x: 100.199427036501952, y: 0, z: 0 }),
      ];
      points.forEach(function (point) {
        curve.points.push(point.vector);
      });
      var geometry = new THREE.Geometry();
      geometry.vertices = curve.getPoints(amount - 1);
      var pointArr = [];
      var colorArr = [];
      var objArr = geometry.vertices;
      for (var i = 0; i < objArr.length; i++) {
        pointArr.push(objArr[i].x);
        pointArr.push(objArr[i].y);
        pointArr.push(objArr[i].z);
        colorArr.push(0);
        colorArr.push(0);
        colorArr.push(1);
      }
      // console.log(positions)
      // geometry.setPositions(pointArr);
      pointArr = new Float32Array(pointArr);
      colorArr = new Float32Array(colorArr);
      // console.log(pointArr)
      // console.log(colors)
      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute("position", new THREE.BufferAttribute(pointArr, 3));
      geometry.addAttribute(
        "customColor",
        new THREE.BufferAttribute(colors, 3)
      );
      geometry.addAttribute("size", new THREE.BufferAttribute(sizes, 1));

      var material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xf0ffff) },
          pointTexture: {
            value: new THREE.TextureLoader().load(
              "../../assets/images/spark1.jpg"
            ),
          },
        },
        vertexShader: vertexshader1,
        fragmentShader: fragmentshader1,

        // blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      });

      let sphere = new THREE.Points(geometry, material);
      this.scene.add(sphere);
    },
    creatline2: function () {
      const pointList1 = [
        [20, 30, 10],
        [10, 30, -9],
        [10, 30, 20],
        [-40, 30, -40],
      ];
      // let line1
      let el = document.getElementById("container");
      const resolution = new THREE.Vector2(el.offsetWidth, el.offsetHeight);
      // textureLoader.load( '../../images/ysThree/green_line.png', function (texture1) {
      let texture1 = this.textureLoader.load(
        require("../../assets/images/threemap/spark1.jpg")
      );
      const material1 = new MeshLineMaterial({
        color: "green",
        map: texture1,
        useMap: true,
        lineWidth: 4,
        resolution: resolution,
        dashArray: 0.8, // 破折号之间的长度和间距。(0 -无破折号)
        dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
        dashOffset: 0,
        transparent: true,
        sizeAttenuation: 1, //使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
        side: THREE.FrontSide,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        near: this.camera.near,
        far: this.camera.far,
      });
      const l = [];
      pointList1.forEach((e) => l.push(new THREE.Vector3(e[0], e[1], e[2])));
      let curve = new THREE.CatmullRomCurve3(l); // 曲线路径
      const geo = new THREE.Geometry();
      geo.vertices = curve.getPoints(50);
      console.log(geo);
      const meshLine = new MeshLine();
      meshLine.setGeometry(geo);
      console.log(meshLine.geometry);
      this.line1 = new THREE.Mesh(meshLine.geometry, material1);
      // this.line1 = line1;
      scene.add(this.line1);

      const pointList2 = [
        [-20, 5, -10],
        [30, 5, -15],
        [10, 5, 20],
        [40, 5, 40],
      ];
      this.texture2 = this.textureLoader.load(
        require("../../assets/images/threemap/spark1.jpg")
      );
      this.texture2.wrapS = this.texture2.wrapT = THREE.RepeatWrapping; //每个都重复
      this.texture2.repeat.set(1, 1);
      const material2 = new THREE.MeshBasicMaterial({
        map: this.texture2,
        side: THREE.BackSide,
        transparent: true,
      });
      this.texture2.needsUpdate = true;
      const line2 = this.createAnimateLine({
        // kind: "sphere", //默认不填 为普通 ; 如为sphere,则表示球面建点
        type: "pipe", //默认不填 为MeshLine ; 如为pipe,则表示管道线
        pointList: pointList2,
        material: material2,
        number: 100,
      });
      scene.add(line2);
    },

    createAnimateLine(option) {
      let curve;
      if (option.kind === "sphere") {
        // 由两点之间连线成贝塞尔曲线
        const sphereHeightPointsArgs = option.sphereHeightPointsArgs;
        const pointList = this.getSphereHeightPoints(...sphereHeightPointsArgs); // v0,v3,n1,n2,p0
        curve = new THREE.CubicBezierCurve3(
          sphereHeightPointsArgs[0],
          pointList[0],
          pointList[1],
          sphereHeightPointsArgs[1]
        );
      } else {
        // 由多个点数组构成的曲线 通常用于道路
        const l = [];
        option.pointList.forEach((e) =>
          l.push(new THREE.Vector3(e[0], e[1], e[2]))
        );
        curve = new THREE.CatmullRomCurve3(l); // 曲线路径
      }
      if (option.type === "pipe") {
        // 使用管道线
        // 管道体
        const tubeGeometry = new THREE.TubeGeometry(
          curve,
          option.number || 50,
          option.radius || 1,
          option.radialSegments
        );
        return new THREE.Mesh(tubeGeometry, option.material);
      } else {
        // 使用 meshLine
        if (!MeshLine || !MeshLineMaterial)
          console.error("you need import MeshLine & MeshLineMaterial!");
        else {
          const geo = new THREE.Geometry();
          geo.vertices = curve.getPoints(option.number || 50);
          const meshLine = new MeshLine();
          meshLine.setGeometry(geo);
          return new THREE.Mesh(meshLine.geometry, option.material);
        }
      }
    },
    getSphereHeightPoints(v0, v3, n1, n2, p0) {
      // 夹角
      const angle = (v0.angleTo(v3) * 180) / Math.PI / 10; // 0 ~ Math.PI
      const aLen = angle * (n1 || 10);
      const hLen = angle * angle * (n2 || 120);
      p0 = p0 || new THREE.Vector3(0, 0, 0); // 默认以 坐标原点为参考对象
      // 法线向量
      const rayLine = new THREE.Ray(
        p0,
        v0.clone().add(v3.clone()).divideScalar(2)
      );
      // 顶点坐标
      const vtop = rayLine.at(hLen / rayLine.at(1).distanceTo(p0));
      // 计算制高点
      const getLenVector = (v1, v2, len) =>
        v1.lerp(v2, len / v1.distanceTo(v2));
      // 控制点坐标
      return [
        getLenVector(v0.clone(), vtop, aLen),
        getLenVector(v3.clone(), vtop, aLen),
      ];
    },
    RotatingRing() {
      let rotatingRing = new RotatingRing({
        position: { x: -30, y: 20, z: 50 },
      });
      this.scene.add(rotatingRing);
    },
    loaderModel: function () {
      var loader = new ColladaLoader();
      // var loader = new THREE.ColladaLoader();
      let _this = this;
      var mesh;
      loader.load("../../assets/dae/C4D-changqu-0821.dae", function (result) {
        // mesh = result.scene.children[0].clone();
        _this.scene.add(result);
      });
    },

    location(name, x, y, amount, color, color2, type) {
      // 总装_库位图层
      let modelarr = new THREE.Object3D();
      let _this = this;
      const kuweidata = require("../../assets/json/" + name + ".json");
      // console.log('pack产线：',kuweidata);
      kuweidata.features.forEach((element, index1) => {
        // console.log("pack产线：", element);
        if (element.geometry.coordinates) {
          let data = [];
          if (element.geometry.type === "Polygon") {
            data = element.geometry.coordinates[0];
          } else {
            data = element.geometry.coordinates[0][0];
          }

          let rectdata = this.getrectdata(data);
          let extrudeSettings = {
            amount: amount,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
          };
          let shape = new THREE.Shape(this.getshapePoints(rectdata, x, y));
          // let color = util.getRandomColor();
          let geometry = new THREE.ExtrudeBufferGeometry(
            shape,
            extrudeSettings
          );

          let material = new THREE.MeshPhongMaterial({
            color: color,
            opacity: 0.8,
            // opacity: 1,
            transparent: true,
          });
          let properties = element.properties;

          //现况模式
          // let hitbox = new THREE.Mesh(
          //   geometry,
          //   new THREE.MeshBasicMaterial({ color: 0x99ffff, wireframe: true })
          // );
          //  modelarr.add(hitbox);

          let cubeEdges = new THREE.EdgesGeometry(geometry, 1);
          let color1;
          // if(type === '库位'){
          //     color1 = color2
          // }else{
          //     color1 = 0x27468c
          // }
          let edgesMtl = new THREE.LineBasicMaterial({ color: color2 });
          let cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
          cubeLine.modeltype = "outline";
          let mesh = new THREE.Mesh(geometry, material);

          mesh.add(cubeLine);

          mesh.color = color;
          mesh.isSelected = true;
          mesh.modeltype = "gemo";
          mesh.area = properties.area ? properties.area : "";
          mesh.area_name = properties.area_name ? properties.area_name : "";
          mesh.area_id = properties.id ? properties.id : "";
          mesh.area_layer = properties.layer ? properties.layer : "";
          mesh.area_level = properties.level ? properties.level : "";

          //加载精灵图
          // let sub = this.createSpriteShape({
          //   x: mesh.geometry.attributes.position.array[0] + 10,
          //   y: mesh.geometry.attributes.position.array[1],
          //   z: 20,
          //   mesh: mesh,
          // });
          // // mesh.add(sub);

          modelarr.add(mesh);
        }
      });

      modelarr.rotation.x = -Math.PI / 2;
      modelarr.position.y = 0;
      modelarr.name = name;
      modelarr.visible = false;
      this.layerArr.push(modelarr);
      this.scene.add(modelarr);
      // _this.modelarr.visible = false;
      // _this.modelarr.scale.set(3, 3, 3);
    },
    workPoint(name, x, y) {
      let _this = this;
      let sphereArr = new THREE.Object3D();
      var radius = 0.3,
        segemnt = 16,
        rings = 16;
      const workPoint = require("../../assets/json/" + name + ".json");
      console.log("888885555", workPoint);
      workPoint.features.forEach((element, index1) => {
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xcc0000 });
        var sphere = new THREE.Mesh(
          new THREE.SphereGeometry(radius, segemnt, rings),
          sphereMaterial
        );
        sphere.position.x = element.geometry.coordinates[0] - x;
        sphere.position.z = -(element.geometry.coordinates[1] - y);
        sphereArr.add(sphere);
        // _this.scene.add(sphere);
      });
      sphereArr.name = name;
      sphereArr.visible = false;
      this.layerArr.push(sphereArr);
      _this.scene.add(sphereArr);
    },
    roadGrid(name, x, y, color, type) {
      let _this = this;
      let dis, poin, geometry, cube, centerPoint;
      let lineArr = new THREE.Object3D();
      const roadGrid = require("../../assets/json/" + name + ".json");
      var material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.8,
        color: color,
      });
      if (type === "路网") {
        material.opacity = 1;
      }

      roadGrid.features.forEach((element, index1) => {
        let points = [];
        element.geometry.coordinates.forEach((ele) => {
          points.push(new THREE.Vector3(ele[0] - x, 0, -(ele[1] - y)));
        });
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        // var line = new THREE.Line(geometry, material);
        // lineArr.add(line);
        poin = geometry.attributes.position.array;
        dis = this.v1Tov2distance(poin[0], poin[2], poin[3], poin[5]);

        if (type === "墙体") {
          geometry = new THREE.BoxBufferGeometry(dis, 4, 1);
        } else {
          geometry = new THREE.BoxBufferGeometry(dis + 1, 0.1, 1.2);
        }
        cube = new THREE.Mesh(geometry, material);
        centerPoint = this.getCenter(poin[0], poin[2], poin[3], poin[5]);

        cube.position.x = centerPoint.x;
        if (type === "路网") {
          cube.position.y = -0.2;
        } else {
          cube.position.y = 1;
        }

        cube.position.z = centerPoint.y;
        let k = (poin[5] - poin[2]) / (poin[3] - poin[0]);
        let hh = Math.atan(k);
        // console.log('66699',hh);
        cube.rotation.y = hh;

        lineArr.add(cube);
      });
      lineArr.name = name;
      lineArr.visible = false;
      this.layerArr.push(lineArr);
      _this.scene.add(lineArr);
      // this.creatWall(lineArr)
    },

    /**
     * todo: 胖线模拟道路
     */
    creatFatLine(name, x, y, color) {
      let _this = this;
      let lineArr = new THREE.Object3D();

      var points = GeometryUtils.hilbert3D(
        new THREE.Vector3(0, 0, 0),
        20.0,
        1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      );
      var point = new THREE.Vector3();
      var spline = new THREE.CatmullRomCurve3(points);
      var divisions = Math.round(12 * 5);
      var colors = [];
      var color = new THREE.Color();
      let matLine = new LineMaterial({
        color: 0xffffff,
        linewidth: 5, // in pixels
        vertexColors: true,
        //resolution:  // to be set by renderer, eventually
        dashed: false,
      });
      var positions = [];
      for (var i = 0, l = divisions; i < l; i++) {
        var t = i / l;

        spline.getPoint(t, point);
        positions.push(point.x, point.y, point.z);

        color.setHSL(t, 1.0, 0.5);
        colors.push(color.r, color.g, color.b);
      }
      const roadGrid = require("../../assets/json/" + name + ".json");
      roadGrid.features.forEach((element, index1) => {
        let points = [];
        element.geometry.coordinates.forEach((ele) => {
          points.push(ele[0] - x, 0, -(ele[1] - y));
        });
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(points, 3)
        );

        var line = new Line2(geometry, matLine);
        line.scale.setScalar(2);
        _this.scene.add(line);
      });
      //      lineArr.name = name;
      // lineArr.visible = false;
      // this.layerArr.push(lineArr);
      // _this.scene.add(lineArr);
    },
    creatWall(data) {
      // console.log('3333',data);
      let _this = this;
      let dis, poin, geometry, cube;
      let material = new THREE.MeshLambertMaterial({
        color: 0x7a7d7f,
        transparent: true,
        opacity: 0.7,
      });

      data.children.forEach((ele, index) => {
        poin = ele.geometry.attributes.position.array;
        dis = this.v1Tov2distance(poin[0], poin[2], poin[3], poin[5]);
        geometry = new THREE.BoxGeometry(dis, 2, 1);
        cube = new THREE.Mesh(geometry, material);
        if (index == 1) console.log("9999*", ele.geometry.boundingSphere);
        return;
        cube.position.x = ele.geometry.boundingSphere.center.x;
        cube.position.y = ele.geometry.boundingSphere.center.y;
        cube.position.z = ele.geometry.boundingSphere.center.z;
        _this.scene.add(cube);
      });
      // let dis = this.v1Tov2distance(-311.2454833984375,-34.576171875,-229.71548461914062,-34.56616973876953);

      // var geometry = new THREE.BoxBufferGeometry(dis, 2, 1);

      // var cube = new THREE.Mesh(geometry, material);
      // cube.position.x= -270.48048400878906
      // cube.position.y= 0
      // cube.position.z= -34.571170806884766
      // this.scene.add(cube);
    },
    getCenter(a, b, c, d) {
      let x = (a + c) / 2;
      let y = (b + d) / 2;
      return { x: x, y: y };
    },
    /**
     * todo：计算俩个坐标点距离
     */
    v1Tov2distance(x1, y1, x2, y2) {
      return Math.sqrt(
        Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2)
      );
    },

    /**
     * 返回创模型建点
     */
    getshapePoints: function (params, x, y) {
      let shapePoints = [];
      for (let i = 0; i < params.length - 1; i++) {
        shapePoints.push(new THREE.Vector2(params[i][0] - x, params[i][1] - y));
      }
      return shapePoints;
    },

    /**
     * 整理数据geojson数据点
     */
    getrectdata: function (data) {
      let dataArr = [];
      data.forEach((element) => {
        dataArr.push([element[0], element[1]]); //* 0.0001
      });
      return dataArr;
    },

    movePath(x, y) {
      // let PathFinder = require('geojson-path-finder');
      let roadGrid = require("../../assets/json/焊装-模拟路线.json");
      let roadPoint = roadGrid.features[0].geometry.coordinates;

      this.getPathPoint(roadPoint, x, y);
    },

    /**
     * 将路线整理成可移动的点
     * return []  返回路径点数组
     */
    getPathPoint(data, x, y) {
      let point = [];
      var material = new THREE.LineBasicMaterial({
        color: 0xff3300,
      });
      data.forEach((element, index1) => {
        point.push(new THREE.Vector3(element[0] - x, 0, -(element[1] - y)));
      });
      let points = this.joinPath(point);
      this.pointMovePath = points;

      // let geometry = new THREE.BufferGeometry().setFromPoints(point);
      // var line = new THREE.Line(geometry, material);
      // this.scene.add(line);
    },

    joinPath(data) {
      let points = [];
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].x < data[i + 1].x) {
          let countNUM = Math.abs(data[i].x - data[i + 1].x);
          for (let j = 0; j < countNUM; j++) {
            points.push(new THREE.Vector3(data[i].x + j, 0, data[i].z));
          }
        } else {
          let countNUM = Math.abs(data[i].z - data[i + 1].z);
          for (let j = 0; j < countNUM; j++) {
            points.push(new THREE.Vector3(data[i].x, 0, data[i].z + j));
          }
        }
      }
      return points;
    },

    /**
     * echarts 热力图
     */
    initEcharts() {
      let _this = this;
      var canvasList = document.getElementById("container1");
      var dom = document.createElement("canvas");
      dom.width = 300;
      dom.height = 300;
      // canvasList.appendChild(dom);
      let pieChart = echarts.init(dom);
      var app = {};
      let option = null;

      var noise = _this.getNoiseHelper();

      noise.seed(Math.random());
      var data1 = this.generateData(2, -5, 5);
      var data = data1.data;
      let yData = data1.yData;
      let xData = data1.xData;
      option = {
        tooltip: {},
        xAxis: {
          type: "category",
          data: xData,
        },
        yAxis: {
          type: "category",
          data: yData,
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          realtime: false,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
        },
        series: [
          {
            name: "Gaussian",
            type: "heatmap",
            data: data,
            emphasis: {
              itemStyle: {
                borderColor: "#333",
                borderWidth: 1,
              },
            },
            progressive: 1000,
            animation: false,
          },
        ],
      };
      pieChart.setOption(option);
      pieChart.on("finished", function () {
        var infoEchart = new THREE.TextureLoader().load(pieChart.getDataURL());

        var infoEchartMaterial = new THREE.MeshBasicMaterial({
          transparent: true,
          // transparent: false,
          map: infoEchart,
          side: THREE.DoubleSide,
        });

        var echartPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(450, 300),
          infoEchartMaterial
        );
        echartPlane.position.set(0, -2, 0);
        echartPlane.rotation.x = -Math.PI / 2;
        _this.scene.add(echartPlane);
      });
    },

    createSpriteShape(data) {
      let group = new THREE.Object3D();
      let loader = new THREE.TextureLoader();
      // let map = loader.load(require("../../assets/images/threemap/bg.png"));

      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = 178;
      canvas.height = 151;
      ctx.fillStyle = "#ffffff";
      let img = new Image();
      img.src = require("@/assets/images/threemap/bg.png");
      // img = require("@/assets/images/threemap/bg.png")
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 178, 151);

        let img2 = new Image();
        img2.src = require("@/assets/images/threemap/焊装.png");
        img2.onload = function () {
          // ctx.drawImage(img2, 0, 0);

          ctx.drawImage(img2, 10, 15, 20, 20);

          ctx.font = "Bold 16px Arial";
          ctx.fillText(data.mesh.area, 40, 30);

          ctx.font = "Bold 10px Arial";
          ctx.fillText(data.mesh.area_name, 15, 60);

          ctx.fillText(data.mesh.area_id, 80, 60);

          ctx.fillText(data.mesh.area_layer, 15, 100);

          ctx.fillText(data.mesh.area_level, 100, 100);

          let texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;

          // 使用Sprite显示文字
          let material = new THREE.SpriteMaterial({ map: texture });
          let textObj = new THREE.Sprite(material);
          textObj.scale.set(178 * 0.1, 151 * 0.05, 1);
          textObj.position.set(data.x, data.y, data.z + 1);
          // textObj.position.y = 80;

          group.add(textObj);
        };
      };
      return group;
    },

    generateData: function (theta, min, max) {
      let _this = this;
      var data = [];
      var xData = [];

      var yData = [];

      for (var i = 0; i <= 200; i++) {
        for (var j = 0; j <= 100; j++) {
          // var x = (max - min) * i / 200 + min;
          // var y = (max - min) * j / 100 + min;
          data.push([
            i,
            j,
            _this.getNoiseHelper().perlin2(i / 40, j / 20) + 0.5,
          ]);
          // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
        }
        xData.push(i);
      }
      for (var j = 0; j < 100; j++) {
        yData.push(j);
      }

      return { data: data, yData: yData, xData: xData };
    },
    getNoiseHelper(global) {
      var module = {};

      function Grad(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      Grad.prototype.dot2 = function (x, y) {
        return this.x * x + this.y * y;
      };

      Grad.prototype.dot3 = function (x, y, z) {
        return this.x * x + this.y * y + this.z * z;
      };

      var grad3 = [
        new Grad(1, 1, 0),
        new Grad(-1, 1, 0),
        new Grad(1, -1, 0),
        new Grad(-1, -1, 0),
        new Grad(1, 0, 1),
        new Grad(-1, 0, 1),
        new Grad(1, 0, -1),
        new Grad(-1, 0, -1),
        new Grad(0, 1, 1),
        new Grad(0, -1, 1),
        new Grad(0, 1, -1),
        new Grad(0, -1, -1),
      ];

      var p = [
        151,
        160,
        137,
        91,
        90,
        15,
        131,
        13,
        201,
        95,
        96,
        53,
        194,
        233,
        7,
        225,
        140,
        36,
        103,
        30,
        69,
        142,
        8,
        99,
        37,
        240,
        21,
        10,
        23,
        190,
        6,
        148,
        247,
        120,
        234,
        75,
        0,
        26,
        197,
        62,
        94,
        252,
        219,
        203,
        117,
        35,
        11,
        32,
        57,
        177,
        33,
        88,
        237,
        149,
        56,
        87,
        174,
        20,
        125,
        136,
        171,
        168,
        68,
        175,
        74,
        165,
        71,
        134,
        139,
        48,
        27,
        166,
        77,
        146,
        158,
        231,
        83,
        111,
        229,
        122,
        60,
        211,
        133,
        230,
        220,
        105,
        92,
        41,
        55,
        46,
        245,
        40,
        244,
        102,
        143,
        54,
        65,
        25,
        63,
        161,
        1,
        216,
        80,
        73,
        209,
        76,
        132,
        187,
        208,
        89,
        18,
        169,
        200,
        196,
        135,
        130,
        116,
        188,
        159,
        86,
        164,
        100,
        109,
        198,
        173,
        186,
        3,
        64,
        52,
        217,
        226,
        250,
        124,
        123,
        5,
        202,
        38,
        147,
        118,
        126,
        255,
        82,
        85,
        212,
        207,
        206,
        59,
        227,
        47,
        16,
        58,
        17,
        182,
        189,
        28,
        42,
        223,
        183,
        170,
        213,
        119,
        248,
        152,
        2,
        44,
        154,
        163,
        70,
        221,
        153,
        101,
        155,
        167,
        43,
        172,
        9,
        129,
        22,
        39,
        253,
        19,
        98,
        108,
        110,
        79,
        113,
        224,
        232,
        178,
        185,
        112,
        104,
        218,
        246,
        97,
        228,
        251,
        34,
        242,
        193,
        238,
        210,
        144,
        12,
        191,
        179,
        162,
        241,
        81,
        51,
        145,
        235,
        249,
        14,
        239,
        107,
        49,
        192,
        214,
        31,
        181,
        199,
        106,
        157,
        184,
        84,
        204,
        176,
        115,
        121,
        50,
        45,
        127,
        4,
        150,
        254,
        138,
        236,
        205,
        93,
        222,
        114,
        67,
        29,
        24,
        72,
        243,
        141,
        128,
        195,
        78,
        66,
        215,
        61,
        156,
        180,
      ];
      // To remove the need for index wrapping, double the permutation table length
      var perm = new Array(512);
      var gradP = new Array(512);

      // This isn't a very good seeding function, but it works ok. It supports 2^16
      // different seed values. Write something better if you need more seeds.
      module.seed = function (seed) {
        if (seed > 0 && seed < 1) {
          // Scale the seed out
          seed *= 65536;
        }

        seed = Math.floor(seed);
        if (seed < 256) {
          seed |= seed << 8;
        }

        for (var i = 0; i < 256; i++) {
          var v;
          if (i & 1) {
            v = p[i] ^ (seed & 255);
          } else {
            v = p[i] ^ ((seed >> 8) & 255);
          }

          perm[i] = perm[i + 256] = v;
          gradP[i] = gradP[i + 256] = grad3[v % 12];
        }
      };

      module.seed(0);

      /*
      for(var i=0; i<256; i++) {
        perm[i] = perm[i + 256] = p[i];
        gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
      }*/

      // Skewing and unskewing factors for 2, 3, and 4 dimensions
      var F2 = 0.5 * (Math.sqrt(3) - 1);
      var G2 = (3 - Math.sqrt(3)) / 6;

      var F3 = 1 / 3;
      var G3 = 1 / 6;

      // 2D simplex noise
      module.simplex2 = function (xin, yin) {
        var n0, n1, n2; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin) * F2; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var t = (i + j) * G2;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        var y0 = yin - j + t;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
          // lower triangle, XY order: (0,0)->(1,0)->(1,1)
          i1 = 1;
          j1 = 0;
        } else {
          // upper triangle, YX order: (0,0)->(0,1)->(1,1)
          i1 = 0;
          j1 = 1;
        }
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
        var y2 = y0 - 1 + 2 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        i &= 255;
        j &= 255;
        var gi0 = gradP[i + perm[j]];
        var gi1 = gradP[i + i1 + perm[j + j1]];
        var gi2 = gradP[i + 1 + perm[j + 1]];
        // Calculate the contribution from the three corners
        var t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0) {
          n0 = 0;
        } else {
          t0 *= t0;
          n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
        }
        var t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0) {
          n1 = 0;
        } else {
          t1 *= t1;
          n1 = t1 * t1 * gi1.dot2(x1, y1);
        }
        var t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0) {
          n2 = 0;
        } else {
          t2 *= t2;
          n2 = t2 * t2 * gi2.dot2(x2, y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70 * (n0 + n1 + n2);
      };

      // 3D simplex noise
      module.simplex3 = function (xin, yin, zin) {
        var n0, n1, n2, n3; // Noise contributions from the four corners

        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin + zin) * F3; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var k = Math.floor(zin + s);

        var t = (i + j + k) * G3;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        var y0 = yin - j + t;
        var z0 = zin - k + t;

        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
          if (y0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          } else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          } else {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          }
        } else {
          if (y0 < z0) {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } else if (x0 < z0) {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } else {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          }
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        var x1 = x0 - i1 + G3; // Offsets for second corner
        var y1 = y0 - j1 + G3;
        var z1 = z0 - k1 + G3;

        var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
        var y2 = y0 - j2 + 2 * G3;
        var z2 = z0 - k2 + 2 * G3;

        var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
        var y3 = y0 - 1 + 3 * G3;
        var z3 = z0 - 1 + 3 * G3;

        // Work out the hashed gradient indices of the four simplex corners
        i &= 255;
        j &= 255;
        k &= 255;
        var gi0 = gradP[i + perm[j + perm[k]]];
        var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
        var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
        var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];

        // Calculate the contribution from the four corners
        var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) {
          n0 = 0;
        } else {
          t0 *= t0;
          n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
        }
        var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) {
          n1 = 0;
        } else {
          t1 *= t1;
          n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
        }
        var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) {
          n2 = 0;
        } else {
          t2 *= t2;
          n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
        }
        var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) {
          n3 = 0;
        } else {
          t3 *= t3;
          n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 32 * (n0 + n1 + n2 + n3);
      };

      // ##### Perlin noise stuff

      function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }

      function lerp(a, b, t) {
        return (1 - t) * a + t * b;
      }

      // 2D Perlin Noise
      module.perlin2 = function (x, y) {
        // Find unit grid cell containing point
        var X = Math.floor(x),
          Y = Math.floor(y);
        // Get relative xy coordinates of point within that cell
        x = x - X;
        y = y - Y;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;

        // Calculate noise contributions from each of the four corners
        var n00 = gradP[X + perm[Y]].dot2(x, y);
        var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
        var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
        var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

        // Compute the fade curve value for x
        var u = fade(x);

        // Interpolate the four results
        return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
      };

      // 3D Perlin Noise
      module.perlin3 = function (x, y, z) {
        // Find unit grid cell containing point
        var X = Math.floor(x),
          Y = Math.floor(y),
          Z = Math.floor(z);
        // Get relative xyz coordinates of point within that cell
        x = x - X;
        y = y - Y;
        z = z - Z;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;
        Z = Z & 255;

        // Calculate noise contributions from each of the eight corners
        var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
        var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
        var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
        var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
        var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
        var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
        var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
        var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(
          x - 1,
          y - 1,
          z - 1
        );

        // Compute the fade curve value for x, y, z
        var u = fade(x);
        var v = fade(y);
        var w = fade(z);

        // Interpolate
        return lerp(
          lerp(lerp(n000, n100, u), lerp(n001, n101, u), w),
          lerp(lerp(n010, n110, u), lerp(n011, n111, u), w),
          v
        );
      };

      return module;
    },

    // 动画
    animate: function () {
      requestAnimationFrame(this.animate);
      this.stats.update();
      this.renderer.render(this.scene, this.camera);

      if (this.count == 1) {
        if (this.pointMovePath) {
          if (this.carPathPointNum == this.pointMovePath.length) {
            this.carPathPointNum = 0;
          }
          this.boxGroup.lookAt(this.pointMovePath[this.carPathPointNum++]);
          this.boxGroup.position = this.pointMovePath[this.carPathPointNum++];
          this.count = 0;
        }
      } else {
        this.count += 1;
      }

      if (this.line1) {
        this.line1.material.uniforms.dashOffset.value -= 0.01;
      }

      this.scene.children.forEach((element) => {
        if (element.modelAnimate) {
        }
      });
      // //
      // this.texture2.offset.x -= 0.01;

      // //
      // if(line3){
      //     line3.material.uniforms.dashOffset.value -= 0.01
      // }

      // texture4.offset.x -= 0.01
    },

    showHideLayer(data) {
      console.log("选择图层", data);

      this.layerArr.length > 0 &&
        this.layerArr.forEach((ele) => {
          //  let objGroup1 = this.scene.getObjectByName(ele);
          // console.log("准呗隐藏图层", ele);
          if (ele) ele.visible = false;
        });
      data.length > 0 &&
        data.forEach((ele) => {
          let objGroup = this.scene.getObjectByName(
            this.selectStore + "_" + ele
          );
          console.log("寻找图层", objGroup);
          if (objGroup) objGroup.visible = true;
        });
    },
    chooseStore(data) {
      console.log("选择库区", data);
      this.selectStore = data;
    },
  },
};
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>