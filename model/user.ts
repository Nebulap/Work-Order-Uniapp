
 export class User implements UserInfo.IUserInfo{
	UserAccount: string = "";
	Id: number = 0;
	UserName: string = "";
	UserPartment_Name: string = "";
	UserWxOpenid: string = "";
	UserLevel: number = 0;
	UserPwd: string = "";
	UserAdd: string = "";
	UserTel: string = "";
	UserNickname: string = "未登录";
	UserAvatarUrl: string ="";
}

export class UserLogin implements UserInfo.IUserLogin {
	UserAccount: string = "";
	UserPwd: string = "";
	UserIdentity: string = 'staff';
}

