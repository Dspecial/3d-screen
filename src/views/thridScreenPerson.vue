<template>
	<div class="thrid_container preson_container">
    <!-- 头部header -->
    <Header :title="'人员画像数据'" :subtitle="'Personnel portrait'"></Header>
    
    <div class="pl-3 pr-3 pt-3">
      <el-row :gutter="20">
        <!-- 员工资料 -->
        <el-col :span="12" :xs="{span: 24}">
  				<div class="screen_card">
            <div class="p-3">
              <div class="content_title">
                <h4 class="fs_20 m-0 font-weight-normal">员工资料</h4>
              </div>
    					<el-row type="flex" justify="space-between" align="middle" class="mt-3">
                <el-col :span="11" :xs="{span: 24}">
                  <div class="d-flex align-items-center">
                    <el-avatar shape="square" :size="160" fit="cover" :src="employee.avatarUrl"></el-avatar>
                    <div class="fs_20 ml-3 info_details">
                      <p class="m-0 mb-3 fs_30">姓名: <span>{{employee.name}}</span></p>
                      <p class="m-0 mb-2">性别: <span>{{employee.sex}}</span></p>
                      <p class="m-0 mb-2">工号: <span>{{employee.numberId}}</span></p>
                      <p class="m-0 mb-2">岗位: <span>{{employee.post}}</span></p>
                    </div>
                  </div>
                </el-col>

                <el-col :span="13" :xs="{span: 24}">
                  <el-row :gutter="20">
                    <el-col :span="12" v-for="(item,index) in employee.workingHours" :key="index">
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
                      <template v-for="(bar,index) in employee.barStatus">
                        <!-- 以下 statusTime 是全局引用的方法，算时间占比的 -->
                        <span :style="{width:statusTime.getWidth(bar.startTime,bar.endTime,employee.timeLines[0],employee.timeLines[employee.timeLines.length-1]),background:bar.statusBg,left:statusTime.getLeft(bar.startTime,employee.timeLines[0],employee.timeLines[employee.timeLines.length-1])}"></span>
                      </template>
                    </div>

                    <el-row type="flex" justify="space-between">
                      <el-col v-if="index == 0 || index == employee.timeLines.length-1" :span="2" class="status_line" v-for="(time,index) in employee.timeLines" :key="index">
                        <span class="fs_20">{{time}}</span>
                      </el-col>
                    </el-row>
                  </div>

                </el-col>
              </el-row>
            </div>
  				</div>
        </el-col>

        <!-- 人员效率 -->
        <el-col :span="12" :xs="{span: 24}">
          <div class="screen_card">
            <div class="content_title p-3 d-flex justify-content-between align-items-center">
              <h4 class="fs_20 m-0 font-weight-normal">人员效率</h4>
              <div class="dimension">
                <template v-for="(d,index) in dimension">
                  <span :class="['fs_14 mr-2',d.id == effDimension?'text-screen2':'']" @click="effChange(d.id)">{{d.label}}</span>
                </template>
              </div>
            </div>
          	<my-echart :id="'efficiency'" :data="optionEfficiency" height="210px"></my-echart>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mt-3">
        <!-- 员工能力值评分 -->
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
        <!-- 耗时对比分析 -->
        <el-col :span="12" :xs="{span: 24}">
  				<div class="screen_card">
            <div class="content_title p-3 d-flex justify-content-between align-items-center">
              <h4 class="fs_20 m-0 font-weight-normal">耗时对比分析</h4>
              <div class="dimension">
                <template v-for="(d,index) in dimension">
                  <span :class="['fs_14 mr-2',d.id == timeDimension?'text-screen2':'']" @click="timeChange(d.id)">{{d.label}}</span>
                </template>
              </div>
            </div>
          	<my-echart :id="'timeComparison'" :data="optionTimeComparison" height="315px"></my-echart>
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
	export default {
		name: 'thridScreenPerson',
    inject:['reload'],
    components: {
      Header,
      MyEchart,
    },
		data () {
			return {
				// 员工信息
				employee: {
          avatarUrl: require('@/assets/images/avatar.png'),
          name: '刘凡看',
          sex: '女',
          numberId: '215001',
          post: '上架',
          area: '拣选区01',
          workingHours: [{
              hours: '9小时25分',
              title: '在岗',
              color: '#00FFFF',
              img:require('@/assets/images/on.png'),
            },
            {
              hours: '2小时45分',
              title: '离岗',
              color: '#FEC006',
              img:require('@/assets/images/off.png'),
            },
          ],
          timeLines: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00','15:00', '16:00', '17:00','18:00', '19:00','20:00'],
          barStatus: [
	          {
	          	startTime:"08:00",
	          	endTime:"11:25",
	          	statusBg:"linear-gradient(0deg, #0570E9 0%, #0ECFF8 100%)",
	          },
	          {
	          	startTime:"11:25",
	          	endTime:"13:00",
	          	statusBg:"linear-gradient(0deg, #FF9A33 0%, #FFCA33 99%)",
	          },
	          {
	          	startTime:"13:00",
	          	endTime:"18:00",
	          	statusBg:"linear-gradient(0deg, #0570E9 0%, #0ECFF8 100%)",
	          },
	          {
	          	startTime:"18:00",
	          	endTime:"19:00",
	          	statusBg:"linear-gradient(0deg, #FF9A33 0%, #FFCA33 99%)",
	          },
	          {
	          	startTime:"19:00",
	          	endTime:"20:00",
	          	statusBg:"linear-gradient(0deg, #0570E9 0%, #0ECFF8 100%)",
	          }
          ],
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
        effDimension:1,// 人员效率当前选中的维度：天
        timeDimension:1, // 耗时对比分析当前选中的维度：天
        UtilizationDimension:1, // 平均利用率当前选中的维度：天

       	// 人员效率-图表
        optionEfficiency: {
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
          legend: {
            data: ['平均效率','个人效率'],
            top: '0', 
            icon:'circle',
            itemHeight: 12,
          },
          grid: {
            left: '3%',
            right: '5%',
            bottom: '8%',
            top: '18%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // name: '日期',
            data: ['08-20','08-21','08-22','08-23','08-24','08-25','08-26'],
            axisLabel: {
              show: true,
              textStyle: {
                fontSize : 16      //更改坐标轴文字大小
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%',
            },
            splitNumber:2,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize : 16      //更改坐标轴文字大小
              }
            },
          },
          series: [{
            name: '平均效率',
            data: [63,85,91,87,69,81,79],
            type: 'line',
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
            symbolSize: 0,
          },
          {
            name: '个人效率',
            data: [50,56,88,46,56,83,90],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(0, 255, 234, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 252, 255, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(2, 13, 50, 0)'
                }]),
              },
            },
            symbolSize: 0,
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
        // 员工能力值评分-图表
        optionCapability: {
          color: ["rgba(178, 69, 255, 0.6)","rgba(29, 103, 255, 0.6)"],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            data: ['个人', '整体'],
            left: '10', 
            orient: 'vertical',
            icon:'roundRect',
            itemHeight: 10,
            itemWidth: 15,
          },
          radar: {
            center: ['50%', '55%'],
            radius: "70%",
            splitNumber: 5, // 雷达图圈数设置
            name: {
              textStyle: {
                color: '#fff',
                lineHeight: 0,
                fontSize:16,
              }
            },
            indicator: [{
                name: '拣选',
                max: 5,
                min: 0
              },
              {
                name: '上架',
                max: 5,
                min: 0
              },
              {
                name: '下架',
                max: 5,
                min: 0
              },
              {
                name: '配送',
                max: 5,
                min: 0
              },
              {
                name: '补货',
                max: 5,
                min: 0
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
            name: '个人vs整体',
            type: 'radar',
            areaStyle: {
             normal: {}
            },
            symbol: 'circle', //拐点样式
            symbolSize: 5, // 拐点的大小
            data: [{
                value: [3.5, 2.8, 3, 3.5, 4, 4.5],
                name: '个人',
                //拐点样式
              },
              {
                value: [0, 4, 4, 3.9, 4.1, 5],
                name: '整体'
              }
            ]
          }]
        },
        // 员工能力值类型
        capabilityName: [
          {
            name: '',
            icon: '',
            color: ''
          },
          {
            name: '拣选',
            icon: require("@/assets/images/capability1.png"),
          },
          {
            name: '上架',
            icon: require("@/assets/images/capability2.png"),
          },
          {
            name: '下架',
            icon: require("@/assets/images/capability3.png"),
          },
          {
            name: '配送',
            icon: require("@/assets/images/capability4.png"),
          },
          {
            name: '补货',
            icon: require("@/assets/images/capability5.png"),
          },
        ],
        // 员工能力值评分
        capabilityRate: [
          {
            name: '整体评分',
            rates: [{
                label: 'selection', // 拣选
                value: '4.1'
              },
              {
                label: 'upperShelf', // 上架
                value: '4.2'
              },
              {
                label: 'lowerShelf', // 下架
                value: '4.3'
              },
              {
                label: 'distribution', // 配送
                value: '4.4'
              },
              {
                label: 'replenishment', // 补货
                value: '4.5'
              },
            ]
          },
          {
            name: '个人评分',
            rates: [{
                label: 'selection', // 拣选
                value: '4.1'
              },
              {
                label: 'upperShelf', // 上架
                value: '4.2'
              },
              {
                label: 'lowerShelf', // 下架
                value: '4.3'
              },
              {
                label: 'distribution', // 配送
                value: '4.4'
              },
              {
                label: 'replenishment', // 补货
                value: '4.5'
              },
            ]
          },
          {
            name: '个人等级',
            rates: [{
                label: 'selection', // 拣选
                value: 'A'
              },
              {
                label: 'upperShelf', // 上架
                value: 'B'
              },
              {
                label: 'lowerShelf', // 下架
                value: 'C'
              },
              {
                label: 'distribution', // 配送
                value: 'A'
              },
              {
                label: 'replenishment', // 补货
                value: 'A'
              },
            ]
          },
        ],
        // 耗时对比分析-图表
        optionTimeComparison: {
          color: ["rgba(2, 222, 255, 1)","rgba(22, 58, 141, 1)"],
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var html = params[0].axisValue + '<br/>';
              for (var i = 0; i < params.length; i++) {
                html = html + params[i].marker + params[i].seriesName + ' : ' + params[i].value + ' h' + '<br/>'
              }
              return html
            },

            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['闲置时间','工作时间'],
            textStyle: { //图例文字的样式
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12
            }
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '6%',
            top: '12%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            // name: '耗时',
            axisLabel: {
              formatter: '{value}h',
              textStyle: {
                fontSize : 16      //更改坐标轴文字大小
              }
            },
          },
          yAxis: {
            type: 'category',
            // name:"日期",
            data: ['08-20','08-21','08-22','08-23','08-24','08-25','08-26'],
            axisLabel: {
              show: true,
              textStyle: {
                fontSize : 16      //更改坐标轴文字大小
              }
            },
          },
          series: [{
              name: '工作时间',
              type: 'bar',
              stack: '总量',
              barWidth:20,
              label: {
                normal: {
                  show: true,
                  position: 'insideLeft',
                  color:'#fff',
                }
              },
              data: [10,11,9,9.2,8.3,6.2,10.5]
            },
            {
              name: '闲置时间',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                  color:'#fff',
                }
              },
              data: [-2,-1,-3,-2.8,-3.7,-5.8,-1.5]
            }
          ]
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
            data: ['平均利用率','个人利用率'],
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
            name: '个人利用率',
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
		methods:{
      // 人员效率切换
      effChange(index){
        this.effDimension = index;
        console.log(this.effDimension,'人员效率');
      },

      // 耗时对比分析切换
      timeChange(index){
        this.timeDimension = index;
        console.log(this.timeDimension,'耗时对比分析');
      },

      // 平均利用率切换
      UtilizationChange(index){
        this.UtilizationDimension = index;
        console.log(this.UtilizationDimension,'平均利用率');
      },

      thridHome(){
        var personArea = "0";
        this.$router.push({
          path: "/thrid",
          query: {
            type: personArea,// 0：收货区域；1：sps拣选；2:人员画像；3：车辆画像
          }
        })
        this.reload();
      },
		},
	}
</script>

<style>

</style>