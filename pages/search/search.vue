<template>
	<view class="content">
		<view class="top-bar">			
			<view class="search-wrap">
				<image src="../../static/images/search/search.png" mode=""></image>
				<input type="search"
						   value=""
						   placeholder="搜索用户/群"
						   class="search"
							 @input="search"/>	
			</view>
		
			<view class="top-bar-right">
				<view class="text" @tap="backOne">取消</view>
			</view>
		</view>
		<view class="main" v-if="userarr.length > 0">
			<view class="search-user result">
				<text class="title">用户</text>
				<view class="list user" 
							v-for="(item, index) in userarr"
							:key="index"
							>
					
						<image :src="item.head" mode="" @tap="toUserHome(item.id)"/>
						<text class="names">
							<text class="name" v-html="item.name" />
							<text class="email" v-html="item.email" />
						</text>
					
					<view class="right-btn send" v-if="item.tag == 1">发消息</view>
					<view class="right-btn add" v-if="item.tag == 0">加好友</view>
				</view>
			</view>
			<view class="search-group result">
				<text class="title">群</text>
				<view class="list user">
					<image src="" mode="" />
					<text class="names">
						
					</text>
				</view>
				<view class="btn"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '@/debugdate/debugdate'
	export default {
		data() {
			return {
				userarr: []
			}
		},
		methods: {
			// 获取搜索关键字
			search(e) {
				this.userarr = []
				let searchval = e.detail.value
				
				if(searchval.length >= 1) {
					this.sarchUser(searchval)
				}
			},
			// 寻找关键词匹配用户
			sarchUser(e) {
				let arr = datas.friends();
				let exp = eval("/"+e+"/g");
				for(let i in arr) {
					if(arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1){				
						
						this.isFriend(arr[i])
						
						// 搜索结果高亮 vue渲染模式
						arr[i].name = arr[i].name.replace(exp, "<span style='color:#4AAAFF;'>"+e+"</span>")
						arr[i].email = arr[i].email.replace(exp, "<span style='color:#4AAAFF;'>"+e+"</span>")
						this.userarr.push(arr[i])
					}
				}
			},
			isFriend(e) {
				let tag = 0
				let arr = datas.isFriend()
				for(let i in arr) {
					if(arr[i].friend == e.id) {
						tag = 1
					}
				}
				e.tag = tag
			},
			backOne() {
				uni.navigateBack({
					delta: 1
				})
			},
			toUserHome(id) {
				uni.navigateTo({
					url: '../userhome/userhome?id='+id
				})
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
@import '@/commons/style/common.scss';
.top-bar {
	background-color: rgba(255, 255, 255, .96);
	box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, .1);
	
	.search-wrap {
		box-sizing: border-box;
		position: relative;
		
		.search {
			width: 540rpx;
			height: 60rpx;
			background: $uni-bg-color-grey;
			border-radius: 10rpx;
			margin-left: 18rpx;
			padding: 0 60rpx 0 12rpx;
		}
		
		image {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 582rpx;
			top: 11rpx;
		}
		
	}
	
}

.main {
	// margin-top: 88rpx;
	padding: 88rpx $uni-spacing-col-base;
	
	.result {
		padding-top: $uni-spacing-col-base;
		
		.title {
			font-size: 44rpx;
			font-weight: 600;
			color: $uni-text-color;
			line-height: 60rpx;
		}
		
		.list {
			display: flex;
			width: 100%;
			padding: 20rpx 0;
			height: 80rpx;
			align-items: center;
			position: relative;

				image {
					height: 80rpx;
					width: 88rpx;
					border-radius: $uni-border-radius-base;
				}
				
				.names {
					padding-left: $uni-spacing-col-base;
					
					.name {
						font-size: 36rpx;
						color: $uni-text-color;
						line-height: 50rpx;
						display: block;
					}
					
					.email {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
						// margin-top: -10rpx;
						line-height: 28rpx;
						display: block;
					}
				}
			
			
			.right-btn {
				right: 0;
				position: absolute;
				width: 120rpx;
				height: 48rpx;
				border-radius: 24rpx;
					
				font-size: $uni-font-size-sm;
				font-weight: 400;
				
				line-height: 48rpx;
				text-align: center;
			}
			
			.send {
				background-color: $uni-color-primary;		
				color: $uni-text-color;
			}
			
			.add {
				background-color: rgba(74, 170, 255, .1);
				color: $uni-color-success;
			}
		}
	}
}
</style>
