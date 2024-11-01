import { AddWorkOrderTaskCloseDetailDto } from "../../model/workbench/WorkOrder/Dto/add.workordertaskclosedetail.dto";
import { UpdateWorkOrderTaskCloseDetailDto } from "../../model/workbench/WorkOrder/Dto/updateworkordertaskclosedetail.dto";
import { WorkOrderTaskCloseDetailViewModel } from "../../model/workbench/WorkOrder/ViewModel/workordertaskclosedetail.viewmodel";
export interface WorkOrderTaskCloseDetailInterface {
    AddWorkOrderTaskCloseDetailByTaskId(objWorkOrder: AddWorkOrderTaskCloseDetailDto): Promise<WorkOrderTaskCloseDetailViewModel>
    GetWorkOrderTaskCloseDetailById(Id: number): Promise<WorkOrderTaskCloseDetailViewModel[]>
    UpdateWorkOrderTaskCloseDetailById(updateTask: UpdateWorkOrderTaskCloseDetailDto): Promise<{ code: number; msg: string; success: string; data: Object; }>
    DeleteWorkOrderTaskCloseDetailById(Id: number, force: boolean): Promise<{ code: number; msg: string; success: string; data: Object; }> 
}