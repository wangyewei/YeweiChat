<template>
	<view class="contnet">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toLogin()">
				<view class="back-img">
					<image src="../../static/images/common/back.png" />
				</view>
			</view>
			<view class="top-bar-right">
				<!-- <view class="text">注册</view> -->
			</view>
		</view>
		<view class="mian">
			<view class="title">注册</view>
			<view class="tag">您好，欢迎来到野未Chat</view>
			
			<view class="form-login">
				<view class="input-wrap">
					<input type="text"
								 value=""
								 placeholder="请输入用户名"
								 @input="getUser"
								 @blur="validation"/>
					<text class="occupy" v-if="useroccupy">已占用</text>
					<image src="../../static/images/login/right1.png" mode="" v-if="isu"></image>
				</view>
			 <view class="input-wrap">
				<input type="email"
							 placeholder="请输入邮箱"
							 @input="isEmail"
							 @blur="validation"/>
				<text class="occupy" v-if="mailoccupy">已占用</text>
				<text class="invalid" v-if="invalid">无效邮箱</text>
				<image src="../../static/images/login/right1.png" mode="" v-if="ise"></image>
			 </view>
			 <view class="input-wrap">
				<input :type="type"
								value=""
								placeholder="密码"
								@input="getPsw"/>	
				<image :src="lookImg" 
							 mode=""
							 @tap="looks"
							 />		
			 </view>
			<!-- <view class="tips">用户名或密码错误!</view> -->
			<view class="submit"
						:class="[{submit1:isok},{submit2:!isok}]">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'password',
				isu: false,        // 用户名是否可用
				ise: false,        // 邮箱是否可用
				look: false,       // 是否显示密码
				invalid: false,    // 邮箱是否被合法
				occupy: false,     // 是否被占用
				useroccupy: false, // 用户名是否占有
				mailoccupy: false, // 邮箱是否占有
				mail: '',          // 邮箱
				user: '',          // 用户名
				psw: '',           // 密码
				lookImg: require('@/static/images/login/biyan.png'),
				isok: false
			}
		},
		methods: {
			looks() {
				if(this.look) {
					this.type = 'password'
					this.look = !this.look
					this.lookImg = require('@/static/images/login/biyan.png')
				}else {
					this.type = 'text'
					this.look = !this.look
					this.lookImg = require('@/static/images/login/look.png')
				}
			},
			isEmail(e) {
				let mailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				this.mail = e.detail.value
				if(this.mail.length > 0) {
					if(mailreg.test(this.mail)){
						// console.log('right')
						this.invalid = false
					}else {
						// console.log('wrong')
						this.invalid = true
					}
				}
			},
			// 获取用户名
			getUser(e) {
				this.user = e.detail.value
				this.changeColor()
			},
			// 获取密码
			getPsw(e) {
				this.psw = e.detail.value
				this.changeColor()
			},
			// 改变颜色按钮
			changeColor() {
				if(this.isu && this.ise && this.psw.length>5){
					this.isok = true
				}else{
					this.isok = false
				}
			},
			validation() {
				if(this.user.length > 1) {
					this.isu = true
				}else{
					this.isu = false
				}
				if(this.mail.length > 5) {
					this.ise = true
				}else {
					this.ise = false
				}
			},
			// 返回登陆页面
			toLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			
			
		}
	}
</script>

<style lang="scss">
	@import '../../commons/style/common.scss';
	
	.mian {
		margin-top: 108rpx;
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
				border-radius: 48rpx;
				font-weight: 500;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 96rpx;
				text-align: center;
				margin: 80rpx auto;
			}
			
			.submit1 {
				background-color: $uni-color-primary;
				box-shadow: 0 50rpx 32rpx -36rpx $uni-color-primary;
			}
			
			.submit2 {
				background-color: rgba(39, 40, 50 ,2);
				box-shadow: 0 50rpx 32rpx -36rpx rgba(39, 40, 50 ,2);
				color: $uni-text-color-inverse;
			}
		}
		
		.input-wrap {
			position: relative;
			
			.occupy,.invalid{
				font-size: $uni-font-size-base;
				font-weight: 500;
				color: $uni-color-warning;
				// line-height: 88rpx;
				position: absolute;
				right: 0;
				top: 60rpx;
			}
			
			image {
				width: 42rpx;
				height: 22rpx;
				position: absolute;
				right: 0;
				top: 80rpx;
			}
		}
	}	

</style>
