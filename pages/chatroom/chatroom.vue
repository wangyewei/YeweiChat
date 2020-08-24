<template>
	<view class="content">
	
	<!-- 头部 -->
	<view class="top-bar">
		<view class="top-bar-left" @tap="backOne()">
			<view class="back-img">
				<image src="@/static/images/common/back.png" />
			</view>
		</view>
		<view class="top-bar-center title">
			<text>水原希子kiko</text>
		</view>
		<view class="top-bar-right search pice">
			<view class="group-img">
				<image src="@/static/images/index/friend-list/kiko.jpg"
							 mode=""/>
			</view>
		</view>
	</view>
	
	<scroll-view scroll-y="true"
							 class="chat"
							 scroll-with-animation="isanimation"
							 :scroll-into-view="scrollToView"
							 @scrolltoupper="nextPage">
		<view class="chat-main"
					:style="{paddingBottom:inputh + 'px'}">
			<view class="loading"
						:class="{displaynone:isload}">
				<image src="@/static/images/chatroom/load.png" 
							 mode=""
							 class="loading-img"
							 :animation="animationData"/>
			</view>
			<view class="chat-ls" v-for="(item, index) in msgs"
													  :key="index"
														:id="'msg' + item.tip">
				<view class="chat-time" v-if="item.time != ''">{{ item.time | Msgdate }}</view>
				
				<view class="msg-m msg-left" v-if="item.id != 1">
					<image :src="item.imgUrl" 
								 mode=""
								 class="user-img" />
					<!-- text -->
					<view class="message" v-if="item.types == 0">
						<view class="msg-text">{{ item.message }}</view>
					</view>
					<!-- image -->
					<view class="message" v-if="item.types == 1">
						<image :src="item.message" 
									 class="msg-img"
									 mode="widthFix"
									 @tap="previewImage(item.message)"/>
					</view>
					<!-- voice -->
					<view class="message" v-if="item.types == 2">
						<view class="msg-text voice"
									:style="{width:item.message.time * 4 + 'px'}"
									@tap="playVoice(item.message.voice)">
							<image src="../../static/images/chatroom/sound.png" 
										 mode=""
										 class="voice-img"/>
							{{ item.message.time }} "
						</view>
					</view>
					<!-- location -->
					<view class="message" v-if="item.types == 3">
						<view class="msg-map"
									@tap="openLocation(item.message)">
							<view class="map-name">{{ item.message.name }}</view>
							<view class="map-address">{{ item.message.address }}</view>
							<image src="../../static/images/chatroom/map.jpg" 
										 mode="aspectFit" 
										 class="map-img"/>
						</view>
					</view>
					
				</view>
				
				<view class="msg-m msg-right" v-if="item.id == 1">
					<image :src="item.imgUrl" 
								 mode=""
								 class="user-img" />
					<view class="message" v-if="item.types == 0">
						<view class="msg-text">{{ item.message }}</view>
					</view>
					<view class="message" v-if="item.types == 1">
						<image :src="item.message" 
									 class="msg-img"
									 mode="widthFix"
									 @tap="previewImage(item.message)"/>
					</view>
					<!-- voice -->
					<view class="message" v-if="item.types == 2">
						<view class="msg-text voice"
									:style="{width:item.message.time * 4 + 'px'}"
									@tap="playVoice(item.message.voice)">
							{{ item.message.time }} "
							<image src="@/static/images/chatroom/sound.png"
										 mode=""
										 class="voice-img"/>
						</view>
					</view>
					<!-- location -->
					<view class="message" v-if="item.types == 3">
						<view class="msg-map"
									@tap="openLocation(item.message)">
							<view class="map-name">{{ item.message.name }}</view>
							<view class="map-address">{{ item.message.address }}</view>
							<!-- <map class="map"
									 :latitude="item.message.latitude"
									 :longitude="item.message.longitude"
									 :markers="covers(item.message)"/> -->
							<image src="../../static/images/chatroom/map.jpg"
										 mode="aspectFit" 
										 class="map-img"/>
						</view>
					</view>
				</view>
				
				
			</view>
			
		</view>
		<!-- <view class="padbt"></view> -->
	</scroll-view>
	<submit @inputs="inputs" 
					@heights="heights"/>
	</view>
