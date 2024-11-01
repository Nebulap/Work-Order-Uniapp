export class PermissionTypeViewModel {
    Id: number;
    TypeName: string;
    TypeInfo?: string;
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
        this.TypeInfo = !!obj.TypeInfo ? obj.TypeInfo : obj.TypeName
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}