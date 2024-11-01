<template>
	<uni-section title="个人信息" type="line">
		<uni-list>
			<uni-list-item title="账号">
				<template v-slot:footer>
					<view class="slot-box">
						<view>{{userDetail.UserAccount}}</view>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="姓名">
				<template v-slot:footer>
					<view class="slot-box">
						<view>{{`${userDetail.UserName}(${userDetail.Id})`}}</view>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="部门/小组">
				<template v-slot:footer>
					<view class="slot-box">
						<view>
							{{`${userDetail.Department.DepartmentInfo}(${userDetail.Department.DepartmentName})`}}
						</view>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="解绑手机">
				<template v-slot:footer>
					<view class="slot-box">
						<view @click="unBindDevice()" class="iconBox">
							<uni-icons type="locked-filled" size="30"></uni-icons>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</uni-section>
	<uni-section title="自定义修改" type="line">
		<uni-card :isFull="true" :isShadow="false">
			<uni-forms :modelValue="userDetail">
				<uni-forms-item>
					<view class="avataBox" @click="changeAvatar">
						<image class="userPhoto" :src="userDetail.UserAvatarUrl"></image>
					</view>
				</uni-forms-item>
				<uni-forms-item label="昵称">
					<uni-easyinput v-model="userDetail.UserNickname" placeholder="请输入昵称" />
				</uni-forms-item>
				<uni-forms-item label="性别">
					<uni-data-checkbox v-model="userDetail.UserSex" :localdata="sexs" />
				</uni-forms-item>
				<uni-forms-item label="家庭住址">
					<uni-easyinput v-model="userDetail.UserAdd" placeholder="请输入家庭住址" />
				</uni-forms-item>
			</uni-forms>
			<button @click="changeInfo" class="button">提交</button>
		</uni-card>
	</uni-section>
</template>
<script lang="ts" setup>
	import {
		reactive,
		toRefs,
		onMounted,
	} from 'vue'
	import {
		userStore
	} from "@/store/user-store";

	import {
		URL
	}
		from "@/api/url"
	import { UserService } from '@/api/UserService';
	import { UserUpdateBaseInfoDto } from '../../model/MDM/Dto/MDM/UserDto';
	import { AppService } from '../../api/AppService';


	// 一次性改多个属性为响应式
	let {
		userDetail,
		sexs
	} = toRefs(reactive({
		userDetail: {
			Department: {},
			Id: 0,
			UserAccount: "",
			UserAdd: "",
			UserAvatarUrl: "",
			UserDepartmentID: 0,
			UserIsResigned: 0,
			UserName: "",
			UserNickname: "",
			UserSex: 1,
			UserTel: "",
		},
		sexs: [{
			text: '男',
			value: 1
		}, {
			text: '女',
			value: 0
		}],
	}))
	const unBindDevice = async () => {
		try {
			const res = await uni.showModal({
				title: '解绑设备',
				content: '确定要解绑设备吗？'
			});

			if (res.confirm) {
				await AppService.delAppDeviceStatusByuserId({ UserId: userDetail.value.Id });
				uni.showToast({
					icon: 'success',
					title: "解绑成功",
				});
			}
		} catch (e) {
			console.log(e);
			// TODO 处理异常
			uni.showToast({
				icon: 'none',
				title: e.data.msg,
			});
		}
	}
	//获取个人详情
	const GetUserSelfDetail = async () => {
		userDetail.value = await UserService.GetUserSelfDetail()
		console.log('修改个人基本信息页面，个人信息：', userDetail);
	}

	// 生命周期
	onMounted(() => {
		GetUserSelfDetail()
	})

	const url = new URL();

	const baseUrl = url.getUrl();

	const changeInfo = () => {
		modifyUserInfo()
	}

	//修改个人信息
	const modifyUserInfo = async () => {

		let data = new UserUpdateBaseInfoDto({
			Id: userDetail.value.Id,
			UserSex: userDetail.value.UserSex,
			UserName: userDetail.value.UserName,
			UserAdd: userDetail.value.UserAdd,
			UserNickname: userDetail.value.UserNickname,
			UserAvatarUrl: userDetail.value.UserAvatarUrl
		})

		try {
			const result = await UserService.UpdateUserBaseInfo(data)
			console.log('修改用户基本信息结果：', result)
			if (!!result) {
				uni.showToast({
					icon: "success",
					title: "修改成功"
				})
				uni.navigateTo({
					url: "/page_me/loginMain/loginMain"
				})
				const userstore = userStore();
				userstore.logout()
				uni.navigateTo({
					url: "/page_me/loginMain/loginMain"
				})
				// userstore.loginbyWX()
			}

		} catch (err) {
			console.error(err);
			uni.showToast({
				icon: "error",
				title: "修改失败"
			})
			//TODO handle the exception
		}

	}


	//上传照片
	const uploadPhoto = async (photoUrl : string) => {
		uni.showLoading({
			title: '头像上传中'
		});
		const upAvatarResult = await UserService.UploadPhoto(photoUrl)
		//上传成功的回调
		uni.hideLoading();
		if (upAvatarResult.result) {
			userDetail.value.UserAvatarUrl = upAvatarResult.avatarUrl
		} else {
			uni.showToast({
				icon: 'error',
				title: '上传失败'
			})
		}
	}

	//选择头像
	const changeAvatar = () => {
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], //从相册选择
			success: function (res : any) {
				uploadPhoto(res.tempFilePaths[0]);
			}
		})
	}
</script>
<style lang="scss">
	.avataBox {
		display: flex;
		justify-content: center;
		align-items: center;

		.userPhoto {
			height: 150rpx;
			width: 150rpx;
			border-radius: 50%;
			mode: "aspectFit";
			background-color: orchid;
		}
	}

	
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
			width: 150rpx;
		}


	}


	.uni-list-item__content {
		display: flex;
		justify-content: center !important;
	}

	.button {
		width: 80%;
		border-radius: 24px;
		font-weight: bold;
		background-color: #007aff;
		color: white;
	}
</style>