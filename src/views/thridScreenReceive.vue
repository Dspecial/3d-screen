<template>
	<div class="thrid_container receive_container">
    <!-- 头部header -->
    <Header :title="'收货区域'" :subtitle="'Receiving area'"></Header>

    <div class="pl-3 pr-3 pt-3">
    	<el-row :gutter="20">
    		<!-- 左边 -->
    		<el-col :span="14">
    			<!-- 收货区域视频监控 -->
    			<div class="screen_card">
    				<div class="p-3">
    					<div class="content_title d-flex justify-content-between align-items-center">
	              <h4 class="fs_20 m-0 font-weight-normal">收货区域视频监控</h4>
	              <div class="seats d-flex align-items-center">
	                <template v-for="(seat,index) in seats">
	                	<div class="d-flex align-items-center mr-3">
	                		<img :src="seat.id == seatActive?seatIconActive:seatIcon" alt="" width="16" />
	                		<span :class="['fs_14 ml-1',seat.id == seatActive?'text-yellow':'text-blue2']" @click="seatChange(seat.id)">{{seat.label}}</span>
	                	</div>
	                </template>
	              </div>
	            </div>
	            <div class="mt-3">
	            	<img :src="videoImg" alt="" class="video_img img-fluid" />
	            </div>
    				</div>
    			</div>

    			<el-row class="mt-3" :gutter="20">
    				<!-- 基本信息 -->
    				<el-col :span="12">
    					<div class="screen_card">
		    				<div class="p-3">
		    					<div class="content_title">
		                <h4 class="fs_20 m-0 font-weight-normal">基本信息</h4>
		              </div>
		    					<div class="d-flex mt-3">
		    						<!-- 物流门 -->
		    						<div class="door w-50">
			    						<h5 class="font-weight-normal m-0 d-flex align-items-center">
			    							<img src="../assets/images/card_card_title.png" alt="">
			    							<span class="fs_20 text-screen ml-2">{{baseInfo.door.name}}</span>
			    						</h5>
			    						<div class="ml-3 mt-3">
			    							<div class="text-center w-50">
			    								<p class="d-flex align-items-center m-0 mb-2">
			    									<span :class="['dot_rect',baseInfo.door.deviceStatus == 0?'bg-screen':'bg-warning']"></span>
			    									<span class="fs_16">设备状态</span>
			    								</p>
			    								<span class="fs_22 text-screen" v-if="baseInfo.door.deviceStatus == 0">正常</span>
			    								<span class="fs_22 text-warning" v-else>异常</span>
			    							</div>

			    							<div class="text-center w-50 mt-3">
			    								<p class="d-flex align-items-center m-0 mb-2">
			    									<span :class="['dot_rect',baseInfo.door.powerStatus == 0?'bg-screen':'bg-warning']"></span>
			    									<span class="fs_16">电池电量</span>
			    								</p>
			    								<span :class="['mt-3 fs_22',baseInfo.door.powerStatus == 0?'text-screen':'text-warning']">{{baseInfo.door.power}}</span>
			    							</div>
			    						</div>
		    						</div>
		    						<!-- 收货区 -->
		    						<div class="area w-50">
		    							<h5 class="font-weight-normal m-0 d-flex align-items-center">
			    							<img src="../assets/images/card_card_title.png" alt="">
			    							<span class="fs_20 text-screen ml-2">{{baseInfo.area.name}}</span>
			    						</h5>
			    						<div class="ml-3 mt-3">
			    							<p class="d-flex align-items-center m-0 mb-3">
		    									<img src="../assets/images/area_icon_p.png" alt="">
		    									<span class="fs_16 ml-2">收货员：{{baseInfo.area.personNum1}}人</span>
		    								</p>
		    								<p class="d-flex align-items-center m-0 mb-3">
		    									<img src="../assets/images/area_icon_p.png" alt="">
		    									<span class="fs_16 ml-2">配送工：{{baseInfo.area.personNum2}}人</span>
		    								</p>
		    								<p class="d-flex align-items-center m-0 mb-3">
		    									<img src="../assets/images/area_icon_p.png" alt="">
		    									<span class="fs_16 ml-2">叉车工：{{baseInfo.area.personNum3}}人</span>
		    								</p>
		    								<p class="d-flex align-items-center m-0">
		    									<img src="../assets/images/area_icon_car.png" alt="">
		    									<span class="fs_16 ml-2">使用车辆：{{baseInfo.area.carCode}}</span>
		    								</p>
			    						</div>
		    						</div>
		    					</div>
		    				</div>
		    			</div>
    				</el-col>
    				<!-- 该区域人员工作量评估 -->
    				<el-col :span="12">
    					<div class="screen_card">
    						<div class="p-3">
		    					<div class="content_title d-flex justify-content-between align-items-center">
			              <h4 class="fs_20 m-0 font-weight-normal">该区域人员工作量评估</h4>
			              <div class="seats d-flex align-items-center">
			                <template v-for="(ttt,index) in personType">
			                	<span :class="['fs_14 mr-2',ttt.id == typeActive?'text-screen2':'']" @click="typeChange(ttt.id)">{{ttt.label}}</span>
			                </template>
			              </div>
			            </div>
			            <div class="mt-3 personData">
										<!-- Swiper -->
										<swiper ref="mySwiper" :options="swiperOptions">
											<template v-for="(swiper,index) in swiperPersonData">
										    <swiper-slide>
												  <el-row type="flex" justify="space-between" align="middle" class="fs_16">
						            		<el-col :span="4" class="text-warning2">{{index+1}}</el-col>
						            		<el-col :span="5" class="text-primary2">{{swiper.name}}</el-col>
						            		<el-col :span="5" class="text-primary2">{{swiper.post}}</el-col>
						            		<el-col :span="5">
						            			<span>{{swiper.taskNum}}单</span>
						            			<i :class="['icon icon-arrow-up13',swiper.status == 0?'text-screen2':swiper.status == 1?'text-green':'text-red']"></i></el-col>
						            		<el-col :span="5">
						            			<span v-if="swiper.status == 0" class="text-screen2">正常</span>
						            			<span v-else-if="swiper.status == 1" class="text-green">偏低</span>
						            			<span v-else="swiper.status == 2" class="text-red">偏高</span>
						            		</el-col>
						            	</el-row>
										    </swiper-slide>
									    </template>
									    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
									  </swiper>
			            </div>
		    				</div>
    					</div>
    				</el-col>
    			</el-row>

    		</el-col>
    		<!-- 右边 -->
    		<el-col :span="10">
    			<!-- 任务单量分析 -->
		      <div class="screen_card  p-relative">
		        <div class="content_title p-3  d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">任务单量分析</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == chart1Dimension?'text-screen2':'']" @click="chart1Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <p class="info_p text-center m-0 fs_16"><span>当前总任务量：20000</span></p>
		        <my-echart id="chart1" :data="option1" height="158px"></my-echart>
		      </div>

		      <!-- 任务平均执行时间 -->
		      <div class="screen_card  p-relative mt-3">
		        <div class="content_title p-3  d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">任务平均执行时间</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == chart2Dimension?'text-screen2':'']" @click="chart2Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <p class="info_p text-center m-0 fs_16"><span>当前总任务量：20000</span></p>
		        <my-echart id="chart2" :data="option2" height="158px"></my-echart>
		      </div>

		      <!-- 今日收货情况 -->
		      <div class="screen_card  p-relative mt-3">
		        <div class="content_title p-3  d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">今日收货情况</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == chart3Dimension?'text-screen2':'']" @click="chart3Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <my-echart id="chart3" :data="option3" height="158px"></my-echart>
		      </div>

		      <!-- 车辆利用率 -->
		      <div class="screen_card  p-relative mt-3">
		        <div class="content_title p-3  d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">车辆利用率</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == chart4Dimension?'text-screen2':'']" @click="chart4Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <my-echart id="chart4" :data="option4" height="156px"></my-echart>
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
		name: 'thridScreenReceive',
		data () {
			return {
				seatActive:1,// 默认1号机位
				seatIcon:require("@/assets/images/seat.png"),
				seatIconActive:require("@/assets/images/seat_active.png"),
				seats:[
					{
						id:"1",
						label:"1号机",
					},
					{
						id:"2",
						label:"2号机",
					},
					{
						id:"3",
						label:"3号机",
					},
					{
						id:"4",
						label:"4号机",
					},
					{
						id:"5",
						label:"5号机",
					},
					{
						id:"6",
						label:"6号机",
					},
					{
						id:"7",
						label:"7号机",
					},
				],
				videoImg:require("@/assets/images/receive_video.jpg"),
				// 基本信息
				baseInfo:{
					door:{
						name:"1号物流门",
						deviceStatus:"1", // 设备状态 0:正常; 1:异常
						powerStatus:"0", // 电池状态 0:正常; 1:异常
						power:"98%",
					},
					area:{
						name:"收货区",
						personNum1:"1", // 收货员
						personNum2:"1", // 配送工
						personNum3:"1", // 叉车工
						carCode:"001987", // 使用车辆编号
					},
				},
				typeActive:0,// 默认选中的人员类型
				// 人员类型
				personType:[
					{
						id:0,
						label:"收货员"
					},
					{
						id:1,
						label:"叉车员"
					},
					{
						id:2,
						label:"配送员"
					},
				],
				// swiper
				swiperOptions:{
					direction: 'vertical',
					initialSlide:0,//设定初始化时slide的索引
					slidesPerView: 4,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper 
					observeParents:true,//修改swiper的父元素时，自动初始化swiper 
				  autoplay: {
		        delay: 2500,
		        disableOnInteraction: false,
		      },
				},
				// 该区域人员
				swiperPersonData:[
					{
						name:"杨小川",
						post:"操作工",
						taskNum:"78",
						status:"0",// 0:正常，1:偏低，2:偏高
					},
					{
						name:"刘正",
						post:"操作工",
						taskNum:"20",
						status:"1",// 0:正常，1:偏低，2:偏高
					},
					{
						name:"吴大锤",
						post:"操作工",
						taskNum:"180",
						status:"2",// 0:正常，1:偏低，2:偏高
					},
					{
						name:"周雄",
						post:"操作工",
						taskNum:"180",
						status:"0",// 0:正常，1:偏低，2:偏高
					},
					{
						name:"王芳",
						post:"操作工",
						taskNum:"50",
						status:"1",// 0:正常，1:偏低，2:偏高
					},
					{
						name:"刘雅瑟",
						post:"操作工",
						taskNum:"180",
						status:"0",// 0:正常，1:偏低，2:偏高
					},
					{
						name:"赵传",
						post:"操作工",
						taskNum:"50",
						status:"1",// 0:正常，1:偏低，2:偏高
					},
				],
				// 切换维度
        dimension:[
          {id:0,label:"时",},
          {id:1,label:"天",},
          {id:2,label:"月",},
          {id:3,label:"年",},
        ],
        chart1Dimension:0,// 任务单量分析当前选中的维度：时
        chart2Dimension:0,// 任务平均执行时间当前选中的维度：时
        chart3Dimension:0,// 今日收货情况当前选中的维度：时
        chart4Dimension:0,// 车辆利用率当前选中的维度：时
        // 任务单量分析-图表
        option1: {
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
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
                color: 'rgba(44, 110, 246, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(44, 110, 246, 0.8)'
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
        // 任务平均执行时间-图表
        option2: {
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
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
                color: 'rgba(95, 208, 251, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(95, 208, 251, 1)'
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
        // 今日收货情况-图表
        option3: {
          tooltip: {
            trigger: 'axis',
          },

          legend: {
            data: ['收货','出库'],
            top: '0', 
            icon:'circle',
            itemHeight: 12,
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["00:00","04:00","08:00","12:00","16:00","20:00","24:00"],
            axisLabel: {
              interval:1, // 1间隔一个标签显示 
            }
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: '收货',
            data: [120, 230, 190, 210, 300, 300, 500],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(2, 154, 255, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(2, 154, 255, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(69, 157, 224, 0.02)'
                }]),
              },
            },
            symbolSize: 0,
            smooth: true,
          },{
            name: '出库',
            data: [210, 300, 300, 500, 120, 230, 190],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(255, 8, 0, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 8, 0, 0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 8, 0, 0.02)'
                }]),
              },
            },
            symbolSize: 0,
            smooth: true,
          }]
        },
        // 车辆利用率-图表
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
          legend: {
            data: ['车辆'],
            top: '0', 
            icon:'circle',
            itemHeight: 12,
            formatter: function(name) {
            	var code = "0002546";
	            return name + " " + "：" + " " +code;
	          },
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '10%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["00:00","04:00","08:00","12:00","16:00","20:00","24:00"],
            axisLabel: {
              interval:1, // 1间隔一个标签显示 
            }
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: '车辆',
            data: [90, 85, 76, 89, 92, 76, 75],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(118, 66, 217, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(80, 42, 152, 0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(80, 42, 152, 0.02)'
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
			Header,
			MyEchart,
		},
		computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
    },
		methods:{
			// 机位切换
			seatChange(id){
				this.seatActive = id;
				this.videoImg = require("@/assets/images/sps_video.gif");
				console.log(id);
			},
			// 人员类型切换
			typeChange(id){
				this.typeActive = id;
				console.log(id);
			},

			// 任务单量分析切换
      chart1Change(index){
        this.chart1Dimension = index;
        console.log(this.chart1Dimension,'任务单量分析');
      },

      // 任务平均执行时间切换
      chart2Change(index){
        this.chart2Dimension = index;
        console.log(this.chart2Dimension,'任务平均执行时间');
      },

      // 今日收货情况
      chart3Change(index){
        this.chart3Dimension = index;
        console.log(this.chart3Dimension,'今日收货情况');
      },

      // 车辆利用率
      chart4Change(index){
        this.chart4Dimension = index;
        console.log(this.chart4Dimension,'车辆利用率');
      },
		},
	}
</script>

<style>

</style>