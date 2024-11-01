import { AddWorkOrderTaskDto } from "../../model/workbench/WorkOrder/Dto/add.workordertask.dto";
import { updateWorkOrderTaskDto } from "../../model/workbench/WorkOrder/Dto/updateworkordertask.dto";
import { WorkOrderTaskViewmodel } from "../../model/workbench/WorkOrder/ViewModel/workordertask.viewmodel";


export interface WorkOrderInterface {
    GetWorkOrderScheduleList(query: {Range: string, status: number, AcceptManId: number}):Promise<WorkOrderTaskViewmodel[]>
    AddWorkOrder(objWorkOrder: AddWorkOrderTaskDto): Promise<WorkOrderTaskViewmodel>;
    GetWorkOrderTaskbyId(Id: number): Promise<WorkOrderTaskViewmodel[]>;
    GetWorkOrderTasksByInitiatorId(InitiatorId: number): Promise<WorkOrderTaskViewmodel[]>
    GetWorkOrderTasksByAcceptManId(AcceptManId: number): Promise<WorkOrderTaskViewmodel[]>
    UpdateWorkOrder(updateTask: updateWorkOrderTaskDto): Promise<{ code: number; msg: string; success: string; data: Object; }>
    DeleteWorkOrderById(Id:number,force:boolean): Promise<{ code: number; msg: string; success: string; data: Object; }>
}
