<template>
  <dv-full-screen-container class="secondScreen screen_container">
    <!-- 此处留着插入3D -->
    <div class="container-3d h-100">
      <three-map-tow ref="threeMapTow"></three-map-tow>

      <div class="second_layer_choose p-absolute">
        <el-collapse-transition>
          <div>
            <el-checkbox-group v-model="checkedLayer" @change="showHid">
              <el-checkbox label="产线" ></el-checkbox>
              <el-checkbox label="工位" ></el-checkbox>
              <el-checkbox label="库区"></el-checkbox>
              <el-checkbox label="库位"></el-checkbox>
              <el-checkbox label="路网"></el-checkbox>
              <el-checkbox label="墙体"></el-checkbox>
            </el-checkbox-group>
           </div>
        </el-collapse-transition>
      </div>
   		<div class="second_storeroom_choose p-absolute">
        <el-collapse-transition>
          <div>
            <el-radio-group v-model="selectStore" @change="chooseStore">
              <el-radio label="pack" ></el-radio>
              <el-radio label="焊装" ></el-radio>
              <el-radio label="总装"></el-radio>
            </el-radio-group>
           </div>
        </el-collapse-transition>
      </div>
      <!-- ... -->
      <!-- 先模拟几个跳转第三屏的 -->
      <!-- <div class="flag flag1" title="进入收货区域" @click="goThree(0)">
      	<img :src="demoarea" alt="" class="img-fluid" width="50" />
      	<h4 class="m-0 fs_24 mt-2">收货区域</h4>
      </div> -->

      <!-- <div class="flag flag2" title="进入小件SPS区域" @click="goThree(1)">
      	<img :src="demoarea" alt="" class="img-fluid" width="50"/>
      	<h4 class="m-0 fs_24 mt-2">小件SPS区域</h4>
      </div> -->

      <div class="flag flag3" title="进入人员画像" @click="goThree(2)">
      	<img :src="demoperson" alt="" class="img-fluid" width="35"/>
      	<h4 class="m-0 fs_18 mt-2">杨帆</h4>
      </div>

      <!-- <div class="flag flag4" title="进入车辆画像" @click="goThree(3)">
      	<img :src="democar" alt="" class="img-fluid" width="35"/>
      	<h4 class="m-0 fs_18 mt-2">叉车</h4>
      </div> -->
    </div>

    <!-- 头部header -->
    <Header class="p-absolute" :title="title" :subtitle="'Real-time status of welding workshop'"></Header>

    <!-- 左上 -->
    <div class="second_top_left p-absolute">
      <!-- nav -->
      <ul class="navMenu d-flex align-items-center">
        <template v-for="(nav,index) in navMenu" >
          <li :class="['mr-2', isActiveNav == nav.id ?'text-yellow':'text-primary']"  @click="navClick(nav.id)">
            <div class="d-flex align-items-center">
              <span class="fs_18 mr-1">{{nav.title}}</span>
              <img :src="isActiveNav == nav.id ? nav.iconActive:nav.icon" alt="" width="26"/>
            </div>
          </li>
        </template>
      </ul>
      <!-- 不同的功能 切换 -->
      <div class="check_box d-flex mt-4">
        <div class="btn_check mr-3">
          <i :class="['fs_26',checkShow?'xuan el-icon-close text-white':'el-icon-more']" @click="checkShow = !checkShow"></i>
        </div>
        <el-collapse-transition>
          <div v-show="checkShow">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="热力图"></el-checkbox>
              <el-checkbox label="基站"></el-checkbox>
              <el-checkbox label="物流门"></el-checkbox>
              <el-checkbox label="车辆"></el-checkbox>
              <el-checkbox label="人员"></el-checkbox>
              <el-checkbox label="任务单"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-collapse-transition>
      </div>
    </div>

    <transition-group name="el-fade-in-linear">
      <secondHome v-if="isHome" :key="0"></secondHome>
      <secondPerson v-if="isPerson" :key="1"></secondPerson>
      <secondCar v-if="isCar" :key="2"></secondCar>
      <secondTask v-if="isTask" :key="3"></secondTask>
    </transition-group>

  </dv-full-screen-container>
