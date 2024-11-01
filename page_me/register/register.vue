<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext">

			<uni-forms-item name="userName" required>
				<view style="display: flex;flex-direction: row;">
					<text style="line-height: 35px;">姓名:</text>
					<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入姓名"
						v-model="formData.userName" trim="both" />
				</view>
			</uni-forms-item>
			<uni-forms-item name="userTel" required>
				<view style="display: flex;flex-direction: row;">
					<text style="line-height: 35px;">电话:</text>
					<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入电话" v-model="formData.userTel"
						trim="both" @blur="checkTel" />
				</view>
			</uni-forms-item>

			<uni-forms-item name="userAccount" required>
				<view style="display: flex;flex-direction: row;">
					<text style="line-height: 35px;">账号:</text>
					<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入账号"
						v-model="formData.userAccount" trim="both" @blur="checkedAccount" />
				</view>
			</uni-forms-item>
			<uni-forms-item name="userPwd" v-model="formData.userPwd" required>
				<view style="display: flex;flex-direction: row;">
					<text style="line-height: 35px;">密码:</text>
					<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入密码" type="password"
						v-model="formData.userPwd" trim="both" />
				</view>
			</uni-forms-item>
			<uni-forms-item name="pwd2" v-model="formData.pwd2" required>
				<view style="display: flex;flex-direction: row;"><text style="line-height: 35px;">确认密码:</text>
					<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请确认密码" type="password"
						v-model="formData.pwd2" trim="both" />
				</view>
			</uni-forms-item>
			<button class="send-btn" :disabled="!canSubmit" :type="canSubmit ? 'primary' : 'default'" @click="submit">
				注册
			</button>
			<view style="display: block;padding-top: 30rpx;">已有账号?现在去<text class="loginText"
					@click="formLogin">登录</text></view>
			<view class="checkbox">
				<checkbox-group @change="checkboxChange">
					<label>
						<checkbox :checked="isSelect" :value="isSelect" />
					</label><text>注册代表您已同意</text><text class="privacyText" @click="jumpPrivacy">注册隐私条款</text>
				</checkbox-group>
			</view>
		</uni-forms>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		computed,
		ref
	} from 'vue'

	import rules from './validator.js';

	// import {
	// 	URL
	// } from "@/api/url"

	// import {
	// 	userStore
	// } from '../../store/user-store.js';

	// import {
	// 	UserLogin
	// } from '@/model/user'
	import { UserService } from '@/api/UserService';
	import { UserRegisterDto } from '../../model/MDM/Dto/MDM/UserDto.js';
	// 检查电话是否已存在
	const checkTel = async () => {
		let data = await UserService.CheckTelExist({
			UserTel: formData.userTel
		})
		if (data.result == true) {
			uni.showToast({
				title: '手机号已被注册',
				icon: "error",
				duration: 3000
			})
			formData.userTel = ""
		}
	}
	const isSelect = ref(false);
	//获取dom元素
	const form : any = ref(null);

	//表单数据
	const formData : any = reactive({
		"userAccount": '',
		"userName": "",
		"nickName": "",
		"userPwd": "",
		"userTel": '',
		"pwd2": "",
	});


	const jumpPrivacy = () => {
		uni.navigateTo({
			url: '../loginMain/privacyInfo/privacyInfo?value=registerPrivacy',
		})
	}
	const checkboxChange = (e : any) => {
		if (e.detail.value.length == 1) {
			isSelect.value = true
		} else {
			isSelect.value = false
		}
	}
	// 检查账号是否已存在
	const checkedAccount = async () => {
		try {
			let data = await UserService.CheckAccountExist({
				UserAccount: formData.userAccount
			})
			if (data.result == true) {
				uni.showToast({
					title: "账号已存在",
					icon: "none"
				})
				formData.userAccount = ""
			}
		} catch (e) {
			console.log(e);
			//TODO handle the exception
		}

	}



	//计算注册按钮是否可以用
	const canSubmit = computed(() => {
		return formData.userName.length && formData.userPwd.length && formData.pwd2.length && formData.userAccount.length && formData.userTel.length && isSelect.value
	})



	//提交注册
	const submit = () => {
		//表单dom不存在则直接返回
		if (!form || form == null) {
			return
		} else {
			// console.log(form.value)
			uni.showLoading({
				mask: true
			})
			// console.log('formdata', form.value)
			if (!!form.value) {
				form.value.validate().then((res : any) => {
					submitForm(res)
				}).catch((errors : any) => {
					console.log(errors);
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}

	};

	const submitForm = async (params : any) => {
		try {

			const userRegister = new UserRegisterDto();
			userRegister.UserAccount = params.userAccount;
			userRegister.UserName = params.userName;
			userRegister.UserPwd = params.userPwd;
			userRegister.UserTel = params.userTel;

			let data = await UserService.Register(userRegister);
			console.log(data, 'aaa');
			if (!!data) {
				uni.showToast({
					title: "注册成功"
				})
				uni.navigateTo({
					url: "/page_me/loginMain/loginMain"
				})
			}
			// 注册成功

			// const userstore = userStore();
			// let userLogin = new UserLogin();
			// userLogin.UserAccount = params.userAccount;
			// userLogin.UserPwd = params.userPwd;
			// userstore.loginbyAccountPwd(userLogin, '/pages/me/me');
		} catch (err : any) {
			console.log('注册失败，请确认账号:', err);
			// 分析错误原因，根据不同的原因弹窗！
		}
	};

	//跳转到登录页面
	const formLogin = () => {
		uni.navigateTo({
			url: "../loginMain/loginMain"
		})
	}
</script>

<style scoped lang="scss">
	@import url("@/page_me/common/login-page.css");

	.avatarBox {
		justify-content: center;
		align-items: center;
	}

	// .avataBtns {
	// 	display: flex;
	// 	flex-flow: row;
	// 	justify-content: space-around;
	// }

	.checkbox {
		text-align: center;
		margin-top: 20px;

		.privacyText {
			font-weight: bold;
			padding-left: 5rpx;
			color: blue;
			text-decoration: underline;
		}
	}

	.userPhoto {
		height: 150rpx;
		width: 150rpx;
		border-radius: 50%;
		mode: "aspectFit";
	}

	.uni-container {
		padding: 15px;
	}

	.send-btn {
		margin-top: 15px;
		border-radius: 23px;
	}

	.uni-container ::v-deep .uni-forms-item__label {
		width: 15px !important;
	}

	.loginText {
		font-weight: bold;
		padding-left: 5rpx;
		color: blue;
		text-decoration: underline;
	}

	.userTelBox {
		display: flex;
		flex-flow: row;
		justify-items: center;
		justify-content: space-around;

		.telbox {
			width: 60%;
		}

		.Userbtn {
			display: flex !important;
			padding-top: 7rpx;
			width: 40%;
			justify-items: center !important;
		}
	}
</style>