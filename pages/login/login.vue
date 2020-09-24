<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left">
				
			</view>
			<view class="top-bar-right" @tap="toSign()">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="mian">
			<view class="title">登陆</view>
			<view class="tag" @tap="testFun2()">您好，欢迎来到野未Chat</view>
			
			<view class="form-login">
				<input type="text" 
							 value=""
							 placeholder="用户名/邮箱"
							 @blur="getUser" />
				<input type="password"
						  value=""
						  placeholder="密码"
							@blur="getPsw"/>		
				<view class="tips">{{ tips }}</view>
				<view class="tips">{{ tipsUser }}</view>
				<view class="tips">{{ tipsPsw }}</view>
			<view class="submit" @tap="testFun1()">登陆</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				psw: '',
				tips: '',
				tipsUser: '',
				tipsPsw: '',
				token:''
			}
		},
		methods: {
			// 跳转到注册页面
			toSign() {
				uni.navigateTo({
					url: '../signup/signup'
				})
			},
			// 获取用户名
			getUser(e) {
				// console.log(e)
				this.user = e.detail.value
				if(this.user == '') {
					this.tipsUser = '请输入用户名'
				}else{
					this.tipsUser = ''
				}
			},
			// 获取密码
			getPsw(e) {
				this.psw = e.detail.value
				if(this.psw == ''){
					this.tipsPsw = '请输入密码'
				}else{
					this.tipsPsw = ''
				}
			},
			// 登陆提交
			login() {
				uni.request({
					url:'http://192.168.146.1:3000/signup/add',
					data: {
						// mail: this.user
						mail:'pengyunjin@163.com',
						name:'彭韵瑾',
						pwd: 'admain'
					},
					method:'POST',
					success: (data) => {
						console.log(data)
					}
				})
			},
			// 登陆页面后台调试
			 testFun1() {
				 uni.request({
				 	url:'http://192.168.146.1:3000/user/update',
					data: {
						id:'5f6a41dac645080b7c98b8c0',
						data:'pengyunjin@163.com',
						type:'email',
						pwd: 'admain'
					},
					method:'POST',
					success: (data) => {
						// this.token = data.data.back.token
						console.log(data)
					}
				 })
			 },
			 testFun2(){
				 uni.request({
				 	url:'http://192.168.146.1:3000/search/user',
					data: {
						data:'彭韵瑾'
					},
					method:'POST',
					success: (data) => {
						console.log(data)
					}
				 })
			 }
		}
	}
</script>

<style lang="scss">
	@import '../../commons/style/common.scss';

	
	
	.mian {
		margin-top: 208rpx;
		// padding: 0 $uni-spacing-col-base;
		width: 100%;
		text-align: center;		
		text-align: left;
		// padding-left: 56rpx;
		
		.title {
			color: $uni-text-color;
			font-size: 48rpx;
			line-height: 56rpx;
			font-weight: 500;
		}
		
		.tag {
			font-size: 40rpx;
			color:$uni-text-color-grey;
			line-height: 56rpx;
		}
		
		.tips {
			margin-top: 20rpx;
			color: $uni-color-error;
		}
		
		.title,.tag {
			margin-left: 32rpx;
			padding: 20rpx 0;
		}
		
		.form-login {
			padding-top: 48rpx;
			padding: 0 32rpx;
			
			input {
				padding-top: 40rpx;
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
			
			::-webkit-input-placeholder {
				color: #aaa;
				font-weight: 400;
			}
			
			.submit {
				width: 520rpx;
				height: 96rpx;
				background-color: $uni-color-primary;
				border-radius: 48rpx;
				box-shadow: 0 50rpx 32rpx -36rpx rgba(355, 338, 49, .4);
				font-weight: 500;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 96rpx;
				text-align: center;
				margin: 80rpx auto;
			}
		}
	}	

</style>
