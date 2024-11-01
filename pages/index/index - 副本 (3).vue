<template>
	<view>
		<view v-if="autoStatus" class="login-view">
			<image class="logo-img" src="/static/logo.png"></image>
			<view class="login-btn" @click="submitlogin()">
				一键登陆
			</view>
		</view>
		<view v-else>
			不支持一键登陆功能
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoStatus: true
			}
		},
		onLoad() {
			this.isAutoLogin()
		},
		methods: {
			// 判断是否支持一键登陆
			isAutoLogin() {
				let _that = this
				uni.getProvider({ //获取可用的服务提供商
					service: 'oauth',
					success: function(res) {
						console.log(res.provider) // ['weixin', qq', 'univerify']
					}
				});
				uni.preLogin({ //预登录
					provider: 'univerify', //用手机号登录
					success() {
						_that.autoStatus = true
						console.log('预登录成功')
					},

					fail(err) { //预登录失败
						_that.autoStatus = false
						console.log('错误码：' + err.errCode)
						console.log(err.errMsg)
					}
				})
			},
			submitlogin() {
				uni.login({ //正式登录，弹出授权窗
					provider: 'univerify',
					univerifyStyle: { // 自定义登录框样式
						"fullScreen": true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
						"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff 
						"phoneNum": {
							"color": "#2281F5", // 手机号文字颜色 默认值：#000000   
						},
						"authButton": {
							"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5  
							"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
							"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
							"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff  
							"title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”  
						}
					},
					success(res) { // 正式登录成功
						console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}

						// 在得到access_token后，通过callfunction调用云函数
						uniCloud.callFunction({
							name: 'getPhoneNumber', // 云函数名称
							data: { //传给云函数的参数
								'access_token': res.authResult.access_token, // 客户端一键登录接口返回的access_token
								'openid': res.authResult.openid // 客户端一键登录接口返回的openid
							},
							success(callRes) {
								console.log('调用云函数成功' + callRes)
							},
							fail(callErr) {
								console.log('调用云函数出错' + callErr)
							},
							complete() {
								uni.closeAuthView() //关闭授权登录界面
							}
						})
					},
					fail(err) { // 正式登录失败
						console.log(err.errCode)
						console.log(err.errMsg)
						uni.closeAuthView() //关闭授权登录界面
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.logo-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			margin: 100rpx auto;
		}

		.login-btn {
			width: 50%;
			text-align: center;
			background-color: #939393;
			color: #FFFFFF;
			border-radius: 50rpx;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 26rpx;
		}
	}
</style>
