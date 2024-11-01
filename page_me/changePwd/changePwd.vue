<template>
	<view>
		<sy-businessCard></sy-businessCard>
	</view>
	<uni-section title="修改密码" type="line">
		<uni-card :isFull="true" :is-shadow="false">
			<uni-list>
				<uni-list-item title="旧密码">
					<template v-slot:footer>
						<view class="slot-box">
							<uni-easyinput type="password" v-model="UserPwdOld" placeholder="请输入旧密码"
								@blur="checkPassword">
							</uni-easyinput>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item title="新密码">
					<template v-slot:footer>
						<view class="slot-box">
							<uni-easyinput type="password" placeholder="请输入新密码" v-model="UserPwd"
								@blur="verifyCode"></uni-easyinput>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item title="新密码">
					<template v-slot:footer>
						<view class="slot-box">
							<uni-easyinput type="password" placeholder="请确认密码" v-model="unUserPwd" @blur="verifyUnCode">
							</uni-easyinput>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<view class="button">
				<button style="border-radius: 23px;
			border: 1px solid #F8F8F8;background-color: #2979ff;" @click="sumitInfo" :disabled="!isInput">提交修改</button>
			</view>
		</uni-card>
	</uni-section>
</template>
<script lang="ts" setup>
	import {
		reactive,
		toRefs,
		computed
	} from 'vue'
	import { UserService } from "@/api/UserService"
	import {
		userStore
	} from '@/store/user-store'
	import {
		storeToRefs
	} from "pinia"
	import { UserPasswordUpdateDto, UserPasswordVerifyDto } from '../../model/MDM/Dto/MDM/UserDto';
	const userstore = userStore()

	const {
		userInfo,
	} = storeToRefs(userstore);

	// 一次性改多个属性为响应式
	const {
		UserPwdOld,
		UserPwd,
		unUserPwd,
	} = toRefs(reactive({
		UserPwdOld: '',
		UserPwd: '',
		unUserPwd: "",
	}))

	const isInput = computed(() => {
		return UserPwdOld.value.length && UserPwd.value.length && unUserPwd.value;
	})

	// 校验密码接口
	const checkPassword = async () => {
		let checkOldPwd = new UserPasswordVerifyDto()
		// console.log(userInfo.value)
		checkOldPwd.UserPwd = UserPwdOld.value
		checkOldPwd.Id = userInfo.value.Id
		try {
			let data = await UserService.CheckPassword(checkOldPwd)
			console.log(data);
			if (data.result == false) {
				uni.showModal({
					title: "旧密码错误,请重新输入",
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							// console.log(res.confirm);
							UserPwdOld.value = ""
						}
					}
				})
			}
		} catch (err) {
			uni.showToast({
				title: "请登录",
				icon: "none"
			})
			//TODO handle the exception
		}

	}

	const verifyCode = () => {
		const pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=!*_?-]).{8,}$/;
		console.log(pattern.test(JSON.parse(JSON.stringify(UserPwd.value))));
		if (pattern.test(JSON.parse(JSON.stringify(UserPwd.value)))) {
			console.log('进来了吗');
			return true
		} else {
			uni.showModal({
				title: "密码中需包含三种及以上的字符类型(8位以上)",
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						// console.log(res.confirm);
						UserPwd.value = ""
					}
				}
			})
			return false

		}
	}
	//验证两次密码是否一致
	const verifyUnCode = () : boolean => {
		if (unUserPwd.value !== UserPwd.value) {
			uni.showModal({
				title: "两次密码不一致",
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						// console.log(res.confirm);
						unUserPwd.value = ""

					}
				}
			})
			return false
		} else {
			return true
		}
	}
	// 提交修改密码
	const sumitInfo = async () => {
		if (unUserPwd.value !== UserPwd.value) return

		let modifyPwd = new UserPasswordUpdateDto({
			UserPwdOld: UserPwdOld.value,
			UserPwd: UserPwd.value,
			Id: userInfo.value.Id
		})
		try {
			let data = await UserService.ModifyPassword(modifyPwd)
			// console.log('修改密码结果', data);
			if (!!data.token) {
				uni.showToast({
					icon: 'success',
					title: "修改成功",
					duration: 3000
				})
				userstore.logout();
				//修改成功后重新登录
				// userstore.loginbyWX()
				uni.navigateTo({
					url: "/page_me/loginMain/loginMain"
				})
			}
		} catch (e : any) {
			console.log('修改密码失败：', e)
			uni.showToast({
				icon: 'error',
				title: "修改失败",
				duration: 3000
			})
		}
	}
</script>
<style lang="scss">
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;

		.slot-image {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			margin-right: 10px;
			width: 30px;
			height: 30px;
		}

		.uni-easyinput__content-input {
			// width: 150rpx;
		}
	}

	.uni-list-item__content {
		justify-content: center !important;
	}

	.button {
		width: 228px;
		margin: 0 auto;
		margin-top: 20px;
	}
</style>