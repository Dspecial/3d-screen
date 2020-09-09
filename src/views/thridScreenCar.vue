<template>
	<div class="thrid_container preson_container car_container">
		<!-- 头部header -->
    <Header :title="'车辆画像'" :subtitle="'Vehicle portrait'"></Header>

    <div class="pl-3 pr-3 pt-3">
      <el-row :gutter="20">
        <!-- 车辆资料 -->
        <el-col :span="12" :xs="{span: 24}">
          <div class="screen_card">
            <div class="p-3">
              <div class="content_title">
                <h4 class="fs_20 m-0 font-weight-normal">车辆资料</h4>
              </div>
              <el-row type="flex" justify="space-between" align="middle" class="mt-3">
                <el-col :span="11" :xs="{span: 24}">
                  <div class="d-flex align-items-center">
                    <el-avatar shape="square" :size="160" fit="cover" :src="device.avatarUrl"></el-avatar>
                    <div class="fs_20 ml-3 info_details">
                      <p class="m-0 mb-3 fs_30">类型: <span>{{device.type}}</span></p>
                      <p class="m-0 mb-2">所属: <span>{{device.area}}</span></p>
                      <p class="m-0 mb-2">编号: <span>{{device.numberId}}</span></p>
                    </div>
                  </div>
                </el-col>

                <el-col :span="13" :xs="{span: 24}">
                  <el-row :gutter="20">
                    <el-col :span="12" v-for="(item,index) in device.workingHours" :key="index">
                      <div class="card_card_bg pl-3 pr-3 pt-2 pb-2 d-flex align-items-center">
                        <img :src="item.img" alt="" width="44"/>
                        <div class="ml-3">
                          <h5 class="fs_28 mb-2 font-weight-normal" :style="{color:item.color}">{{item.hours}}</h5>
                          <span class="fs_16 opacity-80">{{item.title}}时间</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>

                  <div class="status_bar-parent">
                    <div class="status_bar">
                      <template v-for="(bar,index) in device.barStatus">
                        <!-- 以下 statusTime 是全局引用的方法，算时间占比的 -->
                        <span :style="{width:statusTime.getWidth(bar.startTime,bar.endTime,device.timeLines[0],device.timeLines[device.timeLines.length-1]),background:bar.statusBg,left:statusTime.getLeft(bar.startTime,device.timeLines[0],device.timeLines[device.timeLines.length-1])}"></span>
                      </template>
                    </div>

                    <el-row type="flex" justify="space-between">
                      <el-col v-if="index == 0 || index == device.timeLines.length-1" :span="2" class="status_line" v-for="(time,index) in device.timeLines" :key="index">
                        <span class="fs_20">{{time}}</span>
                      </el-col>
                    </el-row>
                  </div>

                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <!-- 电池电量 -->
        <el-col :span="6" :xs="{span: 24}">
          <div class="screen_card">
          	<div class="content_title p-3">
              <h4 class="fs_20 m-0 font-weight-normal">电池电量</h4>
            </div>
          	<my-echart :id="'battery'" :data="optionBatteryLevel" height="210px"></my-echart>
          </div>
        </el-col>
        <!-- 平均故障次数 -->
        <el-col :span="6" :xs="{span: 24}">
          <div class="screen_card">
          	<div class="content_title p-3 d-flex justify-content-between align-items-center">
              <h4 class="fs_20 m-0 font-weight-normal">平均故障次数</h4>
              <div class="dimension">
                <template v-for="(d,index) in dimension">
                  <span :class="['fs_14 mr-2',d.id == failureDimension?'text-screen2':'']" @click="failuresChange(d.id)">{{d.label}}</span>
                </template>
              </div>
            </div>
          	<my-echart :id="'failureTimes'" :data="optionFailureTimes" height="210px"></my-echart>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mt-3">
        <!-- 车辆评分 -->
        <el-col :span="12" :xs="{span: 24}">
          <div class="screen_card">
            <div class="content_title p-3">
              <h4 class="fs_20 m-0 font-weight-normal">员工能力值评分</h4>
            </div>
            <el-row>
              <el-col :span="8" :xs="{span: 24}">
                <my-echart :id="'capability'" :data="optionCapability" height="315px"></my-echart>
              </el-col>
              <el-col :span="16" :xs="{span: 24}" class="pl-3 pr-3 pb-3">
                <el-row class="mb-3">
                  <template v-for="(item,index) in capabilityName">
                    <el-col :span="4" class="text-center">
                      <img :src="item.icon" alt="" class="img-fluid" />
                      <p class="opacity-70 mt-1 fs_16 mt-1">{{item.name}}</p>
                    </el-col>
                  </template>
                </el-row>

                <el-row class="mb-3 capability-row" v-for="(item,index) in capabilityRate" :key="index">
                  <el-col :span="4" class="text-center">
                    <span class="opacity-80">{{item.name}}</span>
                  </el-col>
                  <template v-for="(rate,index) in item.rates">
                    <el-col :span="4" class="text-center">
                      <span class="opacity-80 fs_16">{{rate.value}}</span>
                    </el-col>
                  </template>
                </el-row>

                <el-row class="capability-row">
                  <el-col :span="4" class="text-center">
                    <span class="opacity-80">综合分析</span>
                  </el-col>
                  <el-col :span="20" class="text-center">
                    <span class="opacity-80 fs_14">该员工适合拣选和补货岗位，补货岗表现优异</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

          </div>
        </el-col>

        <!-- 车辆周转时间分析 -->
        <el-col :span="12">
          <div class="screen_card">
            <div class="content_title p-3 d-flex justify-content-between align-items-center">
              <h4 class="fs_20 m-0 font-weight-normal">车辆周转时间分析</h4>
              <div class="dimension">
                <template v-for="(d,index) in dimension">
                  <span :class="['fs_14 mr-2',d.id == turnoverDimension?'text-screen2':'']" @click="turnoverChange(d.id)">{{d.label}}</span>
                </template>
              </div>
            </div>
            <my-echart :id="'turnoverTime'" :data="optionTurnoverTime" height="315px"></my-echart>
          </div>
        </el-col>
      </el-row>

  		<el-row :gutter="20" class="mt-3">
        <!-- 平均利用率 -->
        <el-col :span="24" :xs="{span: 24}">
          <div class="screen_card">
            <div class="content_title p-3 d-flex justify-content-between align-items-center">
              <h4 class="fs_20 m-0 font-weight-normal">平均利用率</h4>
              <div class="dimension">
                <template v-for="(d,index) in dimension">
                  <span :class="['fs_14 mr-2',d.id == UtilizationDimension?'text-screen2':'']" @click="UtilizationChange(d.id)">{{d.label}}</span>
                </template>
              </div>
            </div>
            <my-echart :id="'utilization'" :data="optionUtilization" height="180px"></my-echart>
          </div>
        </el-col>
  		</el-row>
    </div>

	</div>
