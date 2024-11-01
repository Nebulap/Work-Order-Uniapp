
export class DepartmentViewModel {
    Id: number
    DepartmentName: string
    DepartmentInfo: string
    DepartmentUpID: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    constructor(obj: any) {
        this.Id = obj.Id
        this.DepartmentName = obj.DepartmentName
        this.DepartmentInfo = obj.DepartmentInfo
        this.DepartmentUpID = obj.DepartmentUpID
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
        this.deletedAt = obj.deletedAt
    }
}




export class DepartmentsViewModel {
    Id: number
    DepartmentName: string
    DepartmentInfo: string
    DepartmentUpID: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    SubDepartments?: Array<DepartmentsViewModel>
    constructor(obj: any) {
        this.Id = obj.Id
        this.DepartmentName = obj.DepartmentName
        this.DepartmentInfo = obj.DepartmentInfo
        this.DepartmentUpID = obj.DepartmentUpID
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
        this.deletedAt = obj.deletedAt
        this.SubDepartments = obj.SubDepartments
    }

}