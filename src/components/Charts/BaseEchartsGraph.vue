<template>
    <div :id=id :data=data :style="{height:height,width:width}"></div>
</template>

<script>
  export default {
    name: "BaseEchartsGraph",
    data(){
      return{
        ChartGraph:null,
      }
    },
	  // 深度监听 父组件刚开始没有值，只有图标的配置项
	  // 父组件ajax请求后改变数据的值，传递过来，图标已生成，监听传过来的值的改变
    watch:{
      data:{
        handler(newvalue,oldvalue) {
          this.drawGraph(this.id,newvalue);
        }
      },
      deep:true
    },
	  props: {
	  	id: String,
	  	data: Object,
	    width: {
	      type: String,
	      default: "100%"
	    },
	    height: {
	      type: String,
	      default: "300px"
	    },
	  },
    mounted() {
      this.drawGraph(this.id,this.data);
    },
    methods:{
      drawGraph(id,data){
        let _this = this;
        // 基于准备好的dom，初始化echarts实例,并使用自定义主题 customedTheme
        let myChart = document.getElementById(id)
        this.ChartGraph = this.$echarts.init(myChart,"customedTheme")
        this.ChartGraph.on('click', function (handler,context){
            _this.$emit('func',handler,context);
        })
        // 绘制图表
        this.ChartGraph.setOption(data);
        // 保持自适应
        window.addEventListener("resize",function () {
          _this.ChartGraph.resize();
        })
      },
    },
    beforeDestroy() {
      if(this.ChartGraph){
        this.ChartGraph.clear();
      }
    }
  }
</script>

<style scoped>

</style>
