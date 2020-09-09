<template>
	<dv-full-screen-container class="firstScreen screen_container">
    <!-- 此处留着插入3D -->
    <div class="container-3d h-100">
      <!-- ... -->
      <three-map @func="getObjFormMapAll"  @changeSecondScreendata="changeSecondScreendata"></three-map>
    </div>

    <!-- 头部header -->
    <Header class="p-absolute" :title="'小鹏汽车全场驾驶舱'" :subtitle="'Xiaopeng vehicle full cockpit'" @click.native="goSecond"></Header>

    <!-- 左边 -->
    <div class="first_left">
      <!-- 总体收货量 -->
      <div class="screen_card receipt">
        <div class="content_title p-3">
          <h4 class="fs_20 m-0 font-weight-normal">总体收货量</h4>
        </div>
        <my-echart id="chart1" :data="option1" height="240px"></my-echart>
      </div>

      <!-- 库存周转率 -->
      <div class="mt-3 screen_card">
        <div class="content_title p-3 d-flex justify-content-between align-items-center">
          <h4 class="fs_20 m-0 font-weight-normal">库存周转率</h4>
          <div class="dimension">
            <template v-for="(d,index) in dimension">
              <span :class="['fs_14 mr-2',d.id == chart2Dimension?'text-screen2':'']" @click="chart2Change(d.id)">{{d.label}}</span>
            </template>
          </div>
        </div>
        <my-echart id="chart2" :data="option2" height="178px"></my-echart>
      </div>

      <!-- 人员效率 -->
      <div class="mt-3 screen_card">
        <div class="content_title p-3 d-flex justify-content-between align-items-center">
          <h4 class="fs_20 m-0 font-weight-normal">人员效率</h4>
          <div class="dimension">
            <template v-for="(d,index) in dimension">
              <span :class="['fs_14 mr-2',d.id == chart3Dimension?'text-screen2':'']" @click="chart3Change(d.id)">{{d.label}}</span>
            </template>
          </div>
        </div>
        <my-echart id="chart3" :data="option3" height="178px"></my-echart>
      </div>
    </div>

    <!-- 中间 -->
    <div class="first_middle">
      <!-- 人员/车辆利用率 -->
      <div class="mt-3 screen_card d-flex">
        <div class="content_title p-3" style="width:10%">
          <h4 class="fs_20 m-0 font-weight-normal">人员/车辆利用率</h4>
          <div class="utilize d-flex mt-3">
            <template v-for="(use,index) in utilize">
              <span :class="['fs_16 text-center text-screen',use.id == chart4Dimension?'bg-screen':'']" @click="chart4Change(use.id)">{{use.label}}</span>
            </template>
          </div>
        </div>
        <my-echart id="chart4" :data="option4" height="185px"></my-echart>
      </div>
    </div>

    <!-- 右边 -->
    <div class="first_right">
      <!-- 总任务单量趋势分析 -->
      <div class="screen_card  p-relative">
        <div class="content_title p-3  d-flex justify-content-between align-items-center">
          <h4 class="fs_20 m-0 font-weight-normal">总任务单量趋势分析</h4>
          <div class="dimension">
            <template v-for="(d,index) in dimension">
              <span :class="['fs_14 mr-2',d.id == chart5Dimension?'text-screen2':'']" @click="chart5Change(d.id)">{{d.label}}</span>
            </template>
          </div>
        </div>
        <p class="info_p text-center m-0 fs_16"><span class="text-screen2">当前总任务量：{{orderCountForAll}}</span></p>
        <my-echart id="chart5" :data="option5" height="178px"></my-echart>
      </div>

      <!-- 总任务单量分布 -->
      <div class="mt-3 screen_card">
        <div class="content_title p-3">
          <h4 class="fs_20 m-0 font-weight-normal">总任务单量分布</h4>
        </div>
        <my-echart id="chart6" :data="option6" height="178px"></my-echart>
      </div>

      <!-- 任务完成时间分析 -->
      <div class="mt-3 screen_card p-relative">
        <div class="content_title p-3">
          <h4 class="fs_20 m-0 font-weight-normal">任务完成时间分析</h4>
        </div>
        <p class="info_p text-center m-0 fs_16">
          <span class="text-screen2">剩余订单：{{remainingOrderNum}} 单</span>
          <span class="text-danger ml-3">预计还需：{{predictedFinishTime}} 小时</span>
        </p>
        <my-echart id="chart7" :data="option7" height="178px"></my-echart>
      </div>

    </div>
	</dv-full-screen-container>
