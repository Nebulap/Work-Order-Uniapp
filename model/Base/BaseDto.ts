export class BaseDeleteDto {
    Id: number;
    mode: string;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败,Id不能为空`)
        }
        this.Id = obj.Id
        this.mode = !!obj.mode ? obj.mode : 'default'
    }
}

export class BaseRestoreDto {
    Id: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败,Id不能为空`)
        }
        this.Id = obj.Id
    }
}


export class BaseSearchIdDto {
    mode: string;
    Id: number;

    public constructor(obj: any) {
        if (!!!obj) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
        }
        if (!obj.Id) {
            throw new Error(`创建${this.constructor.name.toString()}对象失败：Id不能为空`)
        }
        this.Id = obj.Id
        this.mode = !!obj.mode ? obj.mode : 'default'
    }
}