</template>

<script>
	import datas from  '@/debugdate/debugdate.js'
	import filter from '@/config/filter.js'
	import submit from '@/components/submit/submit.vue'
	
	const innerAudioContext = uni.createInnerAudioContext()
	
	export default {
		data() {
			return {
				msgs: [],
				imgMsg: [],
				oldTime: new Date(),
				scrollToView: '',
				inputh: '72',                 
				animationData: {},            // 动画
				nowpage: 0,                   // 页码
				loading: '',                  // 滚动事件
				isload: true,
				isanimation: true,
				begainloading: true
			};
		},
		components:{
			submit,
		},
		onLoad() {
			this._getMsg(this.nowpage)
			// this.nextPage()
		},
		methods:{
			// 返回键
			backOne() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 滚动顶部加载上一页
			nextPage() {
				
				if(this.nowpage > 0 && this.begainloading) {
					// 出现loading icon
					this.isload = false
					this.begainloading = false
					
					var animation = uni.createAnimation({
						duration: 1000,
						timingFunction: 'step-start'
					})
					
					this.animation = animation
					
					
					let i = 1
					this.loading = setInterval(function() {
						animation.rotate(i * 30).step()
						this.animationData = animation.export()
						i++
						// 滑动加载数据
						if(i > 40) {
							this._getMsg(this.nowpage)
						}
						
					}.bind(this), 100)
				}
				
				
			},
			// 获取聊天数据
			_getMsg(page) {
				// 页数加1
				let msg = datas.message()			
				let maxpages = msg.length
				
				if(msg.length > (page + 1) * 10) {
					maxpages = (page + 1) * 10
					this.nowpage++
				}else {
					// 数据获取完毕
					this.nowpage = -1
				}
				
				// 数据分页加载 每十条为一页
				for(var i = page * 10; i < maxpages; i++){
					msg[i].imgUrl = '../../static/images/index/friend-list/'+msg[i].imgUrl
					// 时间间隔
					if(i < msg.length-1){
						let t = filter.spaceTime(this.oldTime, msg[i].time)
						if(t){
							this.oldTime = t
						}
						msg[i].time = t
					}
					// 补充图片地址
					if(msg[i].types == 1){
						msg[i].message = '../../static/images/index/friend-list/'+msg[i].message
						this.imgMsg.unshift(msg[i].message)
					}
					this.msgs.unshift(msg[i])
				}
				
				this.$nextTick(() => {
					this.isanimation = false
					this.scrollToView = 'msg' + this.msgs[maxpages - page * 10 - 1].tip
				})
				// 数据加载完毕关闭动画，停止数据加载
				clearInterval(this.loading)
				// 关闭loading icon
				this.isload = true
				// 开启加载
				this.begainloading = true
			},
			// 预览图片
			previewImage(e) {
				
				let index = 0
				for(var i =0; i < this.imgMsg.length; i++){
					if(this.imgMsg[i] == e) {
						index = i
					}
				}
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// 音频播放
			playVoice(e) {
				console.log('ok')
				innerAudioContext.src = e
				innerAudioContext.play()
			},
			// 接收输入内容
			inputs(e) {
				this.isanimation = true
				let len = this.msgs.length -1				
				let nowTime = new Date()				
				let t = filter.spaceTime(this.oldTime, nowTime)
				if(t){
					this.oldTime = t
				}
				nowTime = t
				let sendMsg = {
					id: 1,
					imgUrl: '../../static/images/index/friend-list/me.jpg',
					message: e.message,
					types: e.types,
					time: nowTime,
					tip: len
				}
				this.msgs.push(sendMsg)
				this.$nextTick(() => {
					this.scrollToView = 'msg' + len
				})
				if(e.types == 1) {
					this.imgMsg.push(e.message)
				}
			},
			// 输入框高度
			heights(e) {
				this.inputh = e
				this.goBottom()
				// console.log('高度' + e)
			},
			// 滚动到底部
			goBottom() {
				this.isanimation = true
				this.scrollToView = ''
				this.$nextTick(() => {
					let len = this.msgs.length -1
					this.scrollToView = 'msg' + this.msgs[len].tip
				})
			},
			// 地图定位
			covers(e) {
				let map = [
					{
						latitude: e.latitude,
						longitude: e.longitude,
						iconPath: '../../static/images/chatroom/placeholder-r.png'
					}
				]
				return (map)
			},
			// 导航
			openLocation(e) {
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: () => {
						console.log('success')
					}
				})
			},
		},
		filters:{
			Msgdate(time) {
			 return	filter.Msgdate(time)
			}
		}
	}
	
