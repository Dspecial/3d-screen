<template>
	<div class="p-absolute secondHome">
		<!-- 右边 -->
		<div class="second_right p-absolute">
		  <!-- 出勤情况 -->
		  <div class="screen_card">
		  	<div class="p-3">
			    <div class="content_title">
			      <h4 class="fs_20 m-0 font-weight-normal">出勤情况</h4>
			    </div>
			    <div class="mt-3">
			    	<el-row :gutter="15" class="attendance">
			    		<el-col :span="10">
			    			<template v-for="(atte,index) in attendance">
			      			<div class="card_card_bg pl-3 pr-3 pt-1 pb-1">
			      				<div class="d-flex align-items-center">
			      					<img :src="atte.img" alt="" width="30"/>
			      					<div class="ml-3">
			      						<span class="fs_20">{{atte.value}}</span>
			      						<p class="m-0 opacity-80 fs_12 mb-1">{{atte.title}}</p>
			      					</div>
			      				</div>
			      			</div>
			    			</template>
			    		</el-col>
			    		<el-col :span="14">
			    			<div class="card_card_bg p-3">
			    				<h4 class="fs_16 m-0 font-weight-normal text-center title2 mb-3">缺勤名单</h4>
			    				<el-row class="absenceList">
			    					<template v-for="(list,index) in absenceList">
				    					<el-col :span="12" class="fs_16 text-yellow text-center mt-3">{{list.name}}</el-col>
				    				</template>
			    				</el-row>	
			    				
			    			</div>
			    		</el-col>
			    	</el-row>
			    </div>
		  	</div>
		  </div>
		  <!-- 预警信息 -->
		  <div class="screen_card mt-3">
		  	<div class="p-3">
			  	<div class="content_title mb-2">
			      <h4 class="fs_20 m-0 font-weight-normal">预警信息</h4>
			    </div>
			  	<vue-seamless-scroll :data="listData" :class-option="optionHover" class="seamless-warp">
		        <ul class="item_ul pl-3 pr-3">
	            <li v-for="item in listData" class="d-flex align-items-center">
	            	<span :class="['dot',item.urgency == 0?'bg-danger':item.urgency == 2?'bg-success':'bg-yellow']"></span>
	              <span class="title fs_16 text-truncate">{{item.title}}</span>
	            </li>
		        </ul>
		      </vue-seamless-scroll>
	      </div>
		  </div>
		  <!-- 重点监控区域 -->
		  <div class="screen_card mt-3">
		  	<div class="p-3">
			  	<div class="content_title">
			      <h4 class="fs_20 m-0 font-weight-normal">重点监控区域</h4>
			    </div>
			    <el-row class="mt-2">
			    	<template v-for="area in areaMonitor">
				    	<el-col :span="6" class="text-center">
				    		<el-progress type="circle" :percentage="area.percentage" :stroke-width="8" :width="58" :color="area.color"></el-progress>
				    		<p class="m-0 fs_16 mt-1">{{area.name}}</p>
				    	</el-col>
			    	</template>
			    </el-row>
		  	</div>
		  </div>
		</div>
		<!-- 下边 -->
		<div class="second_bottom p-fixed">
			<el-row :gutter="15">
				<!-- 总数统计  -->
				<el-col :span="6">
				  <div class="screen_card" style="height:210px;overflow: hidden">
				  	<div class="p-3">
					    <div class="content_title">
					      <h4 class="fs_20 m-0 font-weight-normal">总数统计</h4>
					    </div>
					    <div class="mt-4 pl-3 pr-3 d-flex justify-content-between align-items-center" >
					    	<p class="m-0">
					    		<span>总人数</span><span class="fs_24 text-danger ml-1">{{total.person}}</span>
					    	</p>
					    	<!--<p class="m-0">
					    		<span>总库区数</span><span class="fs_24 text-screen ml-1">{{total.area}}</span>
					    	</p>-->
					    	<p class="m-0">
					    		<span>车辆数</span><span class="fs_24 text-yellow ml-1">{{total.car}}</span>
					    	</p>
					    </div>
					    <hr class="hr" />
					    <div class="mb-4 pl-3 pr-3 d-flex justify-content-between align-items-center">
					    	<p class="m-0">
					    		<span>总库区数</span><span class="fs_24 text-blue ml-1">{{total.wl}}</span>
					    	</p>
					    	<p class="m-0">
					    		<span>流转容器数量</span><span class="fs_24 text-cyan ml-1">{{total.rq}}</span>
					    	</p>
					    </div>
				    </div>
				  </div>					
				</el-col>

				<!-- 任务单量  -->
				<el-col :span="6">
				  <div class="screen_card">
				    <div class="content_title p-3">
				      <h4 class="fs_20 m-0 font-weight-normal">任务单量</h4>
				    </div>
				    <div class="d-flex justify-content-between align-items-center">
				    	<my-echart id="chart1" :data="option1" height="148px" class="w-70"></my-echart>
				    	<div class="taskList pl-3 pr-3">
				    		<template v-for="list in taskList">
				    			<p class="d-flex align-items-center m-0 mb-2">
				    				<span class="dot"></span>
				    				<span class="fs_16">{{list.key}}:{{list.value}}</span>
				    			</p>
				    		</template>
				    	</div>
				    </div>
				  </div>					
				</el-col>

				<!-- 库存周转率  -->
				<el-col :span="6">
				  <div class="screen_card">
						<div class="content_title p-3 d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">库存周转率</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == chart2Dimension?'text-screen2':'']" @click="chart2Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <my-echart id="chart2" :data="option2" height="148px"></my-echart>
				  </div>					
				</el-col>

				<!-- 预计完成任务时间  -->
				<el-col :span="6">
				  <div class="screen_card">
						<div class="content_title p-3">
		          <h4 class="fs_20 m-0 font-weight-normal">预计完成任务时间</h4>
		        </div>
		        <el-row>
		        	<el-col :span="8" class="text-center">
		        		<span class="fs_24 text-yellow">{{expected.value1}}</span>
		        		<p class="m-0 mt-1">实时效率(单/h)</p>
		        	</el-col>
		        	<el-col :span="8" class="text-center">
		        		<span class="fs_24 text-screen">{{expected.value2}}</span>
		        		<p class="m-0 mt-1">预计还需时间(h)</p>
		        	</el-col>
		        	<el-col :span="8" class="text-center">
		        		<span class="fs_24 text-blue">{{expected.value3}}</span>
		        		<p class="m-0 mt-1">剩余订单(个)</p>
		        	</el-col>
		        </el-row>
		        <my-echart id="chart3" :data="option3" height="93px"></my-echart>
				  </div>					
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'; // 引入echarts
	import MyEchart from "@/components/Charts/BaseEchartsGraph";
	export default {
		name: 'secondHome',
		data () {
			return {
				// 出勤情况
				attendance:[
					{
						img:require("@/assets/images/atte1.png"),
						value:"1440",
						title:"应到人数",
					},
					{
						img:require("@/assets/images/atte2.png"),
						value:"1280",
						title:"实到人数",
					},
					{
						img:require("@/assets/images/atte3.png"),
						value:"18",
						title:"迟到人数",
					},
					{
						img:require("@/assets/images/atte4.png"),
						value:"6",
						title:"旷工人数",
					},
				],

				// 缺勤列表
				absenceList:[
					{
						id:"",
						name:"杨小川"
					},
					{
						id:"",
						name:"杨小川"
					},
					{
						id:"",
						name:"杨小川"
					},
					{
						id:"",
						name:"杨小川"
					},
					{
						id:"",
						name:"杨小川"
					},
					{
						id:"",
						name:"杨小川"
					},
					{
						id:"",
						name:"杨小川"
					},
					{
						id:"",
						name:"杨小川"
					},
				],
				// 预警信息
				listData:[
					{
						urgency:'0', // 0:紧急；1：一般；2：正常
						title:"仓库库存不足，订单缺少货源补充，请及仓库库存不足，订单缺少货源补充，请及",
					},
					{
						urgency:'0', // 0:紧急；1：一般；2：正常
						title:"仓库叉车A设备设备损坏，请及时处理。",
					},
					{
						urgency:'1', // 0:紧急；1：一般；2：正常
						title:"仓库库存不足，订单缺少货源补充，请及",
					},
					{
						urgency:'2', // 0:紧急；1：一般；2：正常
						title:"仓库叉车A设备设备损坏，请及时处理。",
					},
					{
						urgency:'1', // 0:紧急；1：一般；2：正常
						title:"仓库库存不足，订单缺少货源补充，请及",
					},
					{
						urgency:'2', // 0:紧急；1：一般；2：正常
						title:"仓库叉车A设备设备损坏，请及时处理。",
					},
				],
				// 重点监控区域
				areaMonitor:[
					{
						name:"小件SPS区",
						color:"rgba(233, 82, 174, 1)",
						percentage:26,
					},
					{
						name:"翻包区",
						color:"rgba(107, 99, 246, 1)",
						percentage:39,
					},
					{
						name:"收货区",
						color:"rgba(241, 158, 96, 1)",
						percentage:60,
					},
					{
						name:"不良品区",
						color:"rgba(98, 203, 210, 1)",
						percentage:55,
					},
				],
		    // 总数统计
		    total:{
		    	person:"2680",
		    	area:"450",
		    	car:"562",
		    	wl:"586",
		    	rq:"5230",
		    },
		    // 任务单量-图表
        option1: {
        	color:["#4E68F3","#00D69C","#F3C525","#FF3E51"],
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
          grid: {
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '6%',
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
              name: '入库单',
              type: 'line',
              data: [60, 40, 20, 50, 60, 70, 50],
              smooth:true,
              symbol:"none",
            },
            {
              name: '出库单',
              type: 'line',
              data: [20, 82, 75, 80, 60, 85, 70],
              smooth:true,
              symbol:"none",
            },
            {
              name: '借件单',
              type: 'line',
              data: [50, 22, 60, 54, 90, 60, 40],
              smooth:true,
              symbol:"none",
            },
            {
              name: '调拨单',
              type: 'line',
              data: [40, 32, 43, 54, 36, 30, 15],
              smooth:true,
              symbol:"none",
            },
          ]
        },
        // 任务单量列表
        taskList:[
        	{
        		key:"入库单",
        		value:"134"
        	},
        	{
        		key:"出库单",
        		value:"120"
        	},
        	{
        		key:"借件单",
        		value:"13"
        	},
        	{
        		key:"调拨单",
        		value:"15"
        	},
        ],
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
        chart2Dimension:0,// 库存周转率当前选中的维度：时
        // 库存周转率-图表
        option2: {
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
            top: '6%',
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
            name: '库存周转率',
            data: [72, 43, 59, 71, 60, 35, 55],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(44, 110, 246, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(44, 110, 246, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(44, 110, 246, 0.02)'
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
        // 预计完成任务时间
        expected:{
        	value1:"120",
        	value2:"300",
        	value3:"27568",
        },
        // 预计完成任务时间-图表
        option3: {
          tooltip: {
            trigger: 'axis',
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
            data: [520, 230, 550, 900, 700, 850, 650],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(250, 191, 61, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(250, 191, 61, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(250, 191, 61, 0.02)'
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
		components: {
			MyEchart,
		},
		computed: {
			optionHover () {
				return {
					hoverStop: true, //是否悬停
					singleHeight:42,  // 单行停顿
					waitTime:3000, //单行停顿时间
				}
			}
    },
		methods:{
			// 库存周转率切换
      chart2Change(index){
        this.chart2Dimension = index;
        console.log(this.chart2Dimension,'库存周转率');
      },
      //选择性加载数据
      loadData(data){
        for(let key in data) {
          if(key=='typeOfFinishOrderForHourByWarehouse'){//底一   每小时选定库区下各类型完成订单数
            this.loadTypeOfFinishOrderForHourByWarehouse(data[key]);
          }
          if(key=='totalInfoByWarehouse'){//总数统计
            this.loadTotalInfoByWarehouse(data[key]);
          }
          if(key=='stockTurnoverByHour'){//库区周转率  每小时
            this.loadStockTurnoverByHour(data[key]);
          }
          if(key=='attendanceInfo'){//出勤情况
            this.loadAttendanceInfo(data[key]);
          }
          if(key=='wareHouseEfficiency'){//预计完成完成时间任务--实时效率
            this.loadWareHouseEfficiency(data[key]);
          }
          if(key=='predictedFinishTimeByWarehouse'){//预计完成完成时间任务--预计完成时间
            this.loadPredictedFinishTimeByWarehouse(data[key]);
          }
          if(key=='remainingOrderNum'){//预计完成完成时间任务--剩余订单数
            this.loadRemainingOrderNum(data[key]);
          }
          if(key=='predictedFinishDistributionByHour'){//预计完成完成时间任务--时间分布图
            this.loadPredictedFinishDistributionByHour(data[key]);
          }
          if(key=='areaBusynessLevel'){//重点监控区域
            this.loadAreaBusynessLevel(data[key]);
          }
          if(key=='warningInfo'){//预警信息
            this.loadWarningInfo(data[key]);
          }

        }
      },


      //加载出勤情况
      loadAttendanceInfo(data){
        // 出勤情况
        this.attendance=[
          {
            img:require("@/assets/images/atte1.png"),
            value:data.personCount,
            title:"总人数",
          },
          {
            img:require("@/assets/images/atte2.png"),
            value:data.businessPersonCount,
            title:"忙碌人数",
          },
          {
            img:require("@/assets/images/atte3.png"),
            value:data.freePersonCount,
            title:"空闲人数",
          }
        ];

        var absenceArr = new Array();
        for(let i in data.aircrew){
          var obj = new Object();
          obj.id = data.aircrew[i].rp_code;
          obj.name = data.aircrew[i].name;
          absenceArr.push(obj);
        }
          // 缺勤列表
          this.absenceList=absenceArr
      },
      //预警信息
      loadWarningInfo(data){
        var warningArr = new Array();
        for(let i in data){
          var obj = new Object();
          obj.urgency = data[i].level;
          obj.title = data[i].data;
          warningArr.push(obj);
        }

        this.listData=warningArr
          /*[
          {
            urgency:'0', // 0:紧急；1：一般；2：正常
            title:"仓库库存不足，订单缺少货源补充，请及仓库库存不足，订单缺少货源补充，请及",
          },
          {
            urgency:'0', // 0:紧急；1：一般；2：正常
            title:"仓库叉车A设备设备损坏，请及时处理。",
          },
        ]*/
      },
      //重点监控区域
      loadAreaBusynessLevel(data){
        var colorArr =["rgba(233, 82, 174, 1)","rgba(107, 99, 246, 1)","rgba(241, 158, 96, 1)","rgba(98, 203, 210, 1)"];
        var areaMonitorArr = new Array();
        for(let i in data){
          var obj = new Object();
          obj.name = data[i].area_name;
          obj.percentage = data[i].busyness;
          obj.color = colorArr[i];
          areaMonitorArr.push(obj);
        }

        this.areaMonitor=areaMonitorArr
          /*[
          {
            name:"小件SPS区",
            color:"rgba(233, 82, 174, 1)",
            percentage:26,
          },
          {
            name:"翻包区",
            color:"rgba(107, 99, 246, 1)",
            percentage:39,
          },
          {
            name:"收货区",
            color:"rgba(241, 158, 96, 1)",
            percentage:60,
          },
          {
            name:"不良品区",
            color:"rgba(98, 203, 210, 1)",
            percentage:55,
          },
        ]*/
      },

      //总数统计
      loadTotalInfoByWarehouse(data){
        this.total={
          person:data.personCount,
            car:data.carCount,
            wl:data.areaCount,
            rq:containerNum,
        }
      },
      //任务单量
      loadTypeOfFinishOrderForHourByWarehouse(){
        let legendArr = new Array();
        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          xArr.push(i);//时间

          var obj = new Object;
          obj.type='line';
          obj.smooth=true;
          obj.symbol='none';
          obj.data = new Array();

          for(let j in data[i]){
            if (!legendArr.hasOwnProperty(j)) {
              legendArr.push(j)
            }
            obj.code=j;
            obj.name=j;
            obj.data.push(data[i][j]);
          }

          series.push(obj);
        }

        let taskArr = new Array();
        for(let j in legendArr){
          var obj = new Object;
          obj.key = legendArr[j];
          var value = 0;
          for(let k in series){
            if(legendArr[j]==series[k].code){
              value += Number(series[k].data);
            }
          }
          obj.value = value;
          taskArr.push(obj);
        }


        this.option1 = {
          xAxis: {
            data: xArr,
          },
          series: series
        }
        // 任务单量列表
        this.taskList = taskArr
      },
      //库存周转率
      loadStockTurnoverByHour(data){
        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          xArr.push(i);
          series.push(data[i]);
        }
        this.option2 = {
          xAxis: {
            data: xArr,
          },
          series: [{
            data: series,
          }]
        }
      },
      //预计完成任务时间--实时效率
      loadWareHouseEfficiency(data){
        this.expected={
          value1:data,
        }
      },
      //预计完成任务时间--预计完成时间
      loadPredictedFinishTimeByWarehouse(data){
        this.expected={
          value2:data,
        }
      },
      //预计完成任务时间--剩余订单数
      loadRemainingOrderNum(data){
        this.expected={
          value3:data,
        }
      },
      //预计完成任务时间--时间分布图
      loadPredictedFinishDistributionByHour(data){
        let xArr = new Array();
        let series = new Array();
        for (let i in data) {
          xArr.push(i);
          series.push(data[i]);
        }
        this.option3 = {
          xAxis: {
            data: xArr,
          },
          series: [{
            data: series,
          }]
        }
      },

		},
	}
</script>

<style scoped>
  .seamless-warp {
    height: 126px;
    overflow: hidden;
  }
</style>
