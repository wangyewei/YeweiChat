<template>
	<view class="content">
		<view class="top-bar">
			<navigator url="../userdetails/userdetails" hover-class="none" class="top-bar-left">
				<image src="../../static/images/index/top-bar/me.jpg" mode=""></image>
			</navigator>
			<view class="top-bar-center">
				<text class="logo">野未聊天</text>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/index/top-bar/search.png" 
							 class="search"
							 @tap="toSearch"/>
				<image src="../../static/images/index/top-bar/add.png" mode="" class="add"></image>	
			</view>
		</view>
		<view class="main">
			<view class="apply" @click="toFriendRequest">
				<view class="friend-list"
							v-for="(item, index) in apply"
							:key="index">
					<view class="head-wrap">
						<image :src="item.head" 
										class="head"/>
						<view v-if="item.tip != ''" class="tip">{{ item.tip }}</view>
					</view>
					<view class="content-wrap">
						<text class="name">{{ item.name }}</text>
						<text class="mess">{{ item.mess }}</text>
					</view>
					<view class="data-wrap">
						<text class="data">{{ item.data }}</text>
					</view>
				</view>
			</view>
			<view class="friends">
				<view class="friend-list"
							v-for="(item, index) in friendList"
							:key="index"
							v-if="item.mess != ''">
					<view class="head-wrap">
						<image :src="item.head" 
										class="head"/>
						<view v-if="item.tip > 0" class="tip">{{ item.tip | tip }}</view>
					</view>
					<view class="content-wrap">
						<text class="name">{{ item.name }}</text>
						<text class="mess">{{ item.mess }}</text>
					</view>
					<view class="data-wrap">
						<text class="data">{{ item.data | date }}</text>
					</view>
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
				apply:[],
				friendList:[]
			}
		},
		onLoad() {
			this.getFriends(),
			this.getApply()
		},
		methods: {
			getFriends() {
				this.friendList = datas.friends()
			},
			getApply() {
				this.apply = datas.applys()
			},
			toSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			toFriendRequest() {
				uni.navigateTo({
					url: '../friendrequest/friendrequest'
				})
			}
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
			margin-top: 108rpx;
			padding: 0 $uni-spacing-col-base;
			
			.friend-list,.apply {
				display: flex;
				// margin: 40rpx 0;
				padding: 40rpx 0;
				height: 96rpx;
				padding: $uni-spacing-col-sm 0;
				align-items: center;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
				&:active {
					background-color: $uni-bg-color-grey;
				}
				
				.head-wrap {
					position: relative;
					
					
					image {
						width: 96rpx;
						height: 96rpx;
						border-radius: $uni-border-radius-base;
						background-color: $uni-color-primary;
					}
					
					.tip {
						position: absolute;
						top: -6rpx;
						left: 68rpx;
						height: 36rpx;
						min-width: 20rpx;
						min-height: 20rpx;
						background-color: $uni-color-warning;
						border-radius: 18rpx;
						padding: 0 6rpx;
						font-size: $uni-font-size-sm;
						color: $uni-color-primary;
						line-height: 36rpx;
						text-align: center;
					}
				}
				
				.content-wrap {
					margin-left: 32rpx;
					flex: 1;
					
					.name {
						display: block;
						color: $uni-text-color;
						font-size:36rpx;	
						font-weight: 400;
						line-height: 50rpx;
					}
					
					.mess {
						display: block;
						color: $uni-text-color-grey;
						font-size: $uni-font-size-base;
						line-height: 40rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
				}
				
				.data-wrap {
					
					justify-content: right;
					
					.data {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-disable;
						line-height: 50rpx;
					}
				}
			}
			
		}
</style>
