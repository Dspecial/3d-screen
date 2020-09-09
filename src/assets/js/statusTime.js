/*
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2020-08-27 12:21:32
* @Last Modified by:   dxx
* @Last Modified time: 2020-08-27 13:18:32
*/
export default {
	// 得到秒数
	getSeconds(str){
		let len = str.split(':');
		let seconds = 0;
		if(len.length<3){
			seconds = len[0]*3600+len[1]*60;
		}else{
			seconds = len[0]*3600+len[1]*60+len[2]*1;
		}
		return seconds;
	},
	// 得到宽度
	getWidth(startTime,endTime,firstTime,lastTime){ 
		// startTime-->某状态开始的时间；endTime-->某状态结束的时间；firstTime-->企业上班时间；lastTime-->企业下班时间
		let sTime = this.getSeconds(startTime);
		let eTime = this.getSeconds(endTime);
		let fTime = this.getSeconds(firstTime);
		let lTime = this.getSeconds(lastTime);

		let width = ((eTime - sTime)/(lTime-fTime)*100).toFixed(2) + "%";
		return width;
	},
	// 得到left
	getLeft(startTime,firstTime,lastTime){
		let sTime = this.getSeconds(startTime);
		let fTime = this.getSeconds(firstTime);
		let lTime = this.getSeconds(lastTime);
		
		let left = ((sTime - fTime)/(lTime-fTime)*100).toFixed(2) + "%";
		return left;
	}
}