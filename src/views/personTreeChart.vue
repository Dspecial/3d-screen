<template>
	<dv-border-box-8 class="pt-4" :backgroundColor="'rgba(83,186,249,0.1)'" :dur="10"  style="height:400px">
		<TreeChart :json="treeData" @click-node="click($event)" />
		<div class="close" title="关闭" @click="close()"><i class="icon icon-cross2 fs_26"></i></div>
	</dv-border-box-8>
</template>

<script>
	import {globalBus} from '@/core/globalBus'; // 引入中央事件总线
	import TreeChart from "vue-tree-chart";// 人员组织架构
	export default {
		name: '',
		data () {
			return {
				treeData:{
					id:"1",
			    name: '焊装车间',
			    image_url: require("@/assets/images/avatar.jpg"),
			    class: ["rootNode"],
			    children: [
			      {
			      	id:"1-1",
			        name: '班组1',
			        image_url: require("@/assets/images/avatar.jpg"),
			      },
			      {
			      	id:"1-2",
			        name: '班组2',
			        image_url: require("@/assets/images/avatar.jpg"),
			        mate: {
			        	id:"1-2",
			          name: '班组2平行',
			          image_url: require("@/assets/images/avatar.jpg"),
			        },
			        children: [
			          {
			          	id:"1-2-1",
			            name: '班组2-1',
			            image_url: require("@/assets/images/avatar.jpg"),
			          },
			          {
			          	id:"1-2-2",
			            name: '班组2-2',
			            image_url: require("@/assets/images/avatar.jpg"),
			          },
			          {
			          	id:"1-2-3",
			            name: '班组2-3',
			            image_url: require("@/assets/images/avatar.jpg"),
			          }
			        ]
			      },
			      {
			      	id:"1-3",
			        name: '班组3',
			        image_url: require("@/assets/images/avatar.jpg"),
			      }
			    ]
  			},
			}
		},
		components: {
			TreeChart
		},
		created () {
		},
		methods:{
			click(e){
				this.$emit('nodeDataFun',e.id)
				//console.log(e);
			},
			close(){
				globalBus.$emit('viewShow', false);
			},
		},
	}
</script>

<style>
.close{
	position: absolute;
	top: -3rem;
	right: -1rem;
	color: #aaa;
	border-radius: 50%;
	border:2px solid #aaa;
	padding: 0.4rem;
	cursor: pointer;
}
</style>