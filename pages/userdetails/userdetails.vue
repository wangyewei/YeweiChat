<template>
	<view class="content">
		
		<!-- 头部 -->
		<view class="top-bar">
			<view class="top-bar-left" @tap="toLogin()">
				<view class="back-img">
					<image src="../../static/images/common/back.png" />
				</view>
			</view>
			<view class="top-bar-center title">
				<text>详情</text>
			</view>
			<view class="top-bar-right search pice">
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="main">
			
			<view class="column heads">
				<view class="row head">
					<text class="title">头像</text>
					<view class="user-head">
						<image-cropper :src="tempFilePath" 
													 @confirm="confirm" 
													 @cancel="cancel" />
				
						<image :src="cropFilePath" 
									 @tap="upload"
									 class="user-img" />
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
				<view class="row">
					<text class="title">签名</text>
					<view class="cont">
						<text>求知若渴，虚心若愚</text>
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
				<view class="row head">
					<text class="title">注册</text>
					<view class="cont">
						<text>2020-06-05 23:37</text>
					</view>
				</view>
			</view>
			
			<view class="column">
				<view class="row">
					<text class="title">昵称</text>
					<view class="cont">
						<text>王野未</text>
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
				<view class="row">
					<text class="title">性别</text>
					<view class="cont">
						<picker @change="bindPickerChange" 
										:value="index" 
										:range="array">
						  <view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
				<view class="row">
					<text class="title">生日</text>
					<view class="cont">
						<picker mode="date" 
										:value="date" 
										:start="startDate" 
										:end="endDate" 
										@change="bindDateChange">
						  <view class="uni-input">{{date}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
				<view class="row">
					<text class="title">电话</text>
					<view class="cont">
						<text>19162757026</text>
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
				<view class="row">
					<text class="title">邮箱</text>
					<view class="cont">
						<text>wangyewei1@foxmail.com</text>
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
			</view>
			
			<view class="column">
				<view class="row">
					<text class="title">密码</text>
					<view class="cont">
						<text>*******</text>
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/right-arrow.png" 
									 mode="aspectFit"/>
					</view>
				</view>
			</view>
			
			<view class="btn2">
				<text>退出登录</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue"
	
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				cropFilePath:'../../static/images/index/top-bar/me.jpg',
				array: ['男', '女', '你猜'],
				index: 0,
				date: currentDate,
				tempFilePath: ''
			};
		},
		components: {
			ImageCropper
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods:{
			// 返回上一级
			toLogin() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 性别选择
			bindPickerChange: function(e) {
			  this.index = e.target.value
			},
			// 日期选择
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
						year = year - 60;
				} else if (type === 'end') {
						year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 头像裁剪
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
							this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = ''
				this.cropFilePath = e.detail.tempFilePath
			},
			cancel() {
				console.log('canceled')
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
		padding-top: 118rpx;
		display: flex;
		flex-direction: column;
		
		.column {
			display: flex;
			flex-direction: column;
			padding-top: 12rpx;
			border-bottom: 1px solid $uni-border-color;
			
			.row {
				display: flex;
				align-items: center;
				// flex-direction: column;
			}
			
			.title {
				flex: none;
				padding-left: $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 112rpx;
				font-weight: 400;
			}
			
			.user-head {
				// display: flex;
				flex: auto;
				padding: 0 $uni-spacing-col-base;
			}
			
			.user-img {
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
			}
			
			.cont {
				flex: auto;
				padding: 0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap
			}
			
			.more {
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;
				
				image {
					width: 80rpx;
					height: 20rpx;
				}
				
			}
		}
		
		.btn2 {
			font-size: 32rpx;
			font-weight: 400;
			text-align: center;
			line-height: 88rpx;
			color:$uni-color-warning;
			margin-top: 160rpx;
		}
	}
</style>
