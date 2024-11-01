import { defineStore } from 'pinia'
import { User } from '@/model/user'
import { UserService } from '@/api/UserService';
import { UserBindWXDto, UserWXLoginDto } from '../model/MDM/Dto/MDM/UserDto';
import { encrypt, decrypt } from "@/common/crypto.js";

//当前用户的信息
let userInfo : UserInfo.IUserInfo = new User()
//是否拥有用户信息
let hasUserInfo : boolean = false;

//用户登录后信息保存接口
interface ImsgUser {
	userInfo : UserInfo.IUserInfo,
	token : string
	userpwd : { UserAccount : string, UserPwd : string, UserIdentity : string }
}

if (!!uni.getStorageSync('user_info')) {
	hasUserInfo = true;
	userInfo = uni.getStorageSync('user_info')
}

export const userStore = defineStore('user', {
	state: () => {
		return {
			// 所有这些属性都将自动推断其类型
			hasUserInfo: hasUserInfo,
			userInfo: userInfo,
			userpwd: { UserAccount: '', UserPwd: '', UserIdentity: '' }
		}
	},
	getters: {
		getUserInfo: function (state : any) : UserInfo.IUserInfo {
			return state.userInfo
		},
		getHasUserInfo: function (state : any) : boolean {
			return state.hasUserInfo
		},
		getUserpwd: function (state : any) : UserInfo.IUserInfo {
			return state.userpwd
		}
	},
	actions: {
		updateUserInfo(msg : ImsgUser, url ?: string) {
			// console.log('用户登录，信息保存：', userInfo)
			console.log('更新用户信息');
			hasUserInfo = true;
			userInfo = msg.userInfo;
			console.log(userInfo)
			uni.setStorage({
				key: 'token',
				data: msg.token,
				success: function () {
					console.log('token保存到缓存保存成功');
					uni.setStorage({
						key: 'user_info',
						data: userInfo,
						success: function () {
							uni.switchTab({
								url: 	'/pages/workbench/workbench'
							})
							uni.hideToast()
						}
					});
				}
			});
		},
		// 模拟登录
		async login(){
			const userInfo = await UserService.SerachAUserbyUserID({ userID: 647 });
			const msg:ImsgUser = {
				userInfo,
				token: "token",
				userpwd : {UserAccount : "haha", UserPwd : "123456", UserIdentity : "admin" }
			}
			this.updateUserInfo(msg,"")
		}
	}
},
)
