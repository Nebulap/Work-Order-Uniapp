import { RoleViewModel } from "./RoleViewModel";

export class RoleDepartmentViewModel {
    Id: number;
    DepartmentID: number;
    RoleID: number;
    RoleLevel?: number;
    AvaliableDate?: string;
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
        }
        if (!obj.DepartmentID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：DepartmentID不能为空`)
        }
        if (!obj.RoleID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：RoleID不能为空`)
        }
        this.Id = obj.Id
        this.DepartmentID = obj.DepartmentID
        this.RoleID = obj.RoleID
        this.RoleLevel = obj.RoleLevel
        this.AvaliableDate = obj.AvaliableDate
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}

export class DepartmentRolesViewModel {
    Id: number
    DepartmentName: string
    DepartmentInfo: string
    DepartmentUpID: number
    Roles: Array<RoleViewModel>;
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
        }

        this.Id = obj.Id
        this.DepartmentName = obj.DepartmentName
        this.DepartmentInfo = obj.DepartmentInfo
        this.DepartmentUpID = obj.DepartmentUpID
        this.Roles = obj.Roles
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}