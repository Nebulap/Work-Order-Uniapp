export class UpdateWorkOrderTaskCloseDetailDto{
    Id: number;
    TaskId: number;
    Cause?: string;
    UserId: number;
    DepartmentId: number;
    Type?: number;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }