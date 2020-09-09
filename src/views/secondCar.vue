<template>
	<div class="p-absolute secondPerson secondCar">
		<!-- 右边 -->
		<div class="second_right p-absolute">
			<!-- 车辆列表 -->
			<div class="screen_card">
				<div class="p-3">
					<div class="content_title">
			      <h4 class="fs_20 m-0 font-weight-normal">车辆列表</h4>
			    </div>
			    <div class="mt-3 listBox">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<template v-for="(car,index) in carList">
								<el-tab-pane :name="car.type">
						    	<div slot="label" class="d-flex align-items-center justify-content-center">
						    		<img :src="activeName == car.type?typeiconActive:typeicon" alt="" width="18">
						    		<span class="fs_16 ml-1">{{car.typelabel}}</span>
						    	</div>
						    	<div class="mt-3">
								    <vue-seamless-scroll  v-if="car.type == activeName" :data="car.listData" :class-option="optioncarHover" class="seamlessList">
							        <ul class="list_ul">
						            <li v-for="(cell,index) in car.listData" class="d-flex align-items-center justify-content-between pb-3">
						            	<div class="d-flex align-items-center">
						            		<el-avatar shape="square" :size="60" fit="cover" :src="cell.avatar"></el-avatar>
						            		<div class="ml-3">
						            			<p class="m-0 d-flex align-items-center">
						            				<span class="fs_18 mr-3">{{cell.username}}</span>
						            			</p>
						            			<p class="m-0 fs_14 opacity-90 mt-1"><span class="mr-3">车辆编号：{{cell.code}}</span></p>
						            		</div>
						            	</div>
						            	<img class="goLink" src="../assets/images/carCell_right.png" alt="" @click="goThree(3)"/>
						            </li>
							        </ul>
							      </vue-seamless-scroll>
						      </div>
						  	</el-tab-pane>
							</template>
					  </el-tabs>
		      </div>
				</div>
			</div>
		</div>

		<div class="second_bottom p-fixed">
			<el-row :gutter="20" type="flex">
				<!-- 基本情况  -->
				<el-col :span="6" class="w-20">
				  <div class="screen_card base_info">
				  	<div class="p-3">
					    <div class="content_title">
					      <h4 class="fs_20 m-0 font-weight-normal">基本情况</h4>
					    </div>
					    <el-row :gutter="15">
					    	<el-col :span="13">
					    		<div class="mt-5 w-75">
					    			<h5 class="font-weight-normal m-0 fs_16 text-screen2">总车辆数</h5>
					    			<div class="personNum fs_30 mt-3 text-center">{{baseInfo.carNum}}</div>
					    		</div>
					    	</el-col>
					    	<el-col :span="11" class="teamList">
					    		<template v-for="item in baseInfo.teamList">
					    			<p class="m-0 mt-2 text-center">
						    			{{item.label}}<span class="ml-3 mr-3 fs_20">{{item.value}}</span>辆
						    		</p>
					    		</template>
					    	</el-col>
					    </el-row>
				    </div>
				  </div>					
				</el-col>

				<!-- 车辆利用率  -->
				<el-col :span="6" class="w-20">
				  <div class="screen_card">
				  	<div class="content_title p-3 d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">车辆利用率</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == carChart1Dimension?'text-screen2':'']" @click="carChart1Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <p class="fs_16 m-0 text-center" style="margin-top:-10px!important;">这是显示文字</p>
		        <my-echart id="carChart1" :data="carOption1" height="137px"></my-echart>
				  </div>					
				</el-col>

				<!-- 车辆故障率  -->
				<el-col :span="6" class="w-20">
				  <div class="screen_card failureRate">
				  	<div class="p-3">
					  	<div class="content_title">
			          <h4 class="fs_20 m-0 font-weight-normal">车辆故障率</h4>
			        </div>
			        <el-row type="flex" :gutter="15" class="mt-4">
			        	<el-col :span="10" class="p-relative text-center">
			        		<el-progress type="circle" :percentage="failureRate.percentage" :stroke-width="13" :width="120" :color="failureRate.color"></el-progress>
			        		<span :style="{color:failureRate.color}" class="p-absolute name">{{failureRate.name}}</span>
			        	</el-col>
			        	<el-col :span="7" class="mt-4 text-center">
			        		<span class="fs_30 text-screen2">{{failureRate.normalCarNum}}</span>
			        		<p class="m-0 mt-2 fs_16">正常车辆数</p>
			        	</el-col>
			        	<el-col :span="7" class="mt-4 text-center">
			        		<span class="fs_30 text-purple">{{failureRate.faultCarNum}}</span>
			        		<p class="m-0 mt-2 fs_16">故障车辆数</p>
			        	</el-col>
			        </el-row>
		        </div>
				  </div>					
				</el-col>

				<!-- 车辆周转次数  -->
				<el-col :span="6" class="w-20">
				  <div class="screen_card">
				  	<div class="content_title p-3 d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">车辆周转次数</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == carChart2Dimension?'text-screen2':'']" @click="carChart2Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <p class="fs_16 m-0 text-center" style="margin-top:-10px!important;">车辆周转率：{{carTurnover}}</p>
		        <my-echart id="carChart2" :data="carOption2" height="137px"></my-echart>
				  </div>					
				</el-col>

				<!-- 分析结论  -->
				<el-col :span="6" class="w-20">
				  <div class="screen_card">
				  	<div class="p-3">
					  	<div class="content_title">
			          <h4 class="fs_20 m-0 font-weight-normal">分析结论</h4>
			        </div>
			        <div class="m-3" style="height: 112px;">
			        	<div class="fs_16" v-text="conclusionText"></div>
			        </div>
				  	</div>
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
		name: 'secondCar',
		data () {
			return {
				activeName:"1", // 1：叉车、2：牵引车 、3：AGV小车、4：无动力载具
				typeicon:require("@/assets/images/carType.png"),
				typeiconActive:require("@/assets/images/carType_active.png"),
				// 车辆类型+列表数据
				carList:[
					{
						type:"1",
						typelabel:"叉车",
						listData:[
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车1",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车2",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车3",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车4",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车5",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车6",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车7",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"叉车8",
								code:"385468",
							},
						],
					},
					{
						type:"2", 
						typelabel:"牵引车",
						listData:[
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"牵引车1",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"牵引车2",
								code:"385468",
							},
						],
					},
					{
						type:"3",
						typelabel:"AGV小车",
						listData:[
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"AGV小车1",
								code:"385468",
							},
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"AGV小车2",
								code:"385468",
							},
						],
					},
					{
						type:"4",
						typelabel:"无动力载具",
						listData:[
							{
								avatar:require("@/assets/images/avatar_car.jpg"),
								username:"无动力载具1",
								code:"385468",
							},
						],
					},
				],
				// 基本情况
				baseInfo:{
					carNum:"160",
					teamList:[
						{
							label:"小件SPS区",
							value:"15",
						},
						{
							label:"翻包区",
							value:"60",
						},
						{
							label:"收货区",
							value:"15",
						},
						{
							label:"不良品区",
							value:"28",
						},
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
        carTurnover:"30%",// 车辆周转率
        carChart1Dimension:0,// 车辆利用率当前选中的维度：时
        carChart2Dimension:0,// 车辆周转时间当前选中的维度：时
        // 车辆利用率-图表
        carOption1: {
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
            splitNumber:2,
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [{
            name: '车辆利用率',
            data: [72, 43, 59, 71, 60, 35, 55],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(100, 195, 240, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(30, 78, 172, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(30, 78, 172, 0.02)'
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
        // 车辆故障率
        failureRate:{
        	name:"故障率",
					color:"rgba(107, 82, 255, 1)",
					percentage:55,
					normalCarNum:"55",
					faultCarNum:"45",
        },
        // 车辆周转次数-图表
        carOption2: {
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
            splitNumber:3,
            axisLabel: {
              formatter: '{value}次'
            }
          },
          series: [{
            name: '库存周转次数',
            data: [50, 60, 35, 55, 72, 43, 59],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(100, 195, 240, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(30, 78, 172, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(30, 78, 172, 0.02)'
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
        // 分析结论
        conclusionText:"华清科盛（北京）信息技术有限公司是一家集软硬件系统研发、生产、销售于一体的仓储物流技术企业，在北京、上海和常州分别设有公司。"
			}
		},
		components: {
			MyEchart,
		},
		computed: {
			optioncarHover () {
				return {
					hoverStop: true, //是否悬停
					singleHeight:78,  // 单行停顿
					waitTime:3000, //单行停顿时间
				}
			}
    },
    created () {

		},
    methods:{
    	// 切换车辆type
    	handleClick(tab, event) {
        console.log(tab, event);
      },
      // 车辆利用率维度切换
      carChart1Change(index){
        this.carChart1Dimension = index;
        console.log(this.carChart1Dimension,'车辆利用率');
      },
      // 车辆周转次数维度切换
      carChart2Change(index){
        this.carChart2Dimension = index;
        console.log(this.carChart2Dimension,'车辆周转次数');
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
	}
</script>

<style>
	.seamlessList{
		height: 543px;
		overflow: hidden;
	}
</style>