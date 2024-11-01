export class PermissionTypeAddDto {
    TypeName: string;
    TypeInfo?: string;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    public constructor(obj: any) {
        if (obj.TypeName.trim().length == 0 || !obj.TypeName) {
            throw new Error('创建PermissionTypeAddDto对象错误,TypeName不能为空')
        }
        this.TypeName = obj.TypeName
        this.TypeInfo = !!obj.TypeInfo ? obj.TypeInfo : obj.TypeName
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}

export class PermissionTypeUpdateDto {
    Id: number;
    TypeName: string;
    TypeInfo?: string;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    public constructor(obj: any) {
        if (!obj.Id) {
            throw new Error('创建PermissionTypeUpdateDto对象错误,Id不能为空')
        }
        if (obj.TypeName.trim().length == 0 || !obj.TypeName) {
            throw new Error('创建PermissionTypeUpdateDto对象错误,TypeName不能为空')
        }
        this.Id = obj.Id
        this.TypeName = obj.TypeName
        this.TypeInfo = !!obj.TypeInfo ? obj.TypeInfo : obj.TypeName
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}

export class PermissionTypeDeleteDto {
    Id: number;
    mode: string;

    public constructor(obj: any) {
        if (!obj.Id) {
            throw new Error('创建PermissionTypeDeleteDto对象错误,Id不能为空')
        }
        this.Id = obj.Id
        this.mode = obj.mode as string | 'default'
    }
}

export class PermissionTypeSerachTypeNameDto {

    TypeName: string;
    mode: string

    public constructor(obj: any) {

        this.TypeName = obj.TypeName
        this.mode = obj.mode as string | 'default'

    }
}

export class PermissionTypeSerachTypeInfoDto {

    TypeInfo: string;
    mode: string

    public constructor(obj: any) {

        this.TypeInfo = obj.TypeInfo
        this.mode = obj.mode as string | 'default'

    }
}