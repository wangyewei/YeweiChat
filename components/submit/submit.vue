<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img">
					<image src="../../static/images/chatroom/voice.png" 
								 mode=""
								 @tap="records"/>
				</view>
				<textarea auto-height="true" 
									class="chat-send btn" 
									:class="{displaynone: isrecord}"
									@input="inputs"
									v-model="msg"
									@focus="focus"/>
				<view class="record btn"
							:class="{displaynone: !isrecord}"
							@touchstart="touchstart"
							@touchend="touchend"
							@touchmove="touchmove"
							>
					按住说话
				</view>
				<view class="bt-img">
					<image src="../../static/images/chatroom/emoji.png" 
								 mode=""
								 @tap="emoji"/>
				</view>
				<view class="bt-img">
					<image src="../../static/images/chatroom/add.png" 
								 mode=""
								 @tap="more"/>
				</view>
			</view>
			<view class="emoji"
						:class="{ displaynone: !isemoji }">
				<view class="emoji-send">
					<view class="emoji-send-del"
								@tap="emojiBack">
								删除
					</view>
					<view class="emoji-send-bt"
								@tap="emojiSend">
								发送
					</view>
				</view>
				<emoji @emotion="emotion"
							 :height="260" />
			</view>
			
			<view class="more"
						:class="{ displaynone: !ismore }">
				<view class="more-list" 
							@tap="sendImg('album')">
					<image src="../../static/images/chatroom/photo.png"/>
					<text class="more-list-title">图片</text>
				</view>
				<view class="more-list"
							@tap="sendImg('camera')">
					<image src="../../static/images/chatroom/camera.png"/>
					<text class="more-list-title">拍照</text>
				</view>
				<view class="more-list">
					<image src="../../static/images/chatroom/file.png"/>
					<text class="more-list-title">文件</text>
				</view>
				<view class="more-list"
							@tap="chooseLocation()">
					<image src="../../static/images/chatroom/location.png"/>
					<text class="more-list-title">位置</text>
				</view>
				<view class="more-list">
					<image src="../../static/images/chatroom/vedio.png"/>
					<text class="more-list-title">视频</text>
				</view>
			</view>
		</view>
		
		<!-- 录制语音遮罩 -->
		<view class="voice-bg"
					:class="{displaynone: !voicebg}">
			<view class="voice-bg-len">
				<view class="voice-bg-time"
							:style="{width:vlength/0.6 + '%'}">
					{{ vlength }} "
				</view>
			</view>
			<view class="voice-del">上滑取消取消录音</view>
		</view>
	</view>
</template>

<script>
	import emoji from './emoji/emoji.vue'
	
	const recorderManager = uni.getRecorderManager()
	
	export default {
		data() {
			return {
				isrecord: false,
				isemoji: false,
				ismore: false,
				voicebg: false,
				msg: '',
				timer: '',
				vlength: 0,
				pageY: 0,
			};
		},
		components:{
			emoji,
		},
		methods:{
			// 获取高度
			_getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height)
				}).exec();
			},
			// 点击切换音频
			records() {
				this.isrecord = !this.isrecord
				this.isemoji = false
				this.ismore = false
				setTimeout(() => {
					this._getElementHeight()
				}, 10)
			},
			// 点击弹出表情
			emoji() {
				this.isemoji = !this.isemoji
				this.ismore = false
				this.isrecord = false
				setTimeout(() => {
					this._getElementHeight()
				}, 10)
			},
			// 点击弹出更多
			more() {
				this.ismore = !this.ismore
				this.isemoji = false
				this.isrecord = false
				setTimeout(() => {
					this._getElementHeight()
				}, 10)
			},
			// 接收表情
			emotion(e) {
				this.msg = this.msg + e
			},
			// 文字发送
			inputs(e) {
				let chatm = e.detail.value
				let pos = chatm.indexOf('\n')
				if(pos != -1 && chatm.length > 1) {
					this.send(this.msg,0)
				}
				setTimeout(() => {
					this._getElementHeight()
				},10)
			},
			// 输入框聚焦
			focus(){
				this.isemoji = false;
				this.ismore = false;
				setTimeout(() => {
					this._getElementHeight()
				},10)
			},
			// 表情内发送
			emojiSend() {
				if(this.msg.length > 0) {
					this.send(this.msg, 0)
				}
				setTimeout(() => {
					this._getElementHeight()
				},10)
			},
			// 表情退格
			emojiBack() {
				if(this.msg.length > 0){
					this.msg = this.msg.substring(0, this.msg.length-1)
				}
			},
			// 发送消息
			send(msg, type) {
				let data = {
					message: msg,
					types: type
				}
				this.$emit('inputs', data)
				setTimeout(() => {
					this.msg = ''
				}, 0)
				setTimeout(() => {
					this._getElementHeight()
				},10)
			},
			// 发送图片
			sendImg(e) {
				let count = 9;
				if(e == 'album') {
					count = 9
				}else {
					count = 1
				}
				uni.chooseImage({
					count: count,
					sizeType: ['original', 'comperssed'],
					sourceType: [e],
					success: (res) => {
						const filePath = res.tempFilePaths
						for (let i in filePath){
							this.send(filePath[i], 1)
						}
					}
				})
				setTimeout(() => {
					this._getElementHeight()
				},10)
			},
			// 音频处理
			touchstart(e) {
				// 此时的Y轴位置
				this.pageY = e.changedTouches[0].pageY
				let startIndex = 1
				this.voicebg = true
				this.timer = setInterval(() => {
					this.vlength = startIndex
					startIndex++
					if(startIndex > 60) {
						clearInterval(this.timer)
						this.touchend();
					}
				}, 1000)
				recorderManager.start()
			},
			touchend() {
				clearInterval(this.timer)
				recorderManager.stop()
				recorderManager.onStop((res) => {
					let data = {
						voice: res.tempFilePath,
						time: this.vlength
					}
					if(this.voicebg){
						this.send(data, 2);
					}					
					this.vlength = 0
					this.voicebg = false
				})
			},
			touchmove(e) {
				if(this.pageY - e.changedTouches[0].pageY > 200) {
					this.voicebg = false
				}
			},
			// 定位
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						let data = {
							name: res.name,
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude
						}
						this.send(data, 3)
						console.log('位置名称' + res.name)
						console.log('详细地址' + res.address)
						console.log('维度' + res.latitude)
						console.log('经度' + res.longitude)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.submit {
		background-color: rgba(244, 244, 244, .96);
		border-top: 1px solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1002;
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 10rpx;
		
		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}
		
		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}
		
		.chat-send {
			line-height: 44rpx;
		}
		
		.record {
			text-align: center;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
			font-weight: bold;
		}
		
	}
	.displaynone {
		display: none;
	}
	
	.emoji {
		width: 100%;
		height: 460rpx;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, 1);
		
		.emoji-send {
			width: 260rpx;
			height: 104rpx;
			background: rgba(236, 237, 238, .9);
			position: fixed;
			bottom: env(safe-area-inset-bottom);
			right: 0;
			padding-top: 24rpx;
			display: flex;
			
			.emoji-send-bt {
				flex: 1;
				height: 80rpx;
				margin: 0 32rpx 0 20rpx;
				background: rgba(255, 228, 49 ,1);
				border-radius: 240rpx;
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 12rpx;
			}
			
			.emoji-send-del {
				flex: 1;
				height: 80rpx;
				background: #fff;
				border-radius: 240rpx;
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 12rpx;
				margin-left: 24rpx;
			}
		}
	}
	.more {
		width: 100%;
		height: 436rpx;
		background: rgba(236, 237, 238, 1);
		box-shadow: rgba(0, 0, 0, .1);
		bottom: env(safe-area-inset-bottom);
		padding: 0 20rpx;
		box-sizing: border-box;
		
		.more-list {
			width: 25%;
			text-align: center;
			float: left;
			margin-top: 32rpx;

			image {
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 24rpx;
			}
			
			.more-list-title {
				color: rgba(30, 40, 50, .5);
				line-height: 34rpx;
				font-size: 24rpx;
				display: block;
			}
		}
	}
	
	.voice-bg {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1001;
		// position: relative;
		
		.voice-bg-len {
			height: 84rpx;
			width: 600rpx;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			background: rgba(255, 255, 255, .2);
			border-radius: 42rpx;
			text-align: center;
			.voice-bg-time {
				display: inline-block;
				line-height: 84rpx;
				background-color: $uni-color-primary;
				border-radius: 42rpx;
				min-width: 120rpx;
			}
		}
		
		.voice-del {
			position: absolute;
			bottom: 148rpx;
			margin-bottom: env(safe-area-inset-bottom);
			width: 100%;
			text-align: center;
			 color: #fff;
			 font-size: $uni-font-size-base;
		}
	}
</style>
