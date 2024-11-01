


export class RolePermissionViewModel {
    Id: number;
    RoleID: number;
    PermissionID: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
        }
        if (!obj.RoleID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：RoleID不能为空`)
        }
        if (!obj.PermissionID) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：PermissionID不能为空`)
        }
        this.Id = obj.Id
        this.RoleID = obj.RoleID
        this.PermissionID = obj.PermissionID
    }
}