export class DepartmentAddDto {
    // Id: number;
    DepartmentName: string;
    DepartmentInfo: string;
    DepartmentUpID?: number;
    // deletedAt?: Date;
    // createdAt?: Date;
    // updatedAt?: Date;
    public constructor(obj: any) {

        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.DepartmentName) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：DepartmentName不能为空`)
        }
        this.DepartmentName = obj.DepartmentName
        this.DepartmentInfo = !!obj.DepartmentInfo ? obj.DepartmentInfo : obj.DepartmentName
        this.DepartmentUpID = obj.DepartmentUpID
    }
}

export class DepartmentUpdateDto {
    Id: number;
    DepartmentName: string;
    DepartmentInfo: string;
    DepartmentUpID: number | undefined;
    // deletedAt?: Date;
    // createdAt?: Date;
    // updatedAt?: Date;
    public constructor(obj: any) {

        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!!!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
        }
        if (!obj.DepartmentName) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：DepartmentName不能为空`)
        }
        this.Id = obj.Id
        this.DepartmentName = obj.DepartmentName
        this.DepartmentInfo = !!obj.DepartmentInfo ? obj.DepartmentInfo : obj.DepartmentName
        this.DepartmentUpID = obj.DepartmentUpID
    }
}