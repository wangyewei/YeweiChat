export default {
	friends() {
		let friendArr = [
			{
				id: 1,
				name: '王野未',
				head: require('@/static/images/index/top-bar/me.jpg'),
				mess: '做个好梦',
				data: new Date(),
				tip: 1,
				email: 'wangyewei1@foxmail.com',
				intro: '求知若渴，虚心若愚',
				sex: 'male',
				sexImg: require('@/static/images/userhome/male.png')
			},
			{
				id: 2,
				name: '孟子',
				head: require('@/static/images/index/friend-list/mengzi.jpg'),
				mess: '所以我也想不通我要睡啥子觉，为了他们晓得',
				data: new Date(),
				tip: 0,
				email: 'mengzi@163.com',
				intro: '我的身体还有我的灵魂都没法知足，所以我也想不通我要睡啥子觉，为了他们晓得，为了妈跟老汉儿，如果我起不来就该被驾驶骂',
				sex: 'male',
				sexImg: require('@/static/images/userhome/male.png')
			},
			{
				id: 3,
				name: '谢帝',
				head: require('@/static/images/index/friend-list/xiedi.jpg'),
				mess: '是学校的赘肉，试卷上躺了我的遗骸，我拿起笔来',
				data: new Date(),
				tip: 2,
				email: 'xiedi@163.com',
				intro: '说唱在我心中还是一如既往的根本不用去想的去讲的保持一贯风靡',
				sex: 'male',
				sexImg: require('@/static/images/userhome/male.png')
			},
			{
				id: 4,
				name: '水原希子',
				head: require('@/static/images/index/friend-list/kiko.jpg'),
				mess: '早点休息哦宝贝',
				data: new Date(),
				tip: 208,
				email: 'kiko@163.com',
				intro: '水原希子（Mizuhara Kiko），1990年10月15日出生于美国德克萨斯州达拉斯。演员、模特。曾是日本杂志《ViVi》及日版《Seventeen》的专属模特',
				sex: 'famale',
				sexImg: require('@/static/images/userhome/famale.png')
			},
			{
				id: 5,
				mess: '吃点串呀',
				data: new Date(),
				tip: 1,
				name: '撸串研究生',
				email: 'luchuanyanjiusheng@foxmail.com',
				head: require('@/static/images/search/searchresultImg1.jpg'),
				intro: '我爱吃串',
				sex: 'male',
				sexImg: require('@/static/images/userhome/male.png')
			},
			{
				id: 6,
				mess: '你发现我了呀',
				data: new Date(),
				tip: 1,
				name: '港城宝藏女孩',
				email: 'gangchengbaozangnvhai@foxmail.com',
				head: require('@/static/images/search/searchresultImg2.jpg'),
				intro: '你在看我主页吗？',
				sex: 'famale',
				sexImg: require('@/static/images/userhome/famale.png')
			},
			{
				id: 7,
				mess: '哦',
				data: new Date(),
				tip: 1,
				name: '不解风情的老妖怪',
				email: 'yimiwuxiaokeai@foxmail.com',
				head: require('@/static/images/search/searchresultImg3.jpg'),
				intro: '为什么给我分配一些情侣头像啊',
				sex: 'male',
				sexImg: require('@/static/images/userhome/male.png')
			},
			{
				id: 8,
				mess: '晚上好呀~',
				data: new Date(),
				tip: 1,
				name: '一米五的小可爱',
				email: 'bujiefengqinglaotaoguai@foxmail.com',
				head: require('@/static/images/search/searchresultImg4.jpg'),
				intro: '个子矮矮，可可爱爱',
				sex: 'famale',
				sexImg: require('@/static/images/userhome/famale.png')
			},
			{
				id: 9,
				mess: '没钱还花呗了呀',
				data: new Date(),
				tip: 5,
				name: '马云背后的女人',
				email: 'ziwofoudingxianquzhe@foxmail.com',
				head: require('@/static/images/search/searchresultImg5.jpg'),
				intro: '马云靠我养',
				sex: 'famale',
				sexImg: require('@/static/images/userhome/famale.png')
			},
			{
				id: 10,
				mess: '我不行',
				data: new Date(),
				tip: 1,
				name: '自我否定先驱者',
				email: 'mayunbeihoudenvren@foxmail.com',
				head: require('@/static/images/search/searchresultImg6.jpg'),
				intro: '国际一级退堂鼓演奏家',
				sex: 'male',
				sexImg: require('@/static/images/userhome/male.png')
			},
			{
				id: 11,
				mess: '乖哦~',
				data: new Date(),
				tip: 5,
				name: '联合国认证小可爱',
				email: 'guojiatejibubaohudongwu@foxmail.com',
				head: require('@/static/images/search/searchresultImg7.jpg'),
				sex: 'famale',
				sexImg: require('@/static/images/userhome/famale.png')
			},
			{
				id: 12,
				mess: '我又被打了',
				data: new Date(),
				tip: 20,
				name: '国家特级不保护动物',
				email: 'lianheguorenzhengxiaokeai@foxmail.com',
				head: require('@/static/images/search/searchresultImg8.jpg'),
				intro: '针对我？',
				sex: 'male',
				sexImg: require('@/static/images/userhome/male.png')
			}
			
			
		]
		return friendArr
	},
	applys(){
		let applyArr = [
			{
				name:'好友申请',
				head: require('@/static/images/index/friend-list/apply.png'),
				mess: '若人生只如初见~',
				tip: '3'
			}
		]
		return applyArr
	},
	isFriend(){
		let isfriend = [
			{
				userid:1,
				friend:2
			},
			{
				userid:1,
				friend:3
			},
			{
				userid:1,
				friend:4
			},
			{
				userid:1,
				friend:5
			},
			{
				userid:1,
				friend:9
			},
			{
				userid:1,
				friend:1,
			}
		]
		return isfriend
	},
	firendsRequest(){
		let friendRequests = [
			{
				name: '马云',
				head: require('@/static/images/friendrequest/mayun.jpg'),
				message: '王总您好，我是阿里巴巴马云，刚才有跟你致电。',
				date: new Date()
			},
			{
				name: '尤雨溪 Evan You',
				head: require('@/static/images/friendrequest/evanyou.jpg'),
				message: '我是Vue.js尤雨溪',
				date: new Date()
			},
			{
				name: '福布斯·中国',
				head: require('@/static/images/friendrequest/Forbes.jpg'),
				message: '王总您好，恭喜您入围2020福布斯富豪排行榜',
				date: new Date()
			}
		]
		return friendRequests
	},
	// 聊天消息
	message(){
		let msgs = [
			// {
			// 	id: 1,
			// 	imgUrl; 'me.jpg',
			// 	message: 'I miss u TaoXingyu',
			// 	types: 0,
			// 	time: new Date(),
			// 	tip: ''
			// },
			{
				id: 4,
				imgUrl: 'kiko.jpg',
				message: '增加数据条数',
				types: 0,
				time: new Date(),
				tip: 13
			},
			{
				id: 4,
				imgUrl: 'kiko.jpg',
				message: '开始写分页加载 2020/8/24',
				types: 0,
				time: new Date(),
				tip: 12
			},
			{
				id: 4,
				imgUrl: 'kiko.jpg',
				message: {
					name: 'Komehyo',
					address: '〒104-0061 東京都中央区銀座５丁目６−12 1F～4F みゆきビル',
					latitude: '35.40159',
					longitude: '139.45488'
				},
				types:3,
				time:new Date(),
				tip: 11
			},
			{
				id: 1,
				imgUrl: 'me.jpg',
				message: {
					name: '春熙路',
					address: '四川省成都市锦江区春熙路',
					latitude: '30.65331',
					longitude: '104.07775'
				},
				types:3,
				time:new Date(),
				tip: 10
			},
			{
				id: 1,
				message: {
					voice: 'b',
					time: 5
				},
				imgUrl: 'me.jpg',
				types: 2,
				time: new Date(),
				tip: 9
			},
			{
				id: 4,
				message: {
					voice: 'a',
					time: 60
				},
				imgUrl: 'kiko.jpg',
				types: 2,
				time: new Date(),
				tip: 8
			},
			{
				id: 1,
				message: '我在写BUG',
				imgUrl: 'me.jpg',
				types: 0,
				time: new Date() - 1000 * 60 * 10,
				tip: 7
			},
			{
				id: 4,
				message: '你还在写代码吗？',
				imgUrl: 'kiko.jpg',
				types: 0,
				time: new Date() - 1000 * 60 * 10,
				tip: 6
			},
			{
				id: 1,
				message: '你每天都好看',
				imgUrl: 'me.jpg',
				types: 0,
				time: new Date() - 1000,
				tip: 5
			},
			{
				id: 4,
				message: 'kiko.jpg',
				imgUrl: 'kiko.jpg',
				types: 1,
				time: new Date() - 1000,
				tip: 4
			},
			{
				id: 4,
				message: '嘻嘻，你看我今天好不好看',
				imgUrl: 'kiko.jpg',
				types: 0,
				time: new Date() - 1000 * 60 * 60,
				tip: 3
			},
			{
				id: 1,
				message: '傻瓜，端午要说安康哦',
				imgUrl: 'me.jpg',
				types: 0,
				time: new Date() - 1000 * 60 * 60,
				tip: 2
			},
			{
				id: 4,
				message: '今天是端午节哦，端午节快乐',
				imgUrl: 'kiko.jpg',
				types: 0,
				time: new Date() - 1000 * 60 * 600 ,
				tip: 1
			},
			{
				id: 4,
				message: '早哦，宝贝',
				imgUrl: 'kiko.jpg',
				types: 0,
				time: new Date() - 1000 * 60 * 600,
				tip: 0
			},
		]
		return msgs
	}
}