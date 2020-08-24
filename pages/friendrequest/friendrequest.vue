<template>
	<view class="content">
		
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<view class="back-img">
					<image src="../../static/images/common/back.png" />
				</view>
			</view>
			<view class="top-bar-center">
				<text class="title">好友请求</text>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
			</view>
		</view>
		
		<view class="main">
			
			<view class="requestr" v-for="(item, index) in requestList"
														 :key="index">
				
				<view class="request-top">
					<view class="reject btn">拒绝</view>
					<view class="header-img">
						<image :src="item.head"
									 mode="" 
									 class="header-img"/>
					</view>
					<view class="aggree btn">同意</view>
				</view>
				
				<view class="request-center">
					<view class="title">{{ item.name }}</view>
					<view class="time">{{ item.date | date }}</view>
				</view>
				
				<view class="notic">
					<text>留言：</text>
					<text>{{ item.message }}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import datas from '@/debugdate/debugdate.js'
	import filter from '@/config/filter.js'
	export default {
		data() {
			return {
				requestList: []
			};
		},
		async onLoad() {
			this._FriendRequest()
		},
		methods:{
			// 返回键
			backOne() {
				uni.navigateBack({
					delta: 1
				})
			},
			_FriendRequest() {
				this.requestList = datas.firendsRequest()
			},
		},
		filters:{
			date(time) {
			 return	filter.date(time)
			}
		}
	}
</script>

<style lang="scss">
@import '../../commons/style/common.scss';

	.top-bar {
		background-color: rgba(255, 255, 255, .96);
		// background-color: #42B983;
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, .1);
	}
	
	.main {
		padding: 108rpx $uni-spacing-col-base;
		background: rgba(255, 255, 255, .6);
		
		.requestr {
			margin-top: 112rpx;
			padding: $uni-spacing-col-base;
			background: rgba(255, 255, 255, 1);
			border-radius: $uni-border-radius-base;
			box-shadow: 0px 24rpx 64rpx -8rpx rgba(0, 0, 0, .1);
			
			.request-top {
				display: flex;
				flex-direction: row;
				
				.btn {
					flex: none; 
					width: 160rpx;
					height: 64rpx;
					background: rgba(255, 93, 91, .1);
					border-radius: 40rpx;
					text-align: center;
					font-size: $uni-font-size-lg;
					font-weight: 400;
					line-height: 64rpx;
				}
				
				.reject {
					color: $uni-color-warning;
					background-color: rgba(255, 93, 91, .1);
				}
				
				.aggree {
					color: $uni-text-color;
					background-color: $uni-color-primary;
				}
				
				.header-img {
					margin-top: -52rpx;
					flex: auto;
					text-align: center;
					image {
						width: 144rpx;
						height: 144rpx;
						border-radius: 50%;
					}
				}
				
			}
			
			.request-center {
				text-align: center;
				padding-top: 20rpx;
				padding-bottom: 40rpx;
				
				.title {
					font-size: 36rpx;
					font-weight: 500;
					color: $uni-text-color;
					line-height: 50rpx;
				}
				
				.time {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 34rpx;
				}
				
			}
			
			.notic {
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				line-height: 40rpx;
				padding: $uni-spacing-row-sm $uni-spacing-col-base;
				border-radius: $uni-border-radius-base;
				background: $uni-bg-color-grey;
			}
		}
		
	}
</style>
