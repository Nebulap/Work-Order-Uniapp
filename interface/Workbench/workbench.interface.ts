import {WorkOrderTaskViewmodel} from "../../model/workbench/WorkOrder/ViewModel/workordertask.viewmodel";

export interface WorkbenchInterface {
    getWorkbenchAllUsageList(): Promise<WorkOrderTaskViewmodel[]>

    getWorkOrderScheduleList(query: { Range: string, IsTaskCompleted: string, AcceptManId: number }): Promise<WorkOrderTaskViewmodel[]>
}
