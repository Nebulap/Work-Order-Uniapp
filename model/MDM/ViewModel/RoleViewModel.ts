
export class RoleViewModel {
    Id: number;
    RoleName: string;
    RoleInfo: string;
    RoleStatus?: number;
    RoleUpID?: number;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    public constructor(obj: any) {
        // console.log(obj)
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
