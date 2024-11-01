import { AddWorkOrderExecuteDto } from "../../model/workbench/WorkOrder/Dto/add.workordereXecyte.dto";
import { UpdateWorkOrderExecuteDto } from "../../model/workbench/WorkOrder/Dto/updateworkorderexecute.dto";
import { WorkOrderExecuteViewModel } from "../../model/workbench/WorkOrder/ViewModel/workorderExecute.viewmodel";

export interface WorkOrderExecuteInterface {
    AddWorkOrderExecuteByTaskId(objWorkOrder: AddWorkOrderExecuteDto): Promise<WorkOrderExecuteViewModel>
    GetWorkOrderExecuteById(Id: number): Promise<WorkOrderExecuteViewModel[]>
    UpdateWorkOrderExecuteById(updateTask: UpdateWorkOrderExecuteDto): Promise<{ code: number; msg: string; success: string; data: Object; }>
    DeleteWorkOrderExecuteById(Id: number, force: boolean): Promise<{ code: number; msg: string; success: string; data: Object; }>
}