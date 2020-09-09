<template>
  <div>
    <div id="container1"></div>
  </div>
</template>

<script>
// import * as THREE from "three";
import * as THREE from "@/assets/js/build/three.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import util from "../../assets/js/mapModel/util";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
// import { FBXLoader } from '@/assets/js/mapModel/FBXLoader.js';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import turf from "turf";
// import { jsonData } from "@/assets/json/data.json";
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      modelarr: new THREE.Object3D(),
      mouse: new THREE.Vector2(),
      selectObject: [],
      stats: null,
      mouseX: 0,
      mouseY: 0,
      weldingarr: [],
      finalAssembly: [],
      otherRoom: [],
      pack: [],
      xData: [],
      yData: [],
      container: null,
      modelPath: "../../../static/dae/changqu.fbx",
      jsondata: {
        type: "FeatureCollection",
        name: "xiaopeng",
        crs: {
          type: "name",
          properties: { name: "urn:ogc:def:crs:EPSG::900913" },
        },
        features: [
          {
            type: "Feature",
            properties: {
              fid: 1,
              handle: 136,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12556931.36587299965322, 2670908.300397, 0.0],
                [12556914.197399999946, 2670907.650104, 0.0],
                [12556914.048109, 2670914.803331, 0.0],
                [12556858.063957, 2670913.34017099998891, 0.0],
                [12556858.661121, 2670860.34134199982509, 0.0],
                [12557039.900481, 2670860.6664869999513, 0.0],
                [12557041.99055599980056, 2670744.915047, 0.0],
                [12557398.49763399921358, 2670741.988758, 0.0],
                [12557396.706141, 2670916.266491, 0.0],
                [12557171.873788, 2670918.217372, 0.0],
                [12557171.575206, 2670907.812677, 0.0],
                [12557084.687803, 2670905.048931, 0.0],
                [12557084.389221, 2670915.616198, 0.0],
                [12557064.682799, 2670915.29105099989101, 0.0],
                [12557028.405069, 2670914.640757, 0.0],
                [12557027.957196, 2670920.16825299989432, 0.0],
                [12556999.29331, 2670919.355386, 0.0],
                [12556998.39756399951875, 2670914.965904, 0.0],
                [12556964.956364, 2670913.50274399993941, 0.0],
                [12556964.657782, 2670918.54251899989322, 0.0],
                [12556931.813746, 2670918.867666, 0.0],
                [12556931.813746, 2670914.965904, 0.0],
                [12556931.36587299965322, 2670908.300397, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 2,
              handle: 137,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557271.00305899977684, 2670919.843106, 0.0],
                [12557271.00305899977684, 2670939.378824524115771, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 3,
              handle: 138,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12556800.139022, 2671152.649937, 0.0],
                [12556800.139022, 2671194.919695, 0.0],
                [12556944.65277799963951, 2671194.919695, 0.0],
                [12556944.65277799963951, 2671152.649937, 0.0],
                [12556800.139022, 2671152.649937, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 4,
              handle: 139,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12556868.812914, 2670932.198692, 0.0],
                [12556868.812914, 2671032.34431099984795, 0.0],
                [12556944.055614, 2671032.34431099984795, 0.0],
                [12556944.055614, 2670932.198692, 0.0],
                [12556868.812914, 2670932.198692, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 5,
              handle: 221,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557326.837919998914, 2671265.47792199999094, 0.0],
                [12557326.539338, 2671240.4410959999077, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 6,
              handle: 224,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557326.837919998914, 2671265.47792199999094, 0.0],
                [12557395.810394, 2671266.453383, 0.0],
                [12557397.303305, 2671339.93832099996507, 0.0],
                [12557322.35918799974024, 2671341.889254, 0.0],
                [12557321.463441, 2671324.33087299996987, 0.0],
                [12557233.083127, 2671322.7050979998894, 0.0],
                [12557232.48596299998462, 2671340.26347699994221, 0.0],
                [12557142.9113199990243, 2671341.889254, 0.0],
                [12557140.82124499976635, 2671265.80307599995285, 0.0],
                [12557326.837919998914, 2671265.47792199999094, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 7,
              handle: 226,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557343.55852, 2671240.4410959999077, 0.0],
                [12557343.264795595780015, 2671265.71024332428351, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 8,
              handle: 227,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557255.476788, 2671061.932909, 0.0],
                [12557253.6852949988097, 2671035.920952, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 9,
              handle: 229,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557271.00305899977684, 2671035.725706643890589, 0.0],
                [12557271.00305899977684, 2671061.627070808783174, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 10,
              handle: 230,
              block: -1,
              etype: 25,
              space: 0,
              layer: "111",
              olinetype: "bylayer",
              linetype: "",
              color: "255,0,0,255",
              ocolor: 1,
              color24: -1,
              transparency: 0,
              lweight: 0,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557255.476788, 2670939.02678199997172, 0.0],
                [12557255.476788, 2670919.843106, 0.0],
                [12557271.00305899977684, 2670919.843106, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 11,
              handle: 239,
              block: -1,
              etype: 25,
              space: 0,
              layer: "0",
              olinetype: "bylayer",
              linetype: "",
              color: "0,0,0,119",
              ocolor: 256,
              color24: -1,
              transparency: 0,
              lweight: -1,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12557326.539338, 2671240.4410959999077, 0.0],
                [12556813.57521799951792, 2671238.16502299997956, 0.0],
                [12556813.57521799951792, 2671204.999423, 0.0],
                [12556967.04643899947405, 2671206.300033, 0.0],
                [12556965.85211, 2671063.233508, 0.0],
                [12557398.199052, 2671060.957459999714, 0.0],
                [12557399.09479799866676, 2671239.140483, 0.0],
                [12557326.539338, 2671240.4410959999077, 0.0],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              fid: 12,
              handle: 240,
              block: -1,
              etype: 25,
              space: 0,
              layer: "0",
              olinetype: "bylayer",
              linetype: "",
              color: "0,0,0,119",
              ocolor: 256,
              color24: -1,
              transparency: 0,
              lweight: -1,
              linewidth: 0.0,
              ltscale: 1.0,
              visible: 1,
              width: 0.0,
              thickness: 0.0,
              ext: "(3:0,0,1)",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [12556964.06061699986458, 2671034.62035499978811, 0.0],
                [12556964.657782, 2670938.051341, 0.0],
                [12557271.00305899977684, 2670938.051341, 0.0],
                [12557271.00305899977684, 2671035.178602067288011, 0.0],
                [12556964.06061699986458, 2671034.62035499978811, 0.0],
              ],
            },
          },
        ],
      },
      sendObj: {
        name: "我是从全局地图传递过来的对象",
      },
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
      let container = document.getElementById("container1");
      this.scene = new THREE.Scene();
      window.scene = this.scene;

      /**
       * 相机设置
       */
      this.creatCamera(container);
      this.creatLight();

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.autoClear = false;
      container.appendChild(this.renderer.domElement);

      this.stats = new Stats();
      container.appendChild(this.stats.dom);

      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.maxZoom = 30;
      // this.controls.minZoom = 80;
      // this.controls.enablePan = false;
      // this.controls.enableRotate = false;

      container.addEventListener("click", this.onDocumentMouseClick, false);
      container.addEventListener("mousemove", this.onDocumentMouseMove, false);
      this.container = container;
      this.scene.add(this.modelarr);
      // this.creatbox(12557140.2, 2671038);
      this.addDAEMOdel("C4D-changqu-0902");
       this.row11(0,0,10,10,5);
    },
     row11(x0,y0,x1,y1,x) {
       let y = y0 +  ((y1-y0/x1-x0)*(x-x0))
       console.log('7788',y);
    },

    creatCamera: function (container) {
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100000
      );

      /**
       * 正交相机
       */
      // this.camera = new THREE.OrthographicCamera(
      //   container.clientWidth / -2,
      //   container.clientWidth / 2,
      //   container.clientHeight / 2,
      //   container.clientHeight / -2,
      //   0.1,
      //   10000
      // );

      //之前位置
      this.camera.position.x = 201;
      this.camera.position.y = 603;
      this.camera.position.z = 569;
      this.scene.add(this.camera);
    },
    /**
     * 添加灯光
     */
    creatLight: function () {
      var light = new THREE.AmbientLight(0xffffff); // soft white light
      this.scene.add(light);

      let light_one = new THREE.DirectionalLight(0xffffff);
      light_one.position.set(-200, 300, -300);
      this.scene.add(light_one);
      var helper = new THREE.DirectionalLightHelper(light_one, 30);
      // scene.add(helper);
      let light_two = new THREE.DirectionalLight(0xffffff);
      light_two.position.set(500, 500, 500);
      this.scene.add(light_two);
    },
    onDocumentMouseClick: function (even) {
      event.preventDefault();

      this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      console.log("intersects", intersects[0], intersects[0].object.name);
      // 发送数据
      this.sendObjFun();
      if (intersects.length > 0) {
       if (util.Welding.includes(intersects[0].object.name)) {
		 //焊装
		 this.clearSelect();
		 this.selectColor(this.weldingarr, true);
		  // sonriku mark:前期写死，后期与服务端保持编号一致
		  this.$emit('changeSecondScreendata', 'X001');
	   } else if (util.FinalAssembly.includes(intersects[0].object.name)) {
		 //总装
		 this.clearSelect();
		 this.selectColor(this.finalAssembly, true);
		 this.$emit('changeSecondScreendata', 'X002');
	   } else if (util.Pack.includes(intersects[0].object.name)) {
		 //pack
		 this.clearSelect();
		 this.selectColor(this.pack, true);
		 this.$emit('changeSecondScreendata', 'X003');
	   } else if (util.OtherRoom.includes(intersects[0].object.name)) {
		 //
		 this.clearSelect();
		 this.selectColor(this.otherRoom, true);
	   } else {
		 this.clearSelect();
	   }


        if (this.selectObject)
          if (this.selectObject.modeltype === "gemo") {
            // this.selectObject.material.color.set(this.selectObject.color);
            // this.selectObject = intersects[0].object;
            // this.selectObject.material.color.set(0xffffff);
          }
      } else {
      }
    },

    sendMsgToFirstScreen(data){
      console.log('dianjile');
          this.$emit("clickroom",data);
    },

    createSpriteShape(data) {
      let group = new THREE.Object3D();
      let loader = new THREE.TextureLoader();
      let map = loader.load(require("../../assets/images/threemap/bg.png"));

      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      // canvas.width = 256 * 10
      // canvas.height =512 * 10
      ctx.fillStyle = "#ffffff";
      let img = new Image();
      img.src = require("@/assets/images/threemap/bg.png");
      img.onload = function () {

        // 使用
        // ctx.fillStyle = pattern;
        // context.fillRect(0,0,300,300);
        // ctx.drawImage(img, 0, 0, 256, 125);

        ctx.drawImage(img, 0, 0, 278, 151);

        // let img2 = new Image();
        // img2.src = require("@/assets/images/threemap/焊装.png");
        // img2.onload = function () {
        img.src = require("@/assets/images/threemap/焊装.png");
        img.onload = function () {
          ctx.drawImage(img, 10, 15, 20, 20);

          ctx.font = "Bold 16px Arial"; 
          ctx.fillText(data.name, 20, 10);

          ctx.font = "Bold 10px Arial";
          ctx.fillText(data.num, 15, 60);

          ctx.fillText(data.goods, 80, 60);

          ctx.fillText(data.effectiveness, 15, 100);

          ctx.fillText(data.status, 100, 100);

          let texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;

          //使用Sprite显示文字
          let material = new THREE.SpriteMaterial({
            transparent:true,
            opacity:0.8,
            map: texture,
            sizeAttenuation:false,
            alphaTest : 0.1
          });
          let textObj = new THREE.Sprite(material);
          // textObj.center(0.5,0.5);
          // textObj.scale.set(512 * 0.5, 256 * 0.5, 1);
          textObj.scale.set(512 * 0.0005, 256 * 0.0005, 1);
          textObj.position.set(data.x, data.y, data.z + 1);
          group.add(textObj);
        };
      };
      return group;
    },
    generateSprite(text, style) {
      var canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 300;

      var context = canvas.getContext("2d");
      context.beginPath();
      context.font = "50px Microsoft YaHei";
      context.fillStyle = style;
      context.fillText("565464", 0, 30);
      context.fill();
      context.stroke();
      return canvas;
    },

    /**
     * todo：清除上次选中
     */
    clearSelect() {
      if (this.selectObject.length > 0) {
        this.selectColor(this.selectObject, false);
      }
    },
    /**
     * todo: 选中取消选中 修改颜色
     */
    selectColor(data, tag) {
      let color = 0xff3333;
      if (!tag) {
        color = 0x003366;
      }
      data.forEach((ele) => {
        ele.material.color.setHex(color);
      });

      this.selectObject = [];
      this.selectObject = data;
    },

    onDocumentMouseMove: function (event) {
      this.mouseX = event.clientX - window.innerWidth / 2;
      this.mouseY = event.clientY - window.innerHeight / 2;
    },

    creatbox: function (x, y) {
      let _this = this;
      let controlsPointArr = [];
      this.jsondata.features.forEach((element, index1) => {
        let data = element.geometry.coordinates;
        let rectdata = this.getrectdata(data);

        let extrudeSettings = {
          //   depth: 2,
          amount: 20,
          bevelEnabled: false,
        };
        let point = data;

        let shape = new THREE.Shape(this.getshapePoints(rectdata, x, y));
        // let color = util.getRandomColor();
        let color = 0xdedede;
        let geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        let material = new THREE.MeshLambertMaterial({
          color: color, // color: 0xffffff * Math.random(),//随机颜色
          opacity: 0.7,
          transparent: true,
          wireframe: true,
        });

        // 网格
        let mesh = new THREE.Mesh(geometry, material);
        mesh.color = color;
        mesh.isSelected = true;
        mesh.modeltype = "gemo";
        _this.modelarr.add(mesh);
      });
      _this.modelarr.rotation.x = -Math.PI / 2;
      // _this.modelarr.position.x = -12557289.8;
      _this.modelarr.position.y = 0;
      // _this.modelarr.position.z = 2671287.7;
      // _this.modelarr.scale.set(3, 3, 3);
    },

    getshapePoints: function (params, x, y) {
      let shapePoints = [];
      for (let i = 0; i < params.length - 1; i++) {
        shapePoints.push(new THREE.Vector2(params[i][0] - x, params[i][1] - y));
      }
      return shapePoints;
    },

    getrectdata: function (data) {
      let dataArr = [];
      data.forEach((element) => {
        dataArr.push([element[0], element[1]]); //* 0.0001
      });
      return dataArr;
    },
    addDAEMOdel: function (name) {
      let _this = this;
      let url = "@/assets/public/changqu.fbx";
      let material1 = new THREE.MeshPhongMaterial({
        color: 0x3b3b3b,
        opacity: 1,
        transparent: true,
        wireframe: false,
      });
      let material2 = new THREE.MeshLambertMaterial({
        color: 0x006600,
        opacity: 1,
        transparent: true,
        wireframe: false,
      });
      let roadMaterial = new THREE.MeshLambertMaterial({
        color: 0x575757,
        opacity: 1,
        transparent: true,
      });
      let streetLampMaterial = new THREE.MeshLambertMaterial({
        color: 0x999999,
        opacity: 1,
        transparent: true,
      });
      let tubeMaterial = new THREE.MeshLambertMaterial({
        color: 0x8b8b83,
        opacity: 1,
        transparent: true,
      });
      let arr = ["Cube.37"];
      let objLoader = new OBJLoader();
      // objLoader.load("../../../static/obj/C4D-changqu-08210.obj", (object) => {
        objLoader.load("../../../static/obj/C4D-changqu-0908.obj", (object) => {
        object.traverse(function (child) {
          if (child.type === "Mesh") {
            if (arr.includes(child.name)) {
              child.material = material1;
            } else if (child.name.indexOf("road") > -1) {
              child.material = roadMaterial;
            } else if (child.name.indexOf("宝石") > -1) {
              child.material = material2;
            } else if (child.name.indexOf("Sphere") > -1) {
              child.material = streetLampMaterial;
            } else if (child.name.indexOf("Tube") > -1) {
              child.material = tubeMaterial;
            } else {
              child.material = new THREE.MeshPhongMaterial({
                color: 0x003366,
                opacity: 0.7,
                transparent: true,
                alpha:1
                // wireframe: false,
              });
            }
          }

          if (util.Welding.includes(child.name)) {
            _this.weldingarr.push(child);
          } else if (util.FinalAssembly.includes(child.name)) {
            _this.finalAssembly.push(child);
          } else if (util.Pack.includes(child.name)) {
            _this.pack.push(child);
          } else if (util.OtherRoom.includes(child.name)) {
            _this.otherRoom.push(child);
          }
          // else if(){}/Cube.41
        });
        object.position.z = -150;
        _this.scene.add(object);
        _this.scene.add(
          this.createSpriteShape({
            x: 157.3,
            y: 198.8,
            z: 97.0,
            name: "焊装车间",
            num: "车间人数：20",
            goods: "总体收货量：267",
            effectiveness: "库存周转率：80%",
            status: "状态：正常",
          })
        );
        _this.scene.add(
          this.createSpriteShape({
            x: 80.8,
            y: 198.8,
            z: -210.4,
            name: "总装车间",
            num: "车间人数：30",
            goods: "总体收货量：288",
            effectiveness: "库存周转率：90%",
            status: "状态：正常",
          })
        );
        _this.scene.add(
          this.createSpriteShape({
            x: 197.3,
            y: 198.8,
            z: -340.4,
            name: "pack车间",
            num: "车间人数：40",
            goods: "总体收货量：138",
            effectiveness: "库存周转率：50%",
            status: "状态：正常",
          })
        );
      });
    },

    // 动画
    animate: function () {
      requestAnimationFrame(this.animate);
      this.stats.update();

      // this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.001; //+ -35
      // this.camera.position.y +=
      //   (-(this.mouseY - 200) - this.camera.position.y) * 0.001 ; //+ 300

      // this.camera.lookAt(this.scene.position);

      // this.renderer.setScissorTest(true);

      // this.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);

      this.renderer.render(this.scene, this.camera);

      // this.renderer.setScissorTest(false);
    },

    // 先传给firstScreen,即它的父组件
    sendObjFun() {
      this.$emit("func", this.sendObj);
    },
  },
};
</script>

<style>
#container1 {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>