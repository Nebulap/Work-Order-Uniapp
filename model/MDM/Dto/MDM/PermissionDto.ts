import { type } from "os";
import { DepartmentPositionUserRole } from "../../model/MasterDataManagement/DepartmentPositionUserRole"
import { DepartmentRole } from "../../model/MasterDataManagement/DepartmentRole"
import { RoleUser } from "../../model/MasterDataManagement/RoleUser"




export class PermissionSearchInfoDto {
    mode?: string;
    PermissionInfo: string;

    public constructor(obj: any) {
        if (!obj.PermissionInfo || obj.PermissionInfo.trim().length == 0) {
            throw new Error('创建PermissionSearchInfoDto对象失败：PermissionInfo不能为空')
        }
        this.PermissionInfo = obj.PermissionInfo
        this.mode = obj.mode
    }
}


export class PermissionSearchNameDto {
    mode?: string;
    PermissionName: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.PermissionName || obj.PermissionName.trim().length == 0) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败,PermissionName不能为空`)
        }
        this.PermissionName = obj.PermissionName
        this.mode = obj.mode
    }
}


export class PermissionSearchIdDto {
    mode?: string;
    Id: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error('创建PermissionSearchDto对象失败：Id不能为空')
        }
        this.Id = obj.Id
        this.mode = obj.mode
    }
}

export class PermissionSearchTypeDto {
    mode?: string;
    PermissionTypeID: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.PermissionTypeID) {
            throw new Error('创建PermissionSearchDto对象失败：PermissionTypeID不能为空')
        }
        this.PermissionTypeID = obj.PermissionTypeID
        this.mode = obj.mode
    }
}



export class PermissionUpdateDto {
    Id: number;
    PermissionName: string;
    PermissionInfo?: string;
    PermissionStatus?: number;
    PermissionTypeID: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
        }
        if (!obj.PermissionName || obj.PermissionName.trim().length == 0) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：PermissionName不能为空`)
        }
        if (!obj.PermissionTypeID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：PermissionTypeID不能为空`)
        }
        this.Id = obj.Id
        this.PermissionName = obj.PermissionName
        this.PermissionInfo = !!obj.PermissionInfo ? obj.PermissionInfo : obj.PermissionName
        this.PermissionStatus = !!obj.PermissionStatus ? obj.PermissionStatus : 1
        this.PermissionTypeID = obj.PermissionTypeID
    }
}


export class PermissionAddDto {

    PermissionName: string;
    PermissionInfo?: string;
    PermissionStatus?: number;
    PermissionTypeID: number;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;

    public constructor(obj: any) {
        if (!obj.PermissionName || obj.PermissionName.trim().length == 0) {
            throw new Error('创建PermissionAddDto对象失败：PermissionName不能为空')
        }
        if (!obj.PermissionTypeID) {
            throw new Error('创建PermissionAddDto对象失败：PermissionTypeID不能为空')
        }
        this.PermissionName = obj.PermissionName
        this.PermissionInfo = !!obj.PermissionInfo ? obj.PermissionInfo : obj.PermissionName
        this.PermissionStatus = !!obj.PermissionStatus ? obj.PermissionStatus : 1
        this.PermissionTypeID = obj.PermissionTypeID
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}



/**
 * 用户权限验证DTO
 */
export class UserPermissionVerifyDto {
    UserID: number   //用户ID
    mode: string     //校验模式，'role'校验角色   'permission'校验权限
    CheckName: string   //校验的名称  如果是角色 就填入角色名，如果校验权限，就填入权限名
    CheckLevel: number  //需要的等级  如果角色拥有权限比需要的等级高则拥有权限
    constructor(obj: any) {
        this.UserID = !!obj.UserID ? obj.UserID : (!!obj.Id ? obj.Id : 0)
        this.mode = !!obj.mode ? obj.mode : 'role'   //默认校验角色
        this.CheckName = obj.CheckName
        this.CheckLevel = !!obj.CheckLevel ? obj.CheckLevel : 6   //默认校验权限6
    }
}

/**
 * 部门角色Dto
 */
export class DepartmentRoleDto {
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


export class UserPermissionDto {
    mode: string;
    UserID: number;
    UserName?: string;
    UserDepartmentID?: number;
    UserIsResigned?: number;
    Department: DepartmentRoleDto;
    DepartmentPositionUserRoles: Array<DepartmentPositionUserRole>;
    RoleUsers: Array<RoleUser>
    public constructor(obj: any) {
        this.mode = !!obj.mode ? obj.mode : 'default'
        this.UserID = obj.UserID
        this.UserName = obj.UserName
        this.UserDepartmentID = obj.UserDepartmentID
        this.UserIsResigned = obj.UserIsResigned
        this.Department = obj.Department
        this.RoleUsers = obj.RoleUsers
        this.DepartmentPositionUserRoles = obj.DepartmentPositionUserRoles
    }
}

// export class UserRoleDto {

//     Id?: number;
//     UserID?: number;
//     RoleID?: number;
//     RoleLevel?: number;
//     AvaliableDate?: string;

//     constructor(obj: any) {
//         this.Id = obj.Id
//         this.UserID = obj.UserID;
//         this.RoleID = obj.RoleID;
//         this.RoleLevel = obj.RoleLevel;
//         this.AvaliableDate = obj.AvaliableDate;

//     }

// }

export class UserRoleDto {
    UserID!: number;
    UserName?: string;
    UserDepartmentID?: number;
    Department?: Object;
    DepartmentPositionUserRoles?: Array<object>;
    RoleUsers?: Array<RoleUser>
    public constructor(obj: any) {
        this.UserID = obj.UserID
        this.UserName = obj.UserName
        this.UserDepartmentID = obj.UserDepartmentID
        this.Department = obj.Department
        this.RoleUsers = obj.RoleUsers
        this.DepartmentPositionUserRoles = obj.DepartmentPositionUserRoles
    }
}
