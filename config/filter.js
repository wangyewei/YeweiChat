// tip值>99显示99+
import Vue from 'vue'
// tip值＞99显示99+
Vue.filter('tip', function (tip) {
  if (tip > 99) {
    return '99+'
  }
  return tip
})



export default {
	date(time){
		let oldDate = new Date(time)
		let newDate = new Date()
		var dayNum = "";
		var getTime = (newDate.getTime() - oldDate.getTime())/1000;
	
		if(getTime < 60*5){
				dayNum = "刚刚";
		}else if(getTime >= 60*5 && getTime < 60*60){
				dayNum = parseInt(getTime / 60) + "分钟前";
		}else if(getTime >= 3600 && getTime < 3600*24){
				dayNum = parseInt(getTime / 3600) + "小时前";
		}else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
				dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
		}else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
				dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
		}else if(time >= 3600 * 24 * 30 * 12){
				dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
		}
	
		let year   = oldDate.getFullYear();
		let month  = oldDate.getMonth()+1;
		let day    = oldDate.getDate();
		let hour   = oldDate.getHours(); 
		let minute = oldDate.getMinutes(); 
		let second = oldDate.getSeconds(); 
		if(getTime < 60 * 5) {
			return dayNum+" "+hour+":"+minute;
		}else {
			return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute;
		}
	},
	
	Msgdate(time){
		let oldDate = new Date(time)
		let newDate = new Date()
		var dayNum = "";
		var getTime = (newDate.getTime() - oldDate.getTime())/1000;
	
		if(getTime < 60*5){
				dayNum = "刚刚";
		}else if(getTime >= 60*5 && getTime < 60*60){
				dayNum = parseInt(getTime / 60) + "分钟前";
		}else if(getTime >= 3600 && getTime < 3600*24){
				dayNum = parseInt(getTime / 3600) + "小时前";
		}else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
				dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
		}else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
				dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
		}else if(time >= 3600 * 24 * 30 * 12){
				dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
		}
	
		let year   = oldDate.getFullYear();
		let month  = oldDate.getMonth()+1;
		let day    = oldDate.getDate();
		let hour   = oldDate.getHours(); 
		let minute = oldDate.getMinutes(); 
		let second = oldDate.getSeconds(); 
		if(getTime < 60 * 60 * 12) {
			return dayNum;
		}else if(getTime < 60 * 60 * 24){
			return "昨天" + " " + hour + ":" +minute;
		}else{
			return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute;
		}
	},
	spaceTime(old, now) {
		old = new Date(old)
		now = new Date(now)
		let told = old.getTime()
		let tnow = now.getTime()
		if(told > (tnow + 1000 * 60 * 5)) {
			return now
		}else {
			return ''
		}
	}
}

