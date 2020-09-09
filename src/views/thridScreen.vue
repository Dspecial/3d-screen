<template>
	<dv-full-screen-container class="thridScreen screen_container">
		<thridScreenReceive v-if="type == 0"></thridScreenReceive>
		<thridScreenSPS v-if="type == 1"></thridScreenSPS>

		<thridScreenPerson v-if="type == 2"></thridScreenPerson>
		<thridScreenCar v-if="type == 3"></thridScreenCar>
	</dv-full-screen-container>
</template>

<script>
	import thridScreenReceive from "@/views/thridScreenReceive"
	import thridScreenSPS from "@/views/thridScreenSPS"

	import thridScreenPerson from "@/views/thridScreenPerson"
	import thridScreenCar from "@/views/thridScreenCar"

	export default {
		name: 'thridScreen',
		data () {
			return {
				type:"",// 默认显示收货区域0：收货区域；1：sps拣选；2:人员画像；3：车辆画像
				timer:null,
			}
		},
		components: {
			thridScreenReceive,
			thridScreenSPS,
			thridScreenPerson,
			thridScreenCar,
		},
		beforeDestroy() {
      // 清除定时器
      clearInterval(this.timer);
      this.timer = null;
    },
		mounted(){
			if(!this.isEmpty(this.$route.query.type)){
				this.type = this.$route.query.type;
			}else{
	      //设置定时器
	      var j = 1,num = 2, time = 5000; // 5秒切换一次
	      this.timer = setInterval(()=>{ 
	        var index = j++%num;
	        this.type = index;
	      }, time);
	      this.type = 0;// 默认显示收货区域
			}
		},
		methods:{
			isEmpty(obj){
		    if(typeof obj == "undefined" || obj == null || obj == ""){
		      return true;
		    }else{
		      return false;
		    }
		  },
		},
	}
</script>

<style>

</style>