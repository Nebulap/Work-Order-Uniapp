export class UpdateWorkOrderExecuteDto {
    Id: number;
    ExecutorDepartmentId: number;
    ExecutorId: number;
    Detail: string;
    Process: number;
    TaskId: number;
    AttachmentId?: string;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }