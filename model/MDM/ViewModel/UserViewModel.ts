import { DepartmentViewModel } from "./DepartmentViewModel";

export class UserViewModel {
	Id : number;
	UserSex ?: number;
	UserName : string;
	UserDepartmentID ?: number;
	UserAvatarUrl ?: string;
	UserNickname ?: string;
	UserIsResigned : number;
	Department ?: DepartmentViewModel;
	public constructor(obj : any) {
		this.Id = obj.Id
		this.UserName = obj.UserName
		this.UserSex = obj.UserSex
		this.UserDepartmentID = obj.UserDepartmentID
		this.UserAvatarUrl = obj.UserAvatarUrl
		this.UserNickname = obj.UserNickname
		this.UserIsResigned = obj.UserIsResigned
		if (!!obj.UserDepartmentID) this.Department = new DepartmentViewModel(obj.Department)
	}
}


export class UserDetailViewModel {
	Id ?: number
	UserAccount ?: string
	UserAdd ?: string
	UserAvatarUrl ?: string
	UserDepartmentID ?: number
	Department ?: DepartmentViewModel
	UserIsResigned ?: number
	UserName ?: string
	UserNickname ?: string
	UserSex ?: number
	UserTel ?: string
	createdAt ?: Date
	deletedAt ?: Date
	updatedAt ?: Date
	public constructor(obj : any) {
		this.Id = obj.Id
		this.UserAccount = obj.UserAccount
		this.UserAdd = obj.UserAdd
		this.UserAvatarUrl = obj.UserAvatarUrl
		this.UserDepartmentID = obj.UserDepartmentID
		this.Department = obj.Department
		this.UserIsResigned = obj.UserIsResigned
		this.UserName = obj.UserName
		this.UserNickname = obj.UserNickname
		this.UserSex = obj.UserSex
		this.UserTel = obj.UserTel
		this.createdAt = obj.createdAt
		this.deletedAt = obj.deletedAt
		this.updatedAt = obj.updatedAt
	}
}