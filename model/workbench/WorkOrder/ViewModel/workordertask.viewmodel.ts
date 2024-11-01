export class WorkOrderTaskViewmodel {
    Id: number;
    InitiatorDepartmentId: number;
    InitiatorId: number;
    Title: string;
    Content: string;
    AcceptDepartmentId?: number;
    AcceptManId?: number;
    AttachmentId?: string;
    State?: number;
    TaskUpId?: number;
    RequiredCompletionTime?: Date;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}