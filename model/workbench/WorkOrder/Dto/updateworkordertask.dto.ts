
export class updateWorkOrderTaskDto {
    Id: number
    InitiatorDepartmentId: number;
    InitiatorId: number;
    Title: string;
    Content: string;
	AuditStatus:number;
    AcceptDepartmentId?: number;
    AcceptManId?: number;
    AttachmentId?: string;
    State?: number;
    TaskUpId?: number;
    RequiredCompletionTime?: Date;
}