</script>

<style lang="scss">	
	@import '../../commons/style/common.scss';
	.padbt {
		height: var(--status-bar-height);
		width: 100%;
	}
	page {
		height: 100%;
	}
	.content {
		height: 100%;
		background: rgba(244, 244, 244, 1);
		// background: #2C405A;
	}
	
	.top-bar {
		background: rgba(244, 244, 244, .96);
		// box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, .1);
		border-bottom: 1px solid $uni-border-color;
		
		.group-img {
			image{
				position: absolute;
				bottom: 10rpx;
				right: $uni-spacing-col-base;
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
				// justify-content: center;
			}
		}
	}

	.chat {
		height: 100%;
		
		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			// padding-bottom: 120rpx;
			display: flex;
			flex-direction: column;
			
			.loading {
				text-align: center;
				
				.loading-img {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
		
		.chat-ls {
			
			.chat-time {
				font-size: $uni-font-size-base;
				color: rgba(39, 40, 50, .6);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}
			
			.msg-m {
				display: flex;
				padding: 20rpx 0;
				
				.user-img {
					flex: none;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}
				
				.message {
					flex: none;
					max-width: 480rpx;
					
				}
				
				.msg-text {
					font-size: $uni-font-size-lg;
					color: $uni-text-color;
					line-height: 44rpx;
					padding: 18rpx 34rpx;
				}
				
				.msg-img {
					border-radius: $uni-border-radius-base;
					max-width: 400rpx;
				}
				
				.voice {
					width: 200rpx;
					min-width: 110rpx;
					max-width: 400rpx;
					
					.voice-img {
						width: 20px;
						height: 40rpx;
						top: 2rpx;
						// padding-top: -8rpx;
					}
					
				}
				// 陶 我想你
				.msg-map {
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;
					
					.map-name {
						font-size: $uni-font-size-lg;
						color: $uni-text-color;
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					
					.map-address {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-disable;
						padding: 0rpx 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					
					// .map {
					// 	padding-top: 8rpx;
					// 	width: 464rpx;
					// 	height: 190rpx;
					// 	overflow: hidden;
					// }
					
					.map-img {
						width: 464rpx;
						// padding-top: 8rpx;
						height: 310rpx;
						// top: -70rpx;
					}
				}
				
			}
			.msg-left {
				flex-direction: row;
				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0 20rpx 20rpx 20rpx;
				}
				
				.msg-img {
					padding-left: 16rpx;
				}
				
				.msg-map {
					margin-left: 16rpx;
					border-radius: 0 20rpx 20rpx 20rpx;
				}
				
				.voice {
					text-align: right;
					
					.voice-img {
						float: left;			
					}
					
				}
				
			}
			
			.msg-right {
				flex-direction: row-reverse;
				.msg-text {
					margin-right: 16rpx;
					background-color: rgba(255, 228, 49, .8);
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
				
				.msg-img {
					padding-right: 16rpx;
				}
				
				.msg-map {
					margin-right: 16rpx;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
				
				.voice {
					text-align: left;
					
					.voice-img {
						float: right;
						transform: rotate(180deg);					
					}
					
				}
				
			}
		}
		
	}
	.displaynone {
		display: none;
	}
</style>