</template>
<script>
  import Header from "@/components/Header"
  import echarts from 'echarts'; // 引入echarts
	import MyEchart from "@/components/Charts/BaseEchartsGraph"
  import ThreeMap from '@/components/3dMap/3dMapAll'; // 引入3d

	export default {
		name: 'firstScreen',
    components: {
      Header,
      MyEchart,
      ThreeMap
    },
		data () {
			return {
        websock: null,
        isWebsocketFlag:true,
        global_addr:"",
        // websockt 心跳数据
        ws_data:{"type":"10", "addr":"" , "data":"" , "category":"", "dashboard_no":"01"},
        // websockt 条件数据
        ws_condition_data:{"type":"11", "addr":"" , "data":"" , "category":"00", "dashboard_no":"02"},
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
        // 人员\车辆利用率维度
        utilize:[
          {
            id:0,
            label:"人员"
          },
          {
            id:1,
            label:"车辆"
          },
        ],
        chart2Dimension:0,// 库存周转率当前选中的维度：时
        chart3Dimension:0,// 人员效率当前选中的维度：时
        chart4Dimension:0,// 人员/车辆利用率当前选中的维度：时
        chart5Dimension:0,// 总任务单量趋势分析当前选中的维度：时

        personEfficiency:0, //位置 左3 每个车间  总体人员平均效率
        orderCountForAll:0,// 右一 总任务单量趋势图   总订单数量
        remainingOrderNum:0,// 右三  任务完成分析--剩余订单
        predictedFinishTime:0,// 右三  任务完成分析--预计完成时间   小时
        personData:{},
        carData:{},
        // 总体收货量-图表
        option1: {
          color:["#02DEFF","#163A8D"],
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              if (!params.length) return ''
              let s = params[0].axisValueLabel + '<br/>'
              for (const iterator of params) {
                // 如果是负数则反转
                let d = iterator.data < 0 ? -iterator.data : iterator.data
                s += iterator.seriesName + '：' + d + '<br/>'
              }
              return s
            },
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['收货量','出库量'],
            textStyle: { //图例文字的样式
              color: '#9FCEFF',
              fontSize: 14
            },
            right: '15',
            top: '20',
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '0%',
            top: '28%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            // name: '耗时',
            axisLabel: {
              formatter: (value) => {
                // 负数取反 显示的就是正数了
                if (value < 0) {
                  return -value
                }
                else {
                  return value
                }
              }
            },
            show:false,
          },
          yAxis: {
            type: 'category',
            // name:"车间",
            boundaryGap: true,
            data: ['车间A','车间B','车间C'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize:16,
              }
            }
          },
          series: [{
              name: '出库量',
              type: 'bar',
              stack: '总量',
              barWidth : 18,//柱图宽度
              barGap:'20%',//柱图间距
              label: {
                normal: {
                  show: true,
                  offset:[-35, -20],
                  position: 'right',
                  color:'#9FCEFF',
                  fontSize:16,
                }
              },
              data: [60,100,40],
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#02DEFF'
                  }, {
                      offset: 1,
                      color: '#007EFF'
                  }]),
                }
              }
            },
            {
              name: '收货量',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  offset:[30, -20],
                  position: 'left',
                  color:'#9FCEFF',
                  fontSize:16,
                  formatter: (value) => {
                    // 值都是负数的 所以需要取反一下
                    return -value.data
                  },
                },
              },
              data: [-80,-40,-100],
              itemStyle: {
                normal: {
                  color: '#163A8D',
                }
              },
            }
          ]
        },
        // 库存周转率-图表
        option2: {
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var html = params[0].axisValue + '<br/>';
              for (var i = 0; i < params.length; i++) {
                html = html + params[i].seriesName + ' : ' + params[i].value + '<br/>'
              }
              return html
            },
          },
          legend: {
            data: ['车间A','车间B','车间C'],
            top: '0',
            icon:'circle',
            itemHeight: 12,
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // name: '时间',
            boundaryGap: true,
            data: ["00:00","04:00","08:00","12:00","16:00","20:00","24:00"],
            axisLabel: {
              interval:1, // 1间隔一个标签显示
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [
            {
              name: '车间A',
              type: 'line',
              data: [60, 40, 20, 50, 60, 70, 50],
              smooth:true,
              symbol:"none",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#E97BC9'
                  }, {
                      offset: 1,
                      color: '#B978EE'
                  }]),
                }
              }
            },
            {
              name: '车间B',
              type: 'line',
              data: [20, 82, 75, 80, 60, 85, 70],
              smooth:true,
              symbol:"none",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#EA354B'
                  }, {
                      offset: 1,
                      color: '#F4B49D'
                  }]),
                }
              }
            },
            {
              name: '车间C',
              type: 'line',
              data: [50, 22, 60, 54, 90, 60, 40],
              smooth:true,
              symbol:"none",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#4E3DF5'
                  }, {
                      offset: 0.5,
                      color: '#59BBF9'
                  }, {
                      offset: 1,
                      color: '#B9FBCF'
                  }]),
                }
              }
            },
          ]
        },
        // 人员效率-图表
        option3: {
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var html = params[0].axisValue + '<br/>';
              for (var i = 0; i < params.length; i++) {
                html = html + params[i].seriesName + ' : ' + params[i].value + '<br/>'
              }
              return html
            },
          },
          legend: {
            data: ['车间A','车间B','车间C'],
            top: '0',
            icon:'circle',
            itemHeight: 12,
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // name: '时间',
            boundaryGap: true,
            data: ["00:00","04:00","08:00","12:00","16:00","20:00","24:00"],
            axisLabel: {
              interval:1, // 1间隔一个标签显示
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [
            {
              name: '车间A',
              type: 'line',
              data: [20, 40, 30, 50, 60, 70, 50],
              smooth:true,
              symbol:"none",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#E97BC9'
                  }, {
                      offset: 1,
                      color: '#B978EE'
                  }]),
                }
              },
              //平均值的配置
              markLine: {
                type: 'line',
                data: [{
                  type: 'average',
                  name: '平均值'
                }, ],
              },
            },
            {
              name: '车间B',
              type: 'line',
              data: [70, 82, 60, 34, 90, 30, 60],
              smooth:true,
              symbol:"none",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#EA354B'
                  }, {
                      offset: 1,
                      color: '#F4B49D'
                  }]),
                }
              }
            },
            {
              name: '车间C',
              type: 'line',
              data: [50, 22, 60, 54, 90, 60, 40],
              smooth:true,
              symbol:"none",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#4E3DF5'
                  }, {
                      offset: 0.5,
                      color: '#59BBF9'
                  }, {
                      offset: 1,
                      color: '#B9FBCF'
                  }]),
                }
              }
            },
          ]
        },
        // 人员/车辆利用率-图表
        option4: {
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
            left: '2%',
            right: '8%',
            bottom: '8%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00","24:00"],
            axisLabel: {
              interval:0, // 1间隔一个标签显示
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%',
            },
            interval:25,
          },
          series: [{
            name: '任务单量',
            data: [70, 80, 86, 60, 80, 70, 85, 86, 60, 80, 70, 85, 90],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(12, 190, 255, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(12, 190, 255, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(12, 190, 255, 0)'
                }]),
              },
            },
            symbolSize: 8,
            smooth: true,
            markLine: {
                symbol: 'none',
                lineStyle: {
                  normal: {
                    type: 'dashed',
                    color: '#fff',
                  }
                },
                label: {
                  show: true,
                  position: 'middle',
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  formatter: '{b}: {c}'
                },
              },
          }]
        },
				// 总任务单量趋势分析-图表
        option5: {
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
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ["00:00","04:00","08:00","12:00","16:00","20:00","24:00"],
            axisLabel: {
              interval:1, // 1间隔一个标签显示
            }
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: '任务单量',
            data: [1200, 2300, 1900, 2100, 3000, 3500, 1500],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(69, 157, 224, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(69, 157, 224, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(69, 157, 224, 0.02)'
                }]),
              },
            },
            symbolSize: 0,
            smooth: true,
            markLine: {
                symbol: 'none',
                lineStyle: {
                  normal: {
                    type: 'dashed',
                    color: '#fff',
                  }
                },
                label: {
                  show: true,
                  position: 'middle',
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  formatter: '{b}: {c}'
                },
              },
          }]
        },
        // 总任务单量分布-图表
        option6: {
          color:['#68E0F2','#FFFC54','#F0A17B'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            data: ['车间A','车间B','车间C'],
            bottom: '15',
            icon:'circle',
            itemHeight: 12,
          },
          series: [
            {
              name: '任务单量',
              type: 'pie',
              radius: [15, 70],
              center: ['50%', '45%'],
              data: [
                  {value: 100, name: '车间A'},
                  {value: 230, name: '车间B'},
                  {value: 330, name: '车间C'}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'area',
              label: {
                normal: {
                  formatter: '{b|{b}}'+ ' : ' +'{a|{d}%}\n\n',
                  borderWidth: 20,
                  borderRadius: 4,
                  padding: [0, -100],
                  rich: {
                    a: {
                      color: '#fff',
                      fontSize: 15,
                      lineHeight: 20
                    },
                    b: {
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#fff'
                    }
                  }
                }
              },
              labelLine: {
                smooth: 0.2,
                length: 15,
                length2: 80,
              },
              itemStyle: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        },
        // 任务完成时间分析-图表
        option7: {
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
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ["00:00","04:00","08:00","12:00","16:00","20:00","24:00"],
            axisLabel: {
              interval:1, // 1间隔一个标签显示
            }
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: '任务单量',
            data: [1200, 2300, 1900, 2100, 3000, 3500, 1500],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(244, 184, 7, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(244, 184, 7, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(238, 235, 233, 0.02)'
                }]),
              },
            },
            symbolSize: 0,
            smooth: true,
            markLine: {
                symbol: 'none',
                lineStyle: {
                  normal: {
                    type: 'dashed',
                    color: '#fff',
                  }
                },
                label: {
                  show: true,
                  position: 'middle',
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  formatter: '{b}: {c}'
                },
              },
          }]
        },
			}
		},
    methods:{
      // 库存周转率切换
      chart2Change(index){
        this.chart2Dimension = index;
        console.log(this.chart2Dimension,'库存周转率');
      },
      // 人员效率切换
      chart3Change(index){
        this.chart3Dimension = index;
        console.log(this.chart3Dimension,'人员效率');
      },
      // 人员\车辆利用率
      chart4Change(index){
        this.chart4Dimension = index;
        if(this.chart4Dimension==0){
          this.loadPersonnelUtilizationByHour(this.personData);
        }
        if(this.chart4Dimension==1){
          this.loadCarUtilizationByHour(this.carData);
        }
        console.log(this.chart4Dimension,'人员/车辆利用率');
      },
      // 总任务单量趋势分析切换
      chart5Change(index){
        this.chart5Dimension = index;
        console.log(this.chart5Dimension,'总任务单量趋势分析');
      },

      getObjFormMapAll(data){
        this.$cookie.set('mapClickObj', data.name);
      },
      // 模拟进入第二屏
      goSecond(){
        console.log("111");
        this.$router.push({
          path: "/second",
        })
      },

      //选择性加载数据
      loadData(data){
        for(let key in data) {
          if(key=='orderTypeMaterialsCountForWarehouse'){//位置 左1 总体收货量图表数据
            this.loadOrderTypeMaterialsCountForWarehouse(data[key]);
          }
          if(key=='stockTurnoverForAllWarehouse'){//位置 左2 库存周转率
            this.loadStockTurnoverForAllWarehouse(data[key]);
          }
          if(key=='personUserAvgByHour'){//位置 左3 每个车间  人员平均效率
            this.loadPersonUserAvgByHour(data[key]);
          }
          if(key=='personEfficiency'){//位置 左3 每个车间  总体人员平均效率
            this.loadPersonEfficiency(data[key]);
          }
          if(key=='orderCountForAll'){//右一 总任务单量趋势图   总订单数量
            this.loadOrderCountForAll(data[key]);
          }
          if(key=='orderDistributionByForWarehouse'){//右二  总任务单量分布图
            this.loadOrderDistributionByForWarehouse(data[key]);
          }
          if(key=='remainingOrderNum'){//右三  任务完成分析--剩余订单
            this.loadRemainingOrderNum(data[key]);
          }
          if(key=='predictedFinishTime'){//右三  任务完成分析--预计完成时间   小时
            this.loadPredictedFinishTime(data[key]);
          }
          if(key=='predictedFinishDistributionByHour'){//右三  任务完成分析--折线图 每小时订单数
            this.loadPredictedFinishDistributionByHour(data[key]);
          }
          if(key=='personnelUtilizationByHour'){//中底层--人员利用率
            this.loadPersonnelUtilizationByHour(data[key]);
          }
          if(key=='carUtilizationByHour'){//中底层--车辆利用率
            this.loadCarUtilizationByHour(data[key]);
          }
        }
      },

      //加载总体收货量
      loadOrderTypeMaterialsCountForWarehouse(data){
        let inArr = new Array();//收货量
        let outArr = new Array();//出库量
        let yArr = new Array();
        for (let i in data) {
          yArr.push(data[i].warehouse_name);//车间
          for(let j in data[i].orderTypeOfMaterials){
            if (j==2) {//入库
              inArr.push(-data[i].orderTypeOfMaterials[j]);
            }else if (j==3) {//出库
              outArr.push(data[i].orderTypeOfMaterials[j]);
            }
          }

        }

        this.option1 = {
          legend: {
            data: ['收货量','出库量'],
          },
          yAxis: {
            data: yArr,
          },
          series: [{
            name: '出库量',
            type: 'bar',
            stack: '总量',
            barWidth : 18,//柱图宽度
            barGap:'20%',//柱图间距
            label: {
              normal: {
                show: true,
                offset:[-35, -20],
                position: 'right',
                color:'#9FCEFF',
                fontSize:16,
              }
            },
            data: outArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#02DEFF'
                }, {
                  offset: 1,
                  color: '#007EFF'
                }]),
              }
            }
          },
            {
              name: '收货量',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  offset:[30, -20],
                  position: 'left',
                  color:'#9FCEFF',
                  fontSize:16,
                  formatter: (value) => {
                    // 值都是负数的 所以需要取反一下
                    return -value.data
                  },
                },
              },
              data: inArr,
              itemStyle: {
                normal: {
                  color: '#163A8D',
                }
              },
            }
          ]
        }
      },
      //加载库存周转率
      loadStockTurnoverForAllWarehouse(data){
        let legendArr = new Array();
        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          legendArr.push(data[i].warehouse_name);//车间

          var obj = new Object;
          obj.name=data[i].warehouse_name;
          obj.type='line';
          obj.smooth=true;
          obj.symbol='none';
          obj.data = new Array();
          obj.itemStyle={
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#E97BC9'
              }, {
                offset: 1,
                color: '#B978EE'
              }]),
            }
          };
          for(let j in data[i].stockTurnoverForHour){
            if (!xArr.hasOwnProperty(j)) {
              xArr.push(j)
            }
            obj.data.push(data[i].stockTurnoverForHour[j]);
          }


          series.push(obj);
        }


        this.option2 = {
          legend: {
            data: legendArr,
          },

          xAxis: {
            data: xArr,
          },
          series:series
          /*[
           {
             name: '车间A',
             type: 'line',
             data: [60, 40, 20, 50, 60, 70, 50],
             smooth:true,
             symbol:"none",
             itemStyle: {
               normal: {
                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                   offset: 0,
                   color: '#E97BC9'
                 }, {
                   offset: 1,
                   color: '#B978EE'
                 }]),
               }
             }
           }
         ]*/
        }
      },
      //加载人员效率--总体人员平均效率
      loadPersonEfficiency(data){
        this.personEfficiency = data;
      },

      //加载人员效率--人员平均效率
      loadPersonUserAvgByHour(data){
        let legendArr = new Array();
        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          legendArr.push(data[i].warehouse_name);//车间

          var obj = new Object;
          obj.name=data[i].warehouse_name;
          obj.type='line';
          obj.smooth=true;
          obj.symbol='none';
          obj.data = new Array();
          obj.itemStyle={
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#E97BC9'
              }, {
                offset: 1,
                color: '#B978EE'
              }]),
            }
          };
          /*obj.markLine = {
            type: 'line',
              data: [{
              type: 'average',
              name: '平均值'
            }],
          };*/
          for(let j in data[i].personnelEfficiencyByHour){
            if (!xArr.hasOwnProperty(j)) {
              xArr.push(j)
            }
            obj.data.push(data[i].personnelEfficiencyByHour[j]);
          }
          series.push(obj);
        }


        this.option3 = {
          legend: {
            data: legendArr,
          },

          xAxis: {
            data: xArr,
          },
          series: series
          /*[
            {
              name: '车间A',
              type: 'line',
              data: [20, 40, 30, 50, 60, 70, 50],
              smooth:true,
              symbol:"none",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#E97BC9'
                  }, {
                    offset: 1,
                    color: '#B978EE'
                  }]),
                }
              },
              //平均值的配置
              markLine: {
                type: 'line',
                data: [{
                  type: 'average',
                  name: '平均值'
                }, ],
              },
            },
          ]*/
        }
      },

      //加载人员&车辆利用率--人员
      loadPersonnelUtilizationByHour(data){
        this.personData = data;

        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          xArr.push(i);
          series.push(data[i]);
        }

        this.option4 = {
          xAxis: {
            data: xArr,
          },
          series: [{
            data: series,
          }]
        }
      },
      //加载人员&车辆利用率--车辆
      loadCarUtilizationByHour(data){
        this.carData = data;

        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          xArr.push(i);
          series.push(data[i]);
        }

        this.option4 = {
          xAxis: {
            data: xArr,
          },
          series: [{
            data: series,
          }]
        }
      },

      //加载总任务单量趋势图--总订单数量
      loadOrderCountForAll(data){
        this.orderCountForAll = data;
      },
      //加载总任务单量趋势图--每小时的订单数
      loadOrderCountByHour(data){
        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          xArr.push(i);
          series.push(data[i]);
        }
        this.option5 = {
          xAxis: {
            data: xArr,
          },
          series: [{
            data: series,
          }]
        }
      },

      //加载总任务单量分布图
      loadOrderDistributionByForWarehouse(data){
        let legendArr = new Array();
        let series = new Array();
        for (let i in data) {
          var obj = new Object();
          legendArr.push(data[i].name);
          obj.name = data[i].name;
          obj.value = data[i].num;
          series.push(obj);
        }
        this.option6 = {

          legend: {
            data: legendArr,
          },
          series: [
            {
              data: series.sort(function (a, b) { return a.value - b.value; }),
            }
          ]
        }
      },

      //加载任务完成时间分析--剩余订单
      loadRemainingOrderNum(data){
        this.remainingOrderNum = data;
      },
      //加载任务完成时间分析--预计完成时间<小时>
      loadPredictedFinishTime(data){
        this.predictedFinishTime = data;
      },
      //加载任务完成时间分析--折线图:每小时订单数
      loadPredictedFinishDistributionByHour(data){
        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          xArr.push(i);
          series.push(data[i]);
        }
        this.option7 = {
          xAxis: {
            data: xArr,
          },
          series: [{
            data: series,
          }]
        }
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
            const reData = JSON.parse(e.data);
            if (reData.code != null && reData.code == '0') {
              console.log(reData.msg)
            }
            else if (reData.x != null && reData.y != null) {
              this.addBob(reData.x, reData.y)
            } else {
              this.reLoadData(reData);
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

          // 点击3D模型 ，回调方法
          changeSecondScreendata(data) {
            //sonriku mark 此处3D模型数据与后端没有对应，后续需要对应上
            this.ws_condition_data.data=data;
            this.websock.send(JSON.stringify(this.ws_condition_data));
          },

    },
    mounted() {
       // 初始化websocket请求
       this.global_addr=this.$route.params.addr;
       this.ws_data.addr=this.global_addr;
       this.ws_condition_data.addr=this.global_addr;
        this.initWebSocket();
      },

      destroyed() {
        this.isWebsocketFlag=false;
        this.websock.close();
        clearTimeout(this.timer);
        clearTimeout(this.timeoutObj);
      },

	}
</script>

<style>

</style>
