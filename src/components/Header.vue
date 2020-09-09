<template>
	<div class="page_title text-screen2">
		<div class="p-relative h-100">
	    <div class="text-center d-flex flex-wrap align-content-center h-100">
				<h2 class="m-0 fs_28 w-100">{{title}}</h2>
	      <p class="fs_14 m-0 mt-1 w-100">{{subtitle}}</p>
	    </div>
	    <div class="title_left d-flex align-items-center p-absolute">
	      <img :src="logo" alt="" class="img-fluid mr-3" width="27"/>
	      <span class="fs_16">华清科盛信息技术有限公司</span>
	    </div>
	    <div class="title_right d-flex align-items-center p-absolute">
	      <span class="fs_16 mr-3">北京大兴区大族广场</span>
	      <span class="fs_16 mr-3">
	      	<i class="el-icon-sunny text-screen2 fs_18 mr-2"></i>	
	      	<span class="mr-2">晴</span>
	      	<span>23℃</span>
	      </span>
	      <span class="fs_16">2020年09月04日</span>
	    </div>
    </div>
	</div>
</template>

<script>
	export default {
		name: '',
		data () {
			return {
				logo:require("@/assets/images/TBL.png"),
			}
		},
		components: {},
	  props: {
	  	title: String,
	  	subtitle: String,
	  },
		methods:{

		},
	}
</script>

<style>

</style>