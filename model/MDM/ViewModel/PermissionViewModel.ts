// import { DepartmentPositionUserRole } from "@/model/MasterDataManagement/DepartmentPositionUserRole"
// import { DepartmentRole } from "../../model/MasterDataManagement/DepartmentRole"
import { Permission } from "../../model/MasterDataManagement/Permission";
import { RoleUser } from "../../model/MasterDataManagement/RoleUser"
import { PermissionTypeViewModel } from "./PermissionTypeViewModel";


export class PermissionViewModel {
    Id: number;
    PermissionName: string;
    PermissionInfo?: string;
    PermissionStatus?: number;
    PermissionTypeID: number;
    PermissionType?: PermissionTypeViewModel
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;

    public constructor(obj: any) {

        if (!obj.Id) {
            throw new Error('创建PermissionAddDtio对象失败：Id不能为空')
        }
        if (!obj.PermissionName || obj.PermissionName.trim().length == 0) {
            throw new Error('创建PermissionAddDtio对象失败：PermissionName不能为空')
        }
        if (!obj.PermissionTypeID) {
            throw new Error('创建PermissionAddDtio对象失败：PermissionTypeID不能为空')
        }
        this.Id = obj.Id
        this.PermissionName = obj.PermissionName
        this.PermissionInfo = !!obj.PermissionInfo ? obj.PermissionInfo : obj.PermissionName
        this.PermissionStatus = !!obj.PermissionStatus ? obj.PermissionStatus : obj.PermissionStatus
        this.PermissionTypeID = obj.PermissionTypeID
        this.PermissionType = obj.PermissionType
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}

export class PermissionGroupbyTypeViewModel {
    Id: number;
    TypeName: string;
    TypeInfo?: string;
    Permissions?: PermissionViewModel
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    public constructor(obj: any) {
        if (!obj.Id) {
            throw new Error('创建PermissionTypeAddDto对象错误,Id')
        }
        if (obj.TypeName.trim().length == 0 || !obj.TypeName) {
            throw new Error('创建PermissionTypeAddDto对象错误,TypeName不能为空')
        }
        this.Id = obj.Id
        this.TypeName = obj.TypeName
        this.Permissions = obj.Permissions
        this.TypeInfo = !!obj.TypeInfo ? obj.TypeInfo : obj.TypeName
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}


/**
 * 角色权限模型(角色，包含哪些权限)
 */
export class RolePermissionsViewModel {

    RoleID: number;
    RoleLevel: number;
    RoleName: string
    RoleInfo: string;
    Permissions: Array<Permission>

    constructor(obj: any) {
        this.RoleID = !!obj.RoleID ? obj.RoleID : obj.Id;
        this.RoleLevel = obj.RoleLevel
        this.RoleName = obj.RoleName
        this.RoleInfo = obj.RoleInfo
        this.Permissions = obj.Permissions
    }
}
/**
 * 用户角色（用户，包含哪些角色）
 */
export class UserRolesViewModel {

    UserID!: number;
    UserName?: string;
    UserDepartmentID?: number;
    UserIsResigned?: number;
    Department: DepartmentRolesViewModel;
    DepartmentPositionUserRoles: Array<DepartmentPositionUserRole>;
    RoleUsers: Array<RoleUser>
    public constructor(obj: any) {
        this.UserID = !!obj.UserID ? obj.UserID : obj.Id
        this.UserName = obj.UserName
        this.UserDepartmentID = obj.UserDepartmentID
        this.UserIsResigned = obj.UserIsResigned
        this.Department = obj.Department
        this.RoleUsers = obj.RoleUsers
        this.DepartmentPositionUserRoles = obj.DepartmentPositionUserRoles
    }

}
/**
 * 用户角色（用户与角色绑定视图）
 */
export class UserRoleViewModel {

    Id: number;
    UserID: number;
    RoleID: number;
    RoleLevel?: number;
    AvaliableDate?: string;

    constructor(obj: any) {
        this.Id = obj.Id
        this.UserID = obj.UserID;
        this.RoleID = obj.RoleID;
        this.RoleLevel = obj.RoleLevel;
        this.AvaliableDate = obj.AvaliableDate;

    }

}



export class DepartmentRolesViewModel {
    DepartmentID: number
    DepartmentName: string
    DepartmentInfo: string
    DepartmentUpID: number
    DepartmentRoles: Array<DepartmentRole>
    public constructor(obj: any) {
        this.DepartmentID = obj.DepartmentID
        this.DepartmentName = obj.DepartmentName
        this.DepartmentInfo = obj.DepartmentInfo
        this.DepartmentUpID = obj.DepartmentUpID
        this.DepartmentRoles = obj.DepartmentRoles
    }
}


export class UserPermissionsViewModel {
    UserID!: number;
    UserName?: string;
    UserDepartmentID?: number;
    UserIsResigned?: number;
    Department: DepartmentRolesViewModel;
    DepartmentPositionUserRoles: Array<DepartmentPositionUserRole>;
    RoleUsers: Array<RoleUser>
    public constructor(obj: any) {
        this.UserID = !!obj.UserID ? obj.UserID : obj.Id
        this.UserName = obj.UserName
        this.UserDepartmentID = obj.UserDepartmentID
        this.UserIsResigned = obj.UserIsResigned
        this.Department = obj.Department
        this.RoleUsers = obj.RoleUsers
        this.DepartmentPositionUserRoles = obj.DepartmentPositionUserRoles
    }
}
