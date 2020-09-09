<template>
	<div class="p-absolute secondPerson">
		<!-- 右边 -->
		<div class="second_right p-absolute">
			<!-- 人员列表 -->
			<div class="screen_card">
				<div class="p-3">
					<div class="content_title">
			      <h4 class="fs_20 m-0 font-weight-normal">人员列表</h4>
			    </div>
			    <div class="mt-3 listBox">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<template v-for="(person,index) in personList">
								<el-tab-pane :name="person.type">
						    	<div slot="label" class="d-flex align-items-center justify-content-center">
						    		<img :src="activeName == person.type?typeiconActive:typeicon" alt="" width="18">
						    		<span class="fs_16 ml-1">{{person.typelabel}}</span>
						    	</div>
						    	<div class="mt-3">
								    <vue-seamless-scroll  v-if="person.type == activeName" :data="person.listData" :class-option="optionPersonHover" class="seamlessList">
							        <ul class="list_ul">
						            <li v-for="(cell,index) in person.listData" class="d-flex align-items-center justify-content-between pb-3">
						            	<div class="d-flex align-items-center">
						            		<el-avatar shape="square" :size="60" fit="cover" :src="cell.avatar"></el-avatar>
						            		<div class="ml-3">
						            			<p class="m-0 d-flex align-items-center">
						            				<span class="fs_18 mr-3">{{cell.username}}</span>
						            			</p>
						            			<p class="m-0 fs_14 opacity-90 mt-1"><span class="mr-3">编号：{{cell.code}}</span><span>部门：{{cell.dept}}</span></p>
						            		</div>
						            	</div>
						            	<img class="goLink" src="../assets/images/personCell_right.png" alt="" @click="goThree(2)"/>
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
		<div class="second_middle p-fixed">
      <transition name="el-zoom-in-center">
        <personTreeChart @nodeDataFun="getNodeData" v-show="isView"></personTreeChart>
      </transition>
    </div>
		<div class="second_bottom p-fixed">
			<el-row :gutter="20">
				<!-- 基本情况  -->
				<el-col :span="6">
				  <div class="screen_card base_info">
				  	<div class="p-3">
					    <div class="content_title">
					      <h4 class="fs_20 m-0 font-weight-normal">基本情况</h4>
					    </div>
					    <el-row :gutter="15">
					    	<el-col :span="13">
					    		<div class="d-flex justify-content-between align-items-center mt-2">
						    		<img src="../assets/images/charge_person.png" alt="" width="48" class="img-fluid">
						    		<div>
						    			<span class="fs_24 text-screen">{{baseInfo.chargePerson}}</span>
						    			<p class="fs_14 m-0 mt-1 opacity-80">负责人</p>
						    		</div>
						    		<img src="../assets/images/team_icon.png" alt="" width="50" class="img-fluid" @click="viewTeam" style="cursor: pointer">
					    		</div>
					    		<div class="mt-2">
					    			<h5 class="font-weight-normal m-0 fs_16">车间人数</h5>
					    			<div class="personNum fs_30 mt-2 text-center">{{baseInfo.personNum}}</div>
					    		</div>
					    	</el-col>
					    	<el-col :span="11" class="teamList">
					    		<template v-for="item in baseInfo.teamList">
					    			<p class="m-0 mt-2 text-center">
						    			{{item.label}}<span class="ml-3 mr-3 fs_20">{{item.value}}</span>人
						    		</p>
					    		</template>
					    	</el-col>
					    </el-row>
				    </div>
				  </div>					
				</el-col>

				<!-- 人员利用率  -->
				<el-col :span="6">
				  <div class="screen_card">
				  	<div class="content_title p-3 d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">人员利用率</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == personChart1Dimension?'text-screen2':'']" @click="personChart1Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <my-echart id="personChart1" :data="personOption1" height="147px"></my-echart>
				  </div>					
				</el-col>

				<!-- 人员效率  -->
				<el-col :span="6">
				  <div class="screen_card">
				  	<div class="content_title p-3 d-flex justify-content-between align-items-center">
		          <h4 class="fs_20 m-0 font-weight-normal">人员效率</h4>
		          <div class="dimension">
		            <template v-for="(d,index) in dimension">
		              <span :class="['fs_14 mr-2',d.id == personChart2Dimension?'text-screen2':'']" @click="personChart2Change(d.id)">{{d.label}}</span>
		            </template>
		          </div>
		        </div>
		        <my-echart id="personChart2" :data="personOption2" height="147px"></my-echart>
				  </div>					
				</el-col>

				<!-- 分析结论  -->
				<el-col :span="6">
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
	import {globalBus} from '@/core/globalBus'; // 引入中央事件总线
	import personTreeChart from "@/views/personTreeChart";
	export default {
		name: 'secondPerson',
		data () {
			return {
				activeName:"1", // 1：收货员、2：入库员 、3：叉车工、4：拣配员、5：牵引工
				typeicon:require("@/assets/images/personType.png"),
				typeiconActive:require("@/assets/images/personType_active.png"),
				// 人员类型+列表数据
				personList:[
					{
						type:"1",
						typelabel:"收货员",
						listData:[
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"潘石屹",
								code:"385468",
								dept:"焊装"
							},
						],
					},
					{
						type:"2", 
						typelabel:"入库员",
						listData:[
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"杨小川",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"杨小川",
								code:"385468",
								dept:"焊装"
							},
						],
					},
					{
						type:"3",
						typelabel:"叉车工",
						listData:[
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"王大锤",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"王大锤",
								code:"385468",
								dept:"焊装"
							},
						],
					},
					{
						type:"4",
						typelabel:"拣配员",
						listData:[
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"张达也",
								code:"385468",
								dept:"焊装"
							},
						],
					},
					{
						type:"5",
						typelabel:"牵引工",
						listData:[
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"张全蛋",
								code:"385468",
								dept:"焊装"
							},
							{
								avatar:require("@/assets/images/avatar.png"),
								username:"张全蛋",
								code:"385468",
								dept:"焊装"
							},
						],
					},
				],
				// 基本情况
				baseInfo:{
					chargePerson:"张学剑",
					personNum:"160",
					teamList:[
						{
							label:"收货组",
							value:"15",
						},
						{
							label:"供给组",
							value:"60",
						},
						{
							label:"叉车组",
							value:"15",
						},
						{
							label:"财务组",
							value:"28",
						},
					],
				},
				// 显示班组架构
				isView:false,
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
        personChart1Dimension:0,// 人员利用率当前选中的维度：时
        personChart2Dimension:0,// 人员效率当前选中的维度：时
        // 人员利用率-图表
        personOption1: {
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
            name: '库存周转率',
            data: [72, 43, 59, 71, 60, 35, 55],
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(76, 30, 171, 1)',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(76, 30, 171, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(86, 30, 171, 0.03)'
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
        // 人员效率-图表
        personOption2: {
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
            name: '库存周转率',
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
			personTreeChart
		},
		computed: {
			optionPersonHover () {
				return {
					hoverStop: true, //是否悬停
					singleHeight:78,  // 单行停顿
					waitTime:3000, //单行停顿时间
				}
			}
    },
    created () {
      var _this = this;
      globalBus.$on('viewShow', (val) => {
        _this.isView = val;
      });
		},
    methods:{
    	// 切换人员type
    	handleClick(tab, event) {
        console.log(tab, event);
      },
      // 人员利用率维度切换
      personChart1Change(index){
        this.personChart1Dimension = index;
        console.log(this.personChart1Dimension,'人员利用率');
      },
      // 人员效率维度切换
      personChart2Change(index){
        this.personChart2Dimension = index;
        console.log(this.personChart2Dimension,'人员效率');
      },
      // 查看班组架构
			viewTeam(){
				this.isView = !this.isView;
				console.log(this.isView);
				globalBus.$emit('teamShow', this.isView);
			},
			// 从人员结构的子组件拿到点击的班组的id
	    getNodeData(data) {
	      this.nodePersonId = data;
	      console.log(this.nodePersonId, "此时点击的班组的id");
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