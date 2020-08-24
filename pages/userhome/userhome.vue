<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<view class="back-img">
					<image src="../../static/images/common/back.png" />
				</view>
			</view>
			<view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/images/userhome/more.png" />
				</view>
			</view>
		</view>
		
		<view class="bg">
			<view class="bg-cover" />
			<image class="bg-img"
						 :src="friendList.head"
						 mode="aspectFill"/>
		</view>
		
		<view class="main">
			<view class="user-header">
				<view class="sex"
							:style="{background:sexcolor}"
							:animation="animationData3">
					<image :src="friendList.sexImg" />
				</view>
				<image :src="friendList.head"
							 mode="aspectFill"
							 class="user-img"
							 :animation="animationData2"
							 :class="{active: isAdd}"
							 />
			</view>
			
			<view class="user-inf">
				<view class="name">{{ friendList.name }}</view>
				<view class="nick">{{ friendList.email }}</view>
				<view class="intro">{{ friendList.intro }}</view>
			</view>
		</view>	
		
		<view class="bottom-bar">
			<view class="bottom-btn btn1" @tap="addFriendAnimate()">添加好友</view>
		</view>
		
		<view class="add-msig"
					:style="{ height: setHight + 'px',bottom: -setHight + 'px' }"
					:animation="animationData">
			<view class="name">{{ friendList.name }}</view>
			<textarea :value="myname+'请求加为好友~'"
								 placeholder=""
								 maxlength="120"
								 class="add-main"/>
		</view>
		
		<view class="add-btn bottom-bar"
					:animation="animationData">
			<view class="close btn1" @tap="addFriendAnimate">取消</view>
			<view class="send btn1">发送</view>
		</view>

	</view>
</template>

<script>
	import datas from '../../debugdate/debugdate.js'
	export default {
		data() {
			return {
				sexcolor: '',     // 性别颜色
					myname: '王野未',                   // 测试数据
					setHight: '',                      // 动态高度值
					animationData: {},                 // 动画
					animationData1: {},                // 动画
					animationData2: {},                // 动画
					animationData3: {},                // 动画
				  isAdd: false,                      // toggle
					id: '',
					friendList:[]
			};
		},
		methods:{
			// 返回键
			backOne() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 动态获取高度
			_getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
					this.setHight = data.height - 186
				}).exec();
			},
			// 添加好友动画
			addFriendAnimate() {
				this.isAdd = !this.isAdd
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				
				var animation1 = uni.createAnimation({
					duration: 600,
					timingFunction: 'ease',
				})
				
				var animation2 = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				
				var animation3 = uni.createAnimation({
					duration: 100,
						timingFunction: 'ease',
				})
				
				if(this.isAdd) {
					animation.bottom(0).step()
					animation1.bottom(0).step()
					animation2.width(120).height(120).translateX(-100).step()
					animation3.opacity(0).step()
				}else{
					animation.bottom(-this.setHight).step()
					animation1.bottom(-100).step()
					animation2.width().height().translateX(0).step()
					animation3.opacity(1).step()
				}
				
				this.animationData = animation.export()
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()

			},
			// 获取数据
			async _getFriends() {
				this.friendList = datas.friends().find((id) => id.id == this.id)
			},
			// 获取性别ICON背景颜色
			async _getSexColor() {
				if(this.friendList.sex == 'famale'){
					this.sexcolor = 'rgba(255, 93, 91, 1)'
				}else {
					this.sexcolor = '#2980b9'
				}
			}
		},
		onReady() {
			this._getElementStyle()
			this._getSexColor()
		},
		onLoad(option) {
			this.id = option.id
			this._getFriends()
		}
	}
</script>

<style lang="scss">
	@import '../../commons/style/common.scss';
	

	
	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		
		
		.bg-cover {
			position: absolute;
			z-index: 999;
			width: 100%;
			height: 100%;
			// background-color: rgba(255, 255, 255 ,.6);
		}
		
		.bg-img {
			opacity: .6;
			position: absolute;
			left: -15rpx;
			top: -88rpx;
			width: 110%;
			height: 110%;
			filter: blur(16rpx);
		}
	}
	
	.main {
		padding-top: 108rpx;
		text-align: center;
		
		
		.user-header {
			width: 412rpx;
			height: 412rpx;
			margin: 0 auto;
			padding-top: 60px;
			position: relative;
			z-index: 2;
			
			.sex {
				position: absolute;
				z-index: 1;
				bottom: 116rpx;
				right: 62rpx;
				width: 65rpx;
				height: 64rpx;
				border-radius: $uni-border-radius-circle;
				
				image {
					width: 32rpx;
					height: 32rpx;
					padding: 16rpx;
				}
				
			}
			
			.user-img {
				width: 300rpx;
				height: 300rpx;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255, 255, 255, .96);
			}
			
			.active {
				border-radius: $uni-border-radius-circle;
				box-shadow: 0 36rpx 40rpx 0 rgba(39, 40, 50, .2);
			}
			
		}
		
		.user-inf {
			margin-top: -58rpx;
			
			.name {
				color: $uni-text-color;
				font-size: 52rpx;
				line-height: 74rpx;
			}
			
			.nick {
				font-size: $uni-font-size-base;
				line-height: 40rpx;
				color: $uni-text-color;
			}
			
			.intro {
				width: 552rpx;
				height: 170rpx;
				font-size: $uni-font-size-base;
				font-weight: 300;
				color: $uni-text-color;
				line-height: 48rpx;
				margin: 0 auto;
			}
			
		}	
		
	}
	
	.bottom-bar {
		.bottom-btn {
			text-align: center;
			background-color: $uni-color-primary;
		}
	}
	
	.add-msig {
		position: fixed;
		
		width: 100%;
		background-color: rgba(255, 255, 255, .96);
		border-radius: 40rpx 40rpx 0 0;
		padding: 0 56rpx;
		box-sizing: border-box;
		
		.name{
			padding: 128rpx 0 40rpx;
			font-size: 52rpx;
			color: $uni-text-color;
			line-height: 74rpx;
		}
		
		.add-main {
			padding: 18rpx 22rpx;
			height: 420rpx;
			width: 100%;
			box-sizing: border-box;
			background-color: rgba(243, 244, 246, 1);
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			line-height: 44rpx;
		}
		
	}
	
	.add-btn {
			bottom: -204rpx;
			z-index: 4;
			display: flex;
			
			.close {
				width: 172rpx;
				margin-right: -10rpx;
				background-color: $uni-bg-color-hover;
				border-radius: $uni-border-radius-sm;
				margin-left: $uni-spacing-col-base;
			}
			
			.send {
				margin-right: $uni-spacing-col-base;	
				flex: auto;			
				background-color: $uni-color-primary;
				border-radius: $uni-border-radius-sm;
			
			}
	}
	
</style>
