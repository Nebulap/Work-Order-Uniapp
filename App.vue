<script>
	import {
		envStore
	} from './store/envStore'
	// import CryptoUtil from '@/util/CryptoUtil';
	import appUpdate from '@/uni_modules/leruge-app-update/js_sdk/leruge-app-update.js'
	// import {
	// 	userStore
	// } from './store/user-store'
	// import {
	// 	AppUpdateService
	// }
	// from '@/api/appUpdateService'
	// import {
	// 	UserService
	// } from './api/UserService';
	import {
		encrypt,
		decrypt
	} from "@/common/crypto.js";

	export default {
		onLaunch: function() {
			console.log('------------------------------ App  Launch ----------------------1--------')
			const envstore = envStore()
			//获取运行系统信息
			const SystemInfoSync = uni.getSystemInfoSync()
			//获取运行系统平台
			const platform = SystemInfoSync.platform
			//获取运行平台
			const uniPlatform = SystemInfoSync.uniPlatform

			switch (uniPlatform) {
				case 'app': //app
					console.log('运行方式：app运行');
					envstore.setApp()
					break;
				case 'mp-weixin': //微信小程序
					console.log('运行方式：wechat运行');
					envstore.setWechat() //设置为微信环境
					const userstore = userStore()
					userstore.logout()
					userstore.loginbyWX('/pages/index/index', 1)
					break;
				default:
					break;
			}
			switch (platform) {
				case 'android':
					envstore.setProduction() //设置为运行环境
					console.log('系统环境：Android系统'); //android
					break;
				case 'ios':
					envstore.setProduction()
					console.log('系统环境：iOS系统'); //ios
					break;
				default:
					console.log('系统环境：开发环境'); //ios
					envstore.setDevelopment() //设置为开发环境
					//开发工具会进入到这里
					break;
			}
			console.log('-------------------------- App Launch Finished --------------------------')
		},
		onShow: async function() {

			console.log('App Show')
			// const userstore = userStore()
			// 获取设备信息
			uni.getSystemInfo({
				success: function(res) {
					console.log(res);
					// 设备唯一标识符
					let {
						deviceId,
						platform,
						deviceBrand
					} = res;
					let loginData = {
						deviceId: deviceId,
						platform: platform,
						deviceBrand: deviceBrand
					}
				}
			});
			//启动自动登录
			uni.getStorage({
				key: 'User',
				success: async function(res) {
					let loginData = {
						deviceId: '',
						platform: '',
						deviceBrand: ''
					};

					// 获取系统信息
					uni.getSystemInfo({
						success: function(systemInfo) {
							loginData.deviceId = systemInfo.deviceId;
							loginData.platform = systemInfo.platform;
							loginData.deviceBrand = loginData.deviceBrand = systemInfo.deviceBrand == undefined ? '' : systemInfo.deviceBrand;
						}
					});
					// 合并 loginData 和 res.data
					res.data = {
						...res.data,
						...loginData
					};
					userstore.logout()
					res.data.UserPwd = decrypt(res.data.UserPwd, 'hello')
					userstore.loginDirect(res.data)
				},
				fail: function(res) {},
			})
			const systemInfo = uni.getSystemInfoSync();
			try {
				// let data = await AppUpdateService.getLatestVersion({
				// 	AppName: systemInfo.appName
				// })
				// console.log(data);
				// if (systemInfo.appVersion !== data.AppVersion) {
				// 	let updateInfo = {
				// 		platform: 'android',
				// 		updateContent: data.UpdateLog,
				// 		downUrl: data.DownLoadUrl,
				// 		version: data.AppVersion,
				// 		force: data.force == true,
				// 		mainColor: 'FF5B78',
				// 	}
				// 	appUpdate(updateInfo)
				// }

				// 	let socket = uni.connectSocket({
				// 		// url: `ws://127.0.0.1:9010/messageSocket?userId=${userstore.userInfo.Id}`, // WebSocket服务器地址
				// 		url: "ws://www.scasy.com.cn:8072/messageSocket?userId=100006", // WebSocket服务器地址
				// 		success(res) {
				// 			console.log("连接成功");

				// 		},
				// 		fail(error) {
				// 			console.error('WebSocket连接失败：', error);
				// 		}
				// 	});
				// 	socket.onMessage((res) => {
				// 		let message = JSON.parse(res.data)
				// 		uni.showToast({
				// 			icon: "none",
				// 			title: message.MessageContent
				// 		})
				// 		console.log('接受到消息', message);
				// 	})
			} catch (e) {
				//TODO handle the exception
				console.log(e);
			}




		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>

</style>
