
/**
 * 登录Dto
 */
export class UserLoginDto {
	UserAccount : string;
	UserPwd : string;
	public constructor(obj : any) {
		this.UserAccount = obj.UserAccount
		this.UserPwd = obj.UserPwd
	}
}

/**
 * 微信绑定DTO
 */
export class UserBindWXDto {
	Id : number;
	UserWxOpenid : string;    //后端将code向腾讯请求拿到的
	code : string;             //前端向后端提供的
	public constructor() {
		this.Id = 0
		this.UserWxOpenid = ''
		this.code = ''
	}
}

/**
 * 微信登录DTO
 */
export class UserWXLoginDto {
	UserWxOpenid : string; //后端将code向腾讯请求拿到的
	code : string;  //前端向后端提供的
	public constructor() {
		this.UserWxOpenid = ''
		this.code = ''
	}
}

/**
 * 删除Dto
 */
export class UserDeleteDto {
	UserID : number
	mode : string
	constructor(obj : any) {
		this.UserID = !!obj.Id ? obj.Id : obj.UserID
		this.mode = !!obj.mode ? obj.mode : ''
	}
}

/**
 * 注册Dto
 */
export class UserRegisterDto {
	UserAccount : string;
	UserPwd : string;
	UserName : string;
	UserTel : string;
	public constructor() {
		this.UserAccount = ''
		this.UserPwd = ''
		this.UserName = ''
		this.UserTel = ''
	}
}
/**
 * 查询Dto
 */
export class UserSearchDto {
	UserID ?: number;
	UserAccount ?: string;
	UserSex ?: number;
	UserName ?: string;
	UserTel ?: string;
	UserDepartmentID ?: number;
	UserAdd ?: string;
	UserAvatarUrl ?: string;
	UserNickname ?: string;
	UserIsResigned ?: number = 0;
	mode : string;   //是否查询软删除的角色  all则查询
	public constructor(obj : any) {
		this.UserID = !!obj.Id ? obj.Id : obj.UserID
		this.UserAccount = obj.UserAccount
		this.UserSex = obj.UserSex
		this.UserName = obj.UserName
		this.UserTel = obj.UserTel
		this.UserDepartmentID = obj.UserDepartmentID;
		this.UserAdd = obj.UserAdd
		this.UserAvatarUrl = obj.UserAvatarUrl
		this.UserNickname = obj.UserNickname
		this.UserIsResigned = obj.UserIsResigned
		this.mode = !!obj.mode ? obj.mode : 'default'
	}
}


export class UserPasswordUpdateDto {
	Id ?: number;
	UserPwd : string
	UserPwdOld : string
	public constructor(obj : any) {
		this.Id = obj.Id
		this.UserPwd = obj.UserPwd
		this.UserPwdOld = obj.UserPwdOld
	}
}


export class UserUpdateBaseInfoDto {
	Id : number;
	UserSex : number;
	UserName : string;
	UserAdd : string;
	UserNickname : string;
	UserAvatarUrl ?: string;
	public constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!!!obj.Id) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
		}
		if (!obj.UserName) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：UserName不能为空`)
		}
		if (!obj.UserAdd) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：UserAdd不能为空`)
		}
		if (!obj.UserNickname) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：UserNickname不能为空`)
		}
		this.Id = !!obj.Id ? obj.Id : obj.UserID
		this.UserSex = obj.UserSex
		this.UserName = obj.UserName
		this.UserAdd = obj.UserAdd
		if (!!obj.UserAvatarUrl && obj.UserAvatarUrl?.trim().length > 0) {
			this.UserAvatarUrl = obj.UserAvatarUrl
		}
		this.UserNickname = obj.UserNickname
	}
}
export class UserUpdateDepartmentDto {
	Id : number;
	UserDepartmentID : number;
	public constructor(obj : any) {

		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!!!obj.Id) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
		}
		if (!obj.UserDepartmentID) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：UserDepartmentID不能为空`)
		}

		this.Id = !!obj.Id ? obj.Id : obj.UserID

		this.UserDepartmentID = obj.UserDepartmentID


	}
}

export class UserModifyDepartmentDto {
	Id : number;     //目标人员的ID
	UserDepartmentID : number;
	opId ?: number;     //操作者的ID
	public constructor(obj : any) {

		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!!!obj.Id) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
		}
		if (!obj.UserDepartmentID) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：UserDepartmentID不能为空`)
		}

		this.Id = !!obj.Id ? obj.Id : obj.UserID

		this.UserDepartmentID = obj.UserDepartmentID
		this.opId = obj.opId

	}
}

export class UserSearchbyDepartmentDto {
	DepartmentId : number;
	mode ?: string = 'default';
	IncludeSub ?: boolean = false;
	public constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!!!obj.DepartmentId) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：DepartmentId不能为空`)
		}
		this.DepartmentId = obj.DepartmentId
		this.IncludeSub = obj.IncludeSub
		this.mode = obj.mode
	}
}

export class UserPasswordVerifyDto {
	Id ?: number;
	UserPwd : string

	public constructor() {
		this.Id = 0
		this.UserPwd = ''
	}
}