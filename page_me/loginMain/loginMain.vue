<template>
	<view class="container">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="UserAccount" placeholder="请输入账号" v-model="UserAccount" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="UserPwd" :password="isPassword" placeholder="请输入密码"
						v-model="UserPwd" />
					<uni-icons @click="isPassword=!isPassword" :type="isPassword ? 'eye-slash': 'eye'" size="20">
					</uni-icons>
					<text class="separator">|</text>
					<navigator>忘记密码</navigator>
				</view>

				<view @click="verifySubmit">
					<button type="primary" :disabled="!canLogin" size="default" form-type="submit"
						style="margin: 30px 0px 30px 0px;border-radius: 23px;">登录</button>
				</view>
	
				<view >还没账号？点击此处<text class="rigisterText" @click="formRigister">注册账号</text></view>

				<view v-if="isWechat">
					<view class="line-main">
						<view class="line">
							<view class="line-text">其他方式登录</view>
						</view>
					</view>
					<view class="btn">
						<uni-icons type="weixin" color="green" size="40" @click="loginByWX"></uni-icons>
						<view>微信</view>
					</view>
				</view>
				<view class="checkbox">
					<checkbox-group @change="checkboxChange">
						<label>
							<checkbox :checked="isSelect" :value="isSelect" />
						</label><text>登录代表您已同意</text><text class="privacyText" @click="jumpPrivacy">用户隐私条款</text>
					</checkbox-group>
				</view>

			</form>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		UserLogin
	} from "@/model/user";
	// import CryptoUtil from '@/util/CryptoUtil';
	import {
		userStore
	} from "@/store/user-store";

	import {
		computed,
		toRefs,
		reactive,
	} from 'vue'
	//表单数据校验
	import graceChecker from "@/common/graceChecker"
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import { envStore } from "@/store/envStore";
	import { storeToRefs } from "pinia";
	const userstore = userStore();
	onLoad((e : any) => {
		//收到logout消息，则退出登录
		console.log('onLoad', e)
		if (e.msg == 'logout') {
			userstore.logout()
		}
		uni.getStorage({
			key: 'User',
			success: function (res) {
				const savedData = res.data;
				UserAccount.value = savedData.UserAccount
			},
			fail: function (error) {
				console.error(error);
			}
		});

	})
	const envstore = envStore()
	const { isWechat } = storeToRefs(envstore);

	const {
		UserAccount,
		UserPwd,
		isPassword,
		isSelect,

	} = toRefs(reactive({
		UserAccount: '',
		UserPwd: '',
		isPassword: true,
		isSelect: false
	}))


	// 跳转用户隐私条款页面
	const jumpPrivacy = () => {
		uni.navigateTo({
			url: "./privacyInfo/privacyInfo?value=userPrivacy"
		})
	}
	const canLogin = computed(() => {
		return UserAccount.value.length && UserPwd.value.length && isSelect.value;
	})

	
	const formSubmit = async function (e : any) {
		// 从表单中获取数据
		var formData = e.detail.value;
		// 定义表单规则
		var rule = [{
			name: "UserAccount",
			checkType: "string",
			checkRule: "6,20",
			errorMsg: "账号应为6-20个字符"
		}, {
			name: "UserPwd",
			checkType: "string",
			checkRule: "6,20",
			errorMsg: "密码应为6-20个字符"
		}];

		// 进行表单数据校验
		var checkRes = graceChecker.check(formData, rule);
		if (checkRes) {

			// 创建用户登录对象
			let userLogin = new UserLogin();
			userLogin.UserAccount = formData.UserAccount;
			userLogin.UserPwd = formData.UserPwd;
			try {
				let loginData = {
					deviceId: '',
					platform: '',
					deviceBrand: ''
				};
				uni.getSystemInfo({
					success: function (systemInfo) {
						loginData.deviceId = systemInfo.deviceId;
						loginData.platform = systemInfo.platform;
						loginData.deviceBrand = systemInfo.deviceBrand == undefined ? '' : systemInfo.deviceBrand;
					}
				});
				// 合并 loginData 和 res.data
				userLogin = {
					...userLogin,
					...loginData
				};
			 	 await userstore.loginbyAccountPwd(userLogin)
				
				// uni.navigateTo({
				// 	url:'/pages/me/me'
				// })
			} catch (e) {
				// 处理登录异常情况
				uni.showToast({
					title: e.msg,
					icon: 'error'
				});
				// TODO: 处理异常情况
			}
		} else {
			// 表单校验未通过，显示错误信息
			uni.showToast({
				title: graceChecker.error, // 这里的graceChecker.error应该是graceChecker.check返回的错误信息
				icon: 'error'
			});
		}
	};
	const formReset = function (e) {
		UserAccount.value = '',
			UserPwd.value = ''
	}
	const formRigister = function (e) {
		uni.navigateTo({
			url: "../register/register"
		})
	}

	const loginByWX = () => {
		if (isSelect.value == true) {
			userstore.loginbyWX()
		} else {
			uni.showModal({
				title: '提示',
				content: '请您同意用户隐私条款',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						isSelect.value = false
					}
				}
			})
		}
	}
	// 同意用户协议改变的值
	const checkboxChange = (e : any) => {
		if (e.detail.value.length == 1) {
			isSelect.value = true
		} else {
			isSelect.value = false
		}
	}


	// #ifdef APP-PLUS
	showClose: true     //该代码仅在app中生效
	// #endif


	// #ifdef H5
	showClose: true      //该代码仅在h5中生效
	// #endif


	// #ifdef MP
	showMPLogin: true      //该代码仅在小程序中生效
	// #endif
</script>

<style lang="scss">
	.container {
		padding: 20px;

		.uni-form-item {
			border-bottom: 1px solid #c8c7cc;
			padding: 10px 10px;
			display: flex;
			align-items: center;

			.uni-input {
				flex: 1;
			}

			.separator {
				margin: 0 .5em;
			}

		}

		.uni-btn-v {
			margin-top: 100rpx;
			display: flex;
			align-items: center;
		}

		.btnLoginByWX {
			margin-top: 800rpx;
		}
	}

	.rigisterText {
		font-weight: bold;
		padding-left: 5rpx;
		color: blue;
		text-decoration: underline;
	}

	.line-main {
		background: #fff;
		text-align: center;
		height: 100px;
		line-height: 100px
	}

	.line:before {
		content: '';
		display: block;
		height: 1px;
		width: 100%;
		background-color: #ccc;
		/*颜色需与主题大背景色一致*/
		position: relative;
		top: 50px;
		/*调节线高*/
		left: 0;
	}

	.line-text {
		display: inline-block;
		background: #fff;
		padding: 0 36px 0 36px;
		position: relative;
		font-weight: 500;
	}

	.btn {
		margin-top: -12rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.checkbox {
		.privacyText {
			font-weight: bold;
			padding-left: 5rpx;
			color: blue;
			text-decoration: underline;
		}

		margin-top: 20rpx;
		display: flex;
		justify-content: center;
	}
</style>