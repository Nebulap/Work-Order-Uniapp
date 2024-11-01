export class DepartmentPositionAddDto {
    // Id: number;
    DepartmentID: number;
    UserID: number;
    RoleID: number;
    PositionName: string;
    PositionInfo: string;
    AvaliableDate: string;
    RoleLevel: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.UserID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：UserID不能为空`)
        }
        if (!obj.DepartmentID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：DepartmentID不能为空`)
        }
        if (!obj.RoleID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：RoleID不能为空`)
        }
        if (!obj.PositionName || obj.PositionName.trim().length == 0) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败,PositionName不能为空`)
        }
        this.PositionName = obj.PositionName
        this.PositionInfo = !!obj.PositionInfo ? obj.PositionInfo : obj.PositionName
        this.UserID = obj.UserID
        this.DepartmentID = obj.DepartmentID
        this.RoleID = obj.RoleID
        this.RoleLevel = !!obj.RoleLevel ? obj.RoleLevel : 5
        this.AvaliableDate = !!obj.AvaliableDate ? obj.AvaliableDate : new Date()
    }
}

export class DepartmentPositionUpdateDto {
    Id: number;
    DepartmentID: number;
    UserID: number;
    RoleID: number;
    PositionName: string;
    PositionInfo: string;
    AvaliableDate: string;
    RoleLevel: number;
    updatedAt: Date;
    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
        }
        if (!obj.UserID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：UserID不能为空`)
        }
        if (!obj.DepartmentID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：DepartmentID不能为空`)
        }
        if (!obj.RoleID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：RoleID不能为空`)
        }
        if (!obj.PositionName || obj.PositionName.trim().length == 0) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败,PositionName不能为空`)
        }
        this.Id = obj.Id
        this.PositionName = obj.PositionName
        this.PositionInfo = !!obj.PositionInfo ? obj.PositionInfo : obj.PositionName
        this.UserID = obj.UserID
        this.DepartmentID = obj.DepartmentID
        this.RoleID = obj.RoleID
        this.RoleLevel = !!obj.RoleLevel ? obj.RoleLevel : 5
        this.AvaliableDate = !!obj.AvaliableDate ? obj.AvaliableDate : new Date()
        this.updatedAt = !!obj.updatedAt ? obj.updatedAt : new Date()
    }
}