</template>

<script>
  import Header from "@/components/Header";
	import MyEchart from "@/components/Charts/BaseEchartsGraph"
	import echartsLiquidfill from 'echarts-liquidfill' //在这里引入水球图
	export default {
		name: 'thridScreenCar',
		inject:['reload'],
		data () {
			return {
				// 车辆信息
				device: {
          avatarUrl: require('@/assets/images/avatar_car.jpg'),
          type: '叉车',
          area: '收货区',
          numberId: '215001',
          workingHours: [{
              hours: '7小时30分',
              title: '运行',
              color: '#00FFFF',
              img:require('@/assets/images/on.png'),
            },
            {
              hours: '3小时30分',
              title: '闲置',
              color: '#FEC006',
              img:require('@/assets/images/off.png'),
            },
          ],
          timeLines: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
            '19:00', '20:00'
          ],
          barStatus: [
	          {
	          	startTime:"08:00",
	          	endTime:"10:25",
	          	statusBg:"linear-gradient(0deg, #0570E9 0%, #0ECFF8 100%)",
	          },
	          {
	          	startTime:"10:25",
	          	endTime:"12:00",
	          	statusBg:"linear-gradient(0deg, #FE643B 0%, #FFA38B 98%)",
	          },
	          {
	          	startTime:"12:00",
	          	endTime:"13:25",
	          	statusBg:"linear-gradient(0deg, #0570E9 0%, #0ECFF8 100%)",
	          },
	          {
	          	startTime:"13:00",
	          	endTime:"15:00",
	          	statusBg:"linear-gradient(0deg, #0570E9 0%, #0ECFF8 100%)",
	          },
	          {
	          	startTime:"15:00",
	          	endTime:"19:00",
	          	statusBg:"linear-gradient(0deg, #FE643B 0%, #FFA38B 98%)",
	          },
	          {
	          	startTime:"19:00",
	          	endTime:"20:00",
	          	statusBg:"linear-gradient(0deg, #0570E9 0%, #0ECFF8 100%)",
	          }
          ],
        },
        // 电池电量-图表-水球图
        optionBatteryLevel: {
          series: [{
            type: 'liquidFill', //类型
            name: '电量剩余',
            data: [0.65], //数据是个数组 数组的每一项的值是0-1
            label: {
              position: ['50%', '60%'],
              align: 'center',
              baseline: 'middle',
              normal: {
                textStyle: {
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 34,
                  fontWeight: 'normal',
                }
              },
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 2, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#333fff', //边框的颜色
                borderWidth: 2, //边框的宽度
              }
            },
            backgroundStyle: {
              color: 'rgba(255,255,255,0)', //图表的背景颜色
            },
            itemStyle: {
              opacity: 0.8, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#7D85FF' //阴影颜色
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },
            shape: 'circle',
            center: ['50%', '50%'],
            radius: '75%',
          }],
        },
        // 切换维度
        dimension:[
          {
            id:0,
            label:"时",
          },
          {
            id:1,
            label:"天",
          },
          {
            id:2,
            label:"月",
          },
          {
            id:3,
            label:"年",
          },
        ],
        failureDimension:1,// 故障次数当前选中的维度：天
        turnoverDimension:1, // 车辆周转时间分析当前选中的维度：天
        UtilizationDimension:1, // 平均利用率当前选中的维度：天

        // 故障次数-图表
        optionFailureTimes: {
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var html = params[0].axisValue + '<br/>';
              for (var i = 0; i < params.length; i++) {
                html = html + params[i].marker + params[i].seriesName + ' : ' + params[i].value + ' 次' + '<br/>'
              }
              return html
            },
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            top: '12%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // name: '日期',
            data: ['09.01', '09.02', '09.03', '09.04', '09.05', '09.06', '09.07'],
            axisLabel: {
              show: true,
              textStyle: {
                fontSize : 15      //更改坐标轴文字大小
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                fontSize : 16      //更改坐标轴文字大小
              },
              formatter: '{value}次'
            },
          },
          series: [{
            name: '故障次数',
            data: [3.5, 5.2, 4, 4.5, 3, 3.7, 4],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(255, 216, 1, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 216, 1, 0.5)',
                }, {
                  offset: 1,
                  color: 'rgba(2, 13, 50, 0)'
                }]),
              },
            },
            symbolSize: 0,
            //最大最小值的配置
            // markPoint: {
            //   data: [{
            //       type: 'max',
            //       name: '最大值'
            //     },
            //     {
            //       type: 'min',
            //       name: '最小值'
            //     }
            //   ]
            // },
          }]
        },

        // 车辆评分-图表
        optionCapability: {
          color: ["rgba(255, 175, 0, 0.6)", "rgba(29, 103, 255, 0.6)"],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            data: ['车辆', '整体'],
            left: '10', 
            orient: 'vertical',
            icon:'roundRect',
            itemHeight: 10,
            itemWidth: 15,
          },
          radar: {
            center: ['50%', '55%'],
            radius: "50%",
            splitNumber: 5, // 雷达图圈数设置
            name: {
              textStyle: {
                color: '#fff',
                lineHeight: 0,
                fontSize:16,
              }
            },
            indicator: [{
                name: '订单数',
                max: 200
              },
              {
                name: '故障率',
                max: 100
              },
              {
                name: '利用率',
                max: 100
              },
              {
                name: '周转时间',
                max: 200
              },
              {
                name: '闲置时间',
                max: 200
              }
            ],
            axisLine: { // 坐标轴线
              show: false // 默认显示，属性show控制显示与否
            },
            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
              show: false,
              textStyle: {
                color: '#247bd7' // 坐标轴刻度文字的样式
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(255,255,255,0)"] // 图表背景网格的颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(56, 154, 255, 1)' // 图表背景网格线的颜色
              }
            }
          },
          series: [{
            name: '车辆vs整体',
            type: 'radar',
            areaStyle: {
             normal: {}
            },
            symbol: 'circle', //拐点样式
            symbolSize: 5, // 拐点的大小
            data: [{
                value: [131, 5, 95, 130, 54],
                name: '车辆',
                //拐点样式
              },
              {
                value: [96, 15, 32, 120, 25],
                name: '整体'
              }
            ]
          }]
        },
        // 车辆评分类型
        capabilityName: [
          {
            name: '',
            icon: '',
          },
          {
            name: '处理订单数',
            icon: require("@/assets/images/capability2-1.png"),
          },
          {
            name: '车辆故障率',
            icon: require("@/assets/images/capability2-2.png"),
          },
          {
            name: '车辆利用率',
            icon: require("@/assets/images/capability2-3.png"),
          },
          {
            name: '周转时间',
            icon: require("@/assets/images/capability2-4.png"),
          },
          {
            name: '闲置时间',
            icon: require("@/assets/images/capability2-5.png"),
          },
        ],
        // 车辆评分
        capabilityRate: [
          {
            name: '车辆1',
            dot: '#333FFF',
            rates: [{
                label: 'order', // 处理订单数
                value: '231单'
              },
              {
                label: 'fault', // 车辆故障率
                value: '5%'
              },
              {
                label: 'use', // 车辆利用率
                value: '95%'
              },
              {
                label: 'turnover', // 周转时间
                value: '251min'
              },
              {
                label: 'unuse', // 闲置时间
                value: '22min'
              },
            ]
          },
          {
            name: '整体',
            dot: '#F4DF58',
            rates: [{
                label: 'order', // 处理订单数
                value: '131单'
              },
              {
                label: 'fault', // 车辆故障率
                value: '30%'
              },
              {
                label: 'use', // 车辆利用率
                value: '70%'
              },
              {
                label: 'turnover', // 周转时间
                value: '151min'
              },
              {
                label: 'unuse', // 闲置时间
                value: '132min'
              },
            ]
          },
          {
            name: '车辆评分',
            rates: [{
                label: 'order', // 处理订单数
                value: '评分A'
              },
              {
                label: 'fault', // 车辆故障率
                value: '评分A'
              },
              {
                label: 'use', // 车辆利用率
                value: '评分A'
              },
              {
                label: 'turnover', // 周转时间
                value: '评分A'
              },
              {
                label: 'unuse', // 闲置时间
                value: '评分A'
              },
            ]
          },
        ],

        // 车辆周转时间分析-图表
        optionTurnoverTime: {
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var html = params[0].axisValue + '<br/>';
              for (var i = 0; i < params.length; i++) {
                html = html + params[i].marker + params[i].seriesName + ' : ' + params[i].value + ' min' + '<br/>'
              }
              return html
            },
          },
          grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            top: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name: '日期',
            data: ['09.01', '09.02', '09.03', '09.04', '09.05', '09.06', '09.07'],
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}min'
            }
          },
          series: [{
            name: '周转时间',
            data: [20,30,50,82,65,20,62],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(51, 63, 255, 1)',
              },
              emphasis: {
                color: 'rgba(51, 63, 255, 1)',
                borderWidth: 2,
                borderColor: '#fff'
              } //***这个字段就是控制鼠标悬浮在圆点上面让整个圆填充满背景色，也可以更改边框颜色等！***
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(51, 63, 255, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 0, 0, 0.05)'
                }]),
              },
            },
            symbol: 'emptyCircle',
            symbolSize: 8,
          }]
        },
        // 平均利用率-图表
        optionUtilization: {
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var html = params[0].axisValue + '<br/>';
              for (var i = 0; i < params.length; i++) {
                html = html + params[i].marker + params[i].seriesName + ' : ' + params[i].value + ' %' + '<br/>'
              }
              return html
            },
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            top: '15%',
            containLabel: true
          },
          legend: {
            data: ['平均利用率','车辆利用率'],
            top: '0', 
            icon:'circle',
            itemHeight: 12,
          },
          xAxis: {
            type: 'category',
            name: '日期',
            data: ['08-20','08-21','08-22','08-23','08-24','08-25','08-26','08-27','08-28','08-29','08-30','08-31','09-01','09-02','09-03'],
            axisLabel: {
              show: true,
              textStyle: {
                fontSize : 16      //更改坐标轴文字大小
              }
            },
          },
          yAxis: {
            type: 'value',
            // name: '百分比',
            axisLabel: {
              formatter: '{value}%',
              fontSize:16,
            }
          },
          series: [{
            name: '平均利用率',
            type: 'line',
            symbolSize: 0,
            data: [89,63,69,78,85,93,67,78,88,89,90,95,65,43,96],
            itemStyle: {
              normal: {
                color: 'rgba(255, 36, 0, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 36, 0, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(2, 13, 50, 0)'
                }]),
              },
            },
          },
          {
            name: '车辆利用率',
            type: 'line',
            symbolSize: 0,
            data: [88,89,90,95,65,43,96,36,58,65,80,85,93,67,78],
            itemStyle: {
              normal: {
                color: 'rgba(50, 122, 255, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(50, 122, 255, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(159, 88, 255, 0)'
                }]),
              },
            },
            //平均值的配置
            markLine: {
              type: 'line',
              data: [{
                type: 'average',
                name: '平均值'
              }, ],
            },
          }]
        },
			}
		},
		components: {
      Header,
			MyEchart,
		},
		methods:{
			thridHome(){
				var carArea = "1";
				this.$router.push({
          path: "/thrid",
          query: {
          	type: carArea,// 0：收货区域；1：sps拣选；2:人员画像；3：车辆画像
          }
        })
        this.reload();
			},

      // 故障次数切换维度
      failuresChange(index){
        this.failuresDimension = index;
        console.log(this.failuresDimension,'故障次数');
      },

      // 车辆周转时间分析切换维度
      turnoverChange(index){
        this.turnoverDimension = index;
        console.log(this.turnoverDimension,'车辆周转时间分析');
      },

      // 平均利用率切换维度
      UtilizationChange(index){
        this.UtilizationDimension = index;
        console.log(this.UtilizationDimension,'平均利用率');
      },
		},
	}
</script>

<style>
</style>