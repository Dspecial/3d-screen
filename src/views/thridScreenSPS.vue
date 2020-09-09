<template>
	<div class="thrid_container receive_container sps_container">
    <!-- 头部header -->
    <Header :title="'小件SPS区域'" :subtitle="'SPS area'"></Header>

    <div class="pl-3 pr-3 pt-3">
    	<!-- 上边 -->
    	<el-row :gutter="20">
    		<!-- 小件SPS区域视频监控 -->
    		<el-col :span="14">
    			<div class="screen_card">
    				<div class="p-3">
    					<div class="content_title d-flex justify-content-between align-items-center">
	              <h4 class="fs_20 m-0 font-weight-normal">小件SPS区域视频监控</h4>
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
    		</el-col>
    		<!-- 当前库存容量 -->
    		<el-col :span="10">
    			<div class="screen_card">
    				<div class="p-3">
    					<div class="content_title">
	              <h4 class="fs_20 m-0 font-weight-normal">当前库存容量</h4>
	            </div>
	            <div class="mt-3">
	            	<swiper class="stockSwiper" :options="stockSwiperOption">
	            		<template v-for="stock in stockList">
		            		<swiper-slide>
								    	<div class="stock_item p-3">
								    		<p class="m-0 d-flex justify-content-between align-items-center">
								    			<span class="text-screen">{{stock.code}}</span>
								    			<span class="fs_12 opacity-60">{{stock.date}}</span>
								    		</p>
								    		<p class="m-0 fs_13">{{stock.name}}</p>
								    		<p :class="['m-0 fs_13',stock.remainStatus == 0?'text-cyan2':stock.remainStatus == 1?'text-yellow':'text-red']">{{stock.remainNum}}个（{{stock.percentage}}）</p>
								    	</div>
								    </swiper-slide>
	            		</template>
							    <div class="swiper-pagination" slot="pagination"></div>
							  </swiper>
	            </div>
    				</div>
    			</div>
    		</el-col>
    	</el-row>
    	<!-- 下边 -->
    	<el-row :gutter="20" class="m-3">
    		<!-- 基本信息 -->
		    <el-col :span="3">
		    	<div class="screen_card">
    				<div class="p-3">
    					<div class="content_title">
                <h4 class="fs_20 m-0 font-weight-normal">基本信息</h4>
              </div>
    					<!-- 拣选区 -->
  						<div class="area mt-3 pb-4">
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
  								<p class="d-flex align-items-center m-0">
  									<img src="../assets/images/area_icon_car.png" alt="">
  									<span class="fs_16 ml-2">使用车辆：{{baseInfo.area.carCode}}</span>
  								</p>
    						</div>
  						</div>
    				</div>
    			</div>
		    </el-col>
		    <!-- 该区域人员工作量评估 -->
		    <el-col :span="7">
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
							    <div class="swiper-pagination" slot="pagination"></div>
							  </swiper>
	            </div>
    				</div>
					</div>
		    </el-col>
		    <!-- 任务单量分析 -->
		    <el-col :span="7">
		      <div class="screen_card">
		        <div class="content_title p-3  d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">任务单量分析</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == chart1Dimension?'text-screen2':'']" @click="chart1Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <my-echart id="chart1" :data="option1" height="200px"></my-echart>
		      </div>
		    </el-col>
		    <!-- 动碰库位数量 -->
		    <el-col :span="7">
		    	<div class="screen_card">
		        <div class="content_title p-3  d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">动碰库位数量</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == chart2Dimension?'text-screen2':'']" @click="chart2Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <my-echart id="chart2" :data="option2" height="200px"></my-echart>
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
		name: 'thridScreenSPS',
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
				stockSwiperOption: {
          slidesPerView: 4,// 一行4个
          slidesPerColumn: 4, // 显示5行
          spaceBetween: 20,
          slidesPerGroup: 4, // 一次滚动4列
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet(index, className) {
              return `<span class="${className} swiper-pagination-bullet-custom fs_16">${index + 1}</span>`
            }
          },
        },
        stockList:[
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"1",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"2",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"0",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"1",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},

        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"2",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"2",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"2",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        	{
        		code:"A01",
        		date:"2020-09-10",
        		name:"六角法兰面螺栓M6+1+ 82",
        		remainStatus:"2",// 0:充足，1:一般，2:缺料
        		remainNum:"826",
        		percentage:"86%",
        	},
        ],
				// 基本信息
				baseInfo:{
					area:{
						name:"SPS拣选区",
						personNum1:"1", // 收货员
						personNum2:"1", // 配送工
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
					spaceBetween: 0,
          mousewheel: true,
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
        chart2Dimension:0,// 动碰库位数量当前选中的维度：时
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
        // 动碰库位数量-图表
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
                color: 'rgba(80, 42, 152, 1)',
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

      // 动碰库位数量切换
      chart2Change(index){
        this.chart2Dimension = index;
        console.log(this.chart2Dimension,'动碰库位数量');
      },
		},
	}
</script>

<style>

</style>