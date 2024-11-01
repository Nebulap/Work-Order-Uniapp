export class RoleUserBindDto {
    UserID: number;
    RoleID: number;
    RoleLevel?: number;
    AvaliableDate?: string;
    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.UserID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：UserID不能为空`)
        }
        if (!obj.RoleID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：RoleID不能为空`)
        }
        this.UserID = obj.UserID
        this.RoleID = obj.RoleID
        this.RoleLevel = !!obj.RoleLevel ? obj.RoleLevel : 5
        this.AvaliableDate = !!obj.AvaliableDate ? obj.AvaliableDate : new Date()
    }

}
export class RoleUserUpdateDto {
    Id: number;
    UserID: number;
    RoleID: number;
    RoleLevel?: number;
    AvaliableDate?: string;
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
        if (!obj.RoleID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：RoleID不能为空`)
        }
        this.Id = obj.Id
        this.UserID = obj.UserID
        this.RoleID = obj.RoleID
        this.RoleLevel = !!obj.RoleLevel ? obj.RoleLevel : 5
        this.AvaliableDate = !!obj.AvaliableDate ? obj.AvaliableDate : new Date()
    }

}
