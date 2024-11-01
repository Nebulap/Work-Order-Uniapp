
declare namespace UserInfo {

	interface IUserLogin {
		UserAccount: string,
		UserPwd: string,
		UserIdentity: string
	}

	interface IUserInfo {
		UserAccount: string,
		Id: number,
		UserTel: string,
		UserWxOpenid: string,
		UserName: string,
		UserPartment_Name: string,
		UserPwd: string,
		UserAdd: string,
		UserAvatarUrl: string,
		UserNickname: string
	}

	interface IUserRegister {
		UserAccount: string,
		UserName: string,
		UserPwd: string,
		UserTel: string,
		UserAvatarUrl: string,
		UserNickname: string
	}
	
	
	
	interface ILoginWX {
		code: string
	}
	interface IBindWX{
		code:string,
		UserAccount: string,
		Id: number
	}

}