</template>

<script>
import Header from "@/components/Header";
import MyEchart from "@/components/Charts/BaseEchartsGraph";

import secondHome from "@/views/secondHome";
import secondPerson from "@/views/secondPerson";
import secondCar from "@/views/secondCar";
import secondTask from "@/views/secondTask";
import threeMapTow from "@/components/3dMap/3dmap";

export default {
  components: {
    Header,
    MyEchart,
    secondHome,
    secondPerson,
    secondCar,
    secondTask,
    threeMapTow,
  },
  name: "secondScreen",
  data() {
    return {
      title:"焊装车间实时状况数据监测管理平台",
      // websockt 心跳数据
      ws_data:{"type":"10", "addr":"" , "data":"" , "category":"", "dashboard_no":"02"},
      // websockt 2屏条件数据
      ws_condition_data:{"type":"11", "addr":"" , "data":"" , "category":"", "dashboard_no":"02"},
      // websockt 3屏条件数据
      ws_third_condition_data:{"type":"11", "addr":"" , "data":"" , "category":"", "dashboard_no":"03"},
      navMenu: [
        {
          id: "0",
          icon: require("../assets/images/nav_home.png"),
          iconActive: require("@/assets/images/nav_home_active.png"),
          title: "主页",
        },
        {
          id: "1",
          icon: require("@/assets/images/nav_person.png"),
          iconActive: require("@/assets/images/nav_person_active.png"),
          title: "人员组织架构",
        },
        {
          id: "2",
          icon: require("@/assets/images/nav_car.png"),
          iconActive: require("@/assets/images/nav_car_active.png"),
          title: "车辆使用情况",
        },
        {
          id: "3",
          icon: require("@/assets/images/nav_task.png"),
          iconActive: require("@/assets/images/nav_task_active.png"),
          title: "任务单执行情况",
        },
      ],
      isActiveNav: "0", // 此时高亮的nav,0:主页；1:人员；2:车辆；3:任务
      isHome: true,
      isPerson: false,
      isCar: false,
      isTask: false,

      nodePersonId: "",
      demoperson: require("@/assets/images/person.png"),
      democar: require("@/assets/images/fork.png"),
      demoarea: require("@/assets/images/flag.png"),

      receiveObj: {}, // 接收第一屏发来的mapClick后的数据
      checkList: ["选中且禁用", "复选框 A"],
  	  checkShow: false,
  	  checkedLayer:[],
  	  selectStore:"焊装"
    };
  },
  created() {

  },
 mounted() {
     this.receiveObj = this.$cookie.get("mapClickObj");
     this.global_addr=this.$route.params.addr;
     this.ws_data.addr=this.global_addr;
     this.ws_condition_data.addr=this.global_addr;
     this.ws_third_condition_data.addr=this.global_addr;

     this.initWebSocket();
     //console.log(this.$cookie.get("mapClickObj"),'aaaa');
   },

   destroyed() {
     this.isWebsocketFlag=false;
     this.websock.close();
     clearTimeout(this.timer);
     clearTimeout(this.timeoutObj);
   },
  methods: {
  	chooseStore(event){
  		this.$refs.threeMapTow.chooseStore(event);
  	},
    showHid(event) {
      this.$refs.threeMapTow.showHideLayer(event);
    },
    navClick(index) {
      this.isActiveNav = index;
      this.navContent(this.isActiveNav);
    },
    // 内容显隐
    navContent(nav) {


      if (nav == 0) {
        // 主页
        this.isHome = true;
        this.isPerson = false;
        this.isCar = false;
        this.isTask = false;
      }else if (nav == 1) {
        // 人员
        this.isHome = false;
        this.isPerson = true;
        this.isCar = false;
        this.isTask = false;
      } else if (nav == 2) {
        // 车辆
        this.isHome = false;
        this.isPerson = false;
        this.isCar = true;
        this.isTask = false;
      } else if (nav == 3) {
        // 任务
        this.isHome = false;
        this.isPerson = false;
        this.isCar = false;
        this.isTask = true;
      }

      // 改变条件
      this.ws_condition_data.category="01";
      this.ws_condition_data.data="0"+nav;
      this.websock.send(JSON.stringify(this.ws_condition_data));
    },

    //初始化weosocket
         initWebSocket() {
           try {
             this.websock = new WebSocket(this.GLOBAL.serverWSURL+"/all_Dashboard");
             this.websock.onmessage = this.websocketonmessage;
             this.websock.onopen = this.websocketonopen;
             this.websock.onerror = this.websocketonerror;
             this.websock.onclose = this.websocketclose;
           }catch (e) {
             console.log('尝试创建连接失败');
             //如果无法连接上webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
             this.reConnect();
           }
         },
         //重新连接websocket
         reConnect() {
           let _this = this;
           //如果已经连上就不在重连了
           if (_this.isConnect) return;
           if (!_this.isWebsocketFlag) return;
           console.log(this.GLOBAL.serverWSURL+"/all_Dashboard连接websocket失败，尝试重连");
           clearTimeout(_this.timer);
           _this.timer = setTimeout(function () {
             _this.initWebSocket();
           }, 3000);
         },

         //建立链接后初始化
         websocketonopen() {
           console.log("连接服务器成功");
           //连接建立后修改标识
           this.isConnect = true;
           let typeJsonStr = JSON.stringify(this.ws_data);
           this.websock.send(typeJsonStr);

           // 默认显示主页
           this.ws_condition_data.category="00";
           this.ws_condition_data.data="0"+nav;
           this.websock.send(JSON.stringify(this.ws_condition_data));

           // 建立连接后开始心跳
           this.heartCheckStart();
         },

         //连接建立失败重连
         websocketonerror() {
           //连接断开后修改标识
           this.isConnect = false;
           //连接建立失败重连
           this.reConnect();
         },

         //服务器数据接受处理
         websocketonmessage(e) {
           console.log(e.data);
           const reData = JSON.parse(e.data);
           console.log(reData.code)
           if (reData.code != null && reData.code == '0') {
             console.log(reData.msg)
           }
           if (reData.code != null && reData.code == '00') {
             var title_str="";
             if(reData.data=='X001'){title_str="焊装"}
             if(reData.data=='X002'){title_str="总装"}
             if(reData.data=='X003'){title_str="PACK"}
             this.title=title_str+"车间实时状况数据监测管理平台";
           }

           //获取消息后 重置心跳
           this.heartCheckReset()
         },

         //数据发送
         websocketsend(Data) {
           this.websock.send(Data);
         },

         //监听socket关闭
         websocketclose(e) {
           console.log('断开连接', e);
           this.isConnect = false;
           let _this = this;

           this.reConnect();
         },

         // 定时心跳检测
         heartCheckStart() {
          let _this = this;
          clearTimeout(_this.timeoutObj );
           _this.timeoutObj = setTimeout(function () {
             if (_this.isConnect) _this.websock.send(JSON.stringify(_this.ws_data));
           }, 20000);
         },

         heartCheckReset() {
           clearTimeout(this.timeoutObj);
           this.heartCheckStart();
         },

         // 改变3级页面查询条件
         changeThirdConditionData(_data,_category){
           this.ws_third_condition_data.category=_category;
           this.ws_third_condition_data.data=_data;
           this.websock.send(JSON.stringify(_this.ws_third_condition_data));
         },
          // 进入第三屏
          goThree(type) {
            this.$router.push({
              path: "/thrid",
              query: {
                type: type, // 0：收货区域；1：sps拣选；2:人员画像；3：车辆画像
              },
            });
          },
  },
};
</script>

<style>
.flag {
  position: absolute;
  text-align: center;
  cursor: pointer;
}
.flag1 {
  top: 45%;
  right: 55%;
}
.flag2 {
  top: 20%;
  left: 50%;
}
.flag3 {
  top: 40%;
  left: 35%;
}
.flag4 {
  top: 50%;
  right: 35%;
}
</style>
