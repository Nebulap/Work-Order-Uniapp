export class RoleCreateDto {
    RoleName: string;
    RoleInfo: string;
    RoleStatus?: number;
    RoleUpID?: number;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    public constructor(obj: any) {
        this.RoleName = obj.RoleName
        this.RoleInfo = !!obj.RoleInfo ? obj.RoleInfo : obj.RoleName
        this.RoleStatus = !!obj.RoleStatus ? obj.RoleStatus : 1
        this.RoleUpID = obj.RoleUpID;
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}

export class RoleUpdateDto {
    Id: number;
    RoleName: string;
    RoleInfo: string;
    RoleStatus?: number;
    RoleUpID?: number;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    public constructor(obj: any) {
        this.Id = obj.Id
        this.RoleName = obj.RoleName
        this.RoleInfo = obj.RoleInfo
        this.RoleStatus = obj.RoleStatus
        this.RoleUpID = obj.RoleUpID;
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}

export class RoleDeleteDto {
    Id: number;
    mode: string;
    public constructor(obj: any) {
        this.Id = obj.Id
        this.mode = !!obj.mode ? obj.mode : 'default'
    }
}

export class RoleSerachRoleNameDto {

    RoleName: string;
    mode: string

    public constructor(obj: any) {

        this.RoleName = obj.RoleName
        this.mode = !!obj.mode ? obj.mode : 'default'

    }
}

export class RoleSerachRoleInfoDto {

    RoleInfo: string;
    mode: string

    public constructor(obj: any) {

        this.RoleInfo = obj.RoleInfo
        this.mode = !!obj.mode ? obj.mode : 'default'

    }
}
