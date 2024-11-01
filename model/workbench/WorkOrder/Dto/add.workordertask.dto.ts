import { IsNotEmpty } from "class-validator";

export class AddWorkOrderTaskDto {
    Id: number
 
    InitiatorDepartmentId: number;
 
    InitiatorId: number;
    @IsNotEmpty()
    Title: string;
    @IsNotEmpty()
    Content: string;
    @IsNotEmpty()
    AcceptDepartmentId?: number;
    AcceptManId?: number;
    AttachmentId?: string;
    State?: number;
    TaskUpId?: number;
    RequiredCompletionTime?: Date;
}