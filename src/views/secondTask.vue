<template>
	<div class="p-absolute secondHome secondTask">
		<!-- 右边 -->
		<div class="second_right p-absolute">
		  <!-- 任务单区域分布 -->
		  <div class="screen_card">
		    <div class="content_title p-3">
		      <h4 class="fs_20 m-0 font-weight-normal">任务单区域分布</h4>
		    </div>
		    <my-echart id="taskChart1" :data="taskOption1" height="330px"></my-echart>
		  </div>

		  <!-- 任务单类型分布 -->
		  <div class="screen_card taskType mt-3">
		  	<div class="pt-3 pl-3 pr-3 pb-2">
			    <div class="content_title">
			      <h4 class="fs_20 m-0 font-weight-normal">任务单类型分布</h4>
			    </div>
			    <div class="mt-4">
			    	<template v-for="(task,index) in taskType">
			    		<div class="d-flex align-items-center mb-4">
			    			<span class="fs_16 text-primary w-20">{{task.name}}</span>
			    			<div class="w-100">
			    				<el-progress :text-inside="true" :stroke-width="16" :color="task.color" :percentage="task.percentage" :width="70"></el-progress>
			    			</div>
			    		</div>
			    	</template>
			    </div>
		    </div>
		  </div>
		</div>
		<!-- 下边 -->
		<div class="second_bottom p-fixed">
			<el-row :gutter="15">
				<!-- 基本情况  -->
				<el-col :span="6">
				  <div class="screen_card taskBaseInfo" style="height:210px;overflow: hidden">
				  	<div class="p-3">
					    <div class="content_title">
					      <h4 class="fs_20 m-0 font-weight-normal">基本情况</h4>
					    </div>
					    <el-row type="flex" :gutter="15" align="middle" class="mt-3">
			        	<el-col :span="8" class="p-relative text-center">
			        		<el-progress type="circle" :percentage="baseInfo.percentage" :stroke-width="13" :width="105" :color="baseInfo.color"></el-progress>
			        		<span :style="{color:baseInfo.color}" class="p-absolute name">已完成</span>
			        	</el-col>
			        	<el-col :span="16" class="text-center">
			        		<div class="angle_bg1">
			        			<div class="d-flex align-items-center justify-content-center p-2">
			        				<span class="opacticy-80">总任务单量：</span>
			        				<span class="text-screen2 fs_24">{{baseInfo.total}}单</span>
			        			</div>
			        		</div>
			        		<div class="mt-2 d-flex">
				        		<div class="w-50 pr-1 text-center">
				        			<div class="angle_bg2 p-3">
				        				<p class="opacticy-80">已完成</p>
				        				<span class="text-screen2 fs_24">{{baseInfo.completed}}单</span>
				        			</div>
				        		</div>
				        		<div class="w-50 pl-1 text-center">
				        			<div class="angle_bg2 p-3">
				        				<p class="opacticy-80">未完成</p>
				        				<span class="text-screen2 fs_24">{{baseInfo.unfinished}}单</span>
				        			</div>
				        		</div>
			        		</div>
			        	</el-col>
			        </el-row>
				    </div>
				  </div>					
				</el-col>

				<!-- 任务单量趋势  -->
				<el-col :span="6">
				  <div class="screen_card">
				  	<div class="content_title p-3 d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">任务单量趋势</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == taskChart2Dimension?'text-screen2':'']" @click="taskChart2Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <p class="fs_16 m-0 text-center" style="margin-top:-10px!important;">显示文字</p>
		        <my-echart id="taskChart2" :data="taskOption2" height="137px"></my-echart>
				  </div>					
				</el-col>

				<!-- 任务平均执行时间  -->
				<el-col :span="6">
				  <div class="screen_card">
						<div class="content_title p-3 d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">任务平均执行时间</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == taskChart3Dimension?'text-screen2':'']" @click="taskChart3Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <p class="fs_16 m-0 text-center" style="margin-top:-10px!important;">显示文字</p>
		        <my-echart id="taskChart3" :data="taskOption3" height="137px"></my-echart>
				  </div>					
				</el-col>

				<!-- 任务执行情况分析结论  -->
				<el-col :span="6">
				  <div class="screen_card">
				  	<div class="p-3">
					  	<div class="content_title">
			          <h4 class="fs_20 m-0 font-weight-normal">任务执行情况分析结论</h4>
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
		name: 'secondTask',
		data () {
			return {
				// 任务单区域分布
				taskOption1:{
	        color:["#5A62FF","#2D39FF","#FFC700","#F7622E"],
	        title: {
            text: '总任务\n \n1200',
            x: 'center',
            y: '32%',
            textStyle: {
              color: '#fff',
              fontStyle: 'normal', //字体风格,'normal','italic','oblique'
              fontWeight: '500', //字体粗细
              fontSize: 16,
            }
          },
	        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
	        },
          legend: {
		        orient: 'horizontal',
		        left: "center",
		        bottom:"10",
		        padding: [10, 20],
		        textStyle: {
	            color: "#fff",
	            fontSize:14,
	          },
	          // 使用回调函数
	          formatter: function(name) {
	            var data = [
                {value:420, name:'翻包区'},
                {value:310, name:'SPS拣选区'},
                {value:700, name:'不良品区'},
                {value:180, name:'收货区'},
              ];
	            var total = 0;
	            var tarValue;
	            for (var i = 0, l = data.length; i < l; i++) {
	              total += data[i].value;
	              if (data[i].name == name) {
	                tarValue = data[i].value;
	              }
	            }
	            var p = ((tarValue / total).toFixed(2) * 100);
	            return name + " " + " " + p + "%";
	          },
		        data: ['翻包区', 'SPS拣选区', '不良品区', '收货区']
			    },
	        series: [
            {
              name:'任务单',
              type:'pie',
              center:['50%', '40%'],
              radius: ['38%', '65%'],
              avoidLabelOverlap: false,
              hoverOffset:3,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:420, name:'翻包区'},
                {value:310, name:'SPS拣选区'},
                {value:700, name:'不良品区'},
                {value:180, name:'收货区'},
              ]
            }
	        ]
	    	},
				// 任务单类型分布
				taskType:[
					{
						name:"收货单",
						percentage:60,
					},
					{
						name:"上架单",
						percentage:59,
					},
					{
						name:"拣选单",
						percentage:40,
					},
					{
						name:"配送单",
						percentage:76,
					},
					{
						name:"下架单",
						percentage:65,
					},
				],
		    // 基本情况
		    baseInfo:{
		    	percentage:63,
		    	color:"rgba(92, 228, 235, 1)",
		    	total:"540",
		    	completed:"180",
		    	unfinished:"360",
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
        taskChart2Dimension:0,// 任务单量趋势当前选中的维度：时
        taskChart3Dimension:0,// 任务单量趋势当前选中的维度：时
		    // 任务单量趋势-图表
        taskOption2: {
        	tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var html = params[0].axisValue + '<br/>';
              for (var i = 0; i < params.length; i++) {
                html = html + params[i].marker + params[i].seriesName + ' : ' + params[i].value + ' 单' + '<br/>'
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
            splitNumber:2,
          },
          series: [
            {
              name: '任务单量',
              type: 'line',
              data: [60, 40, 20, 50, 60, 70, 50],
              smooth:true,
              symbol:"none",
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
            },
          ]
        },
        // 任务平均执行时间-图表
        taskOption3: {
          tooltip: {
            trigger: 'axis',
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
            name: '任务单量',
            data: [520, 230, 550, 900, 700, 850, 650],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(99, 195, 239, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(29, 171, 163, 1)'
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
        // 任务执行情况分析结论
        conclusionText:"华清科盛（北京）信息技术有限公司是一家集软硬件系统研发、生产、销售于一体的仓储物流技术企业，在北京、上海和常州分别设有公司。"
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
			// 任务单量趋势维度切换
      taskChart2Change(index){
        this.taskChart2Dimension = index;
        console.log(this.taskChart2Dimension,'任务单量趋势');
      },
      // 任务平均执行时间维度切换
      taskChart3Change(index){
        this.taskChart3Dimension = index;
        console.log(this.taskChart3Dimension,'任务平均执行时间');
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