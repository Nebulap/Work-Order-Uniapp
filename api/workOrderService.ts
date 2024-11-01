import {result} from "lodash";
import {WorkOrderInterface} from '../interface/WorkOrderInterface/workorder.interface';
import {WorkOrderExecuteInterface} from '../interface/WorkOrderInterface/workorderexecute.interface';
import {WorkOrderTaskCloseDetailInterface} from '../interface/WorkOrderInterface/workordertaskclosedetail.interface';
import {AddWorkOrderExecuteDto} from '../model/workbench/WorkOrder/Dto/add.workordereXecyte.dto';
import {AddWorkOrderTaskDto} from '../model/workbench/WorkOrder/Dto/add.workordertask.dto';
import {AddWorkOrderTaskCloseDetailDto} from '../model/workbench/WorkOrder/Dto/add.workordertaskclosedetail.dto';
import {UpdateWorkOrderExecuteDto} from '../model/workbench/WorkOrder/Dto/updateworkorderexecute.dto';
import {updateWorkOrderTaskDto} from '../model/workbench/WorkOrder/Dto/updateworkordertask.dto';
import {UpdateWorkOrderTaskCloseDetailDto} from '../model/workbench/WorkOrder/Dto/updateworkordertaskclosedetail.dto';
import {WorkOrderExecuteViewModel} from '../model/workbench/WorkOrder/ViewModel/workorderExecute.viewmodel';
import {WorkOrderTaskViewmodel} from '../model/workbench/WorkOrder/ViewModel/workordertask.viewmodel';
import {WorkOrderTaskCloseDetailViewModel} from '../model/workbench/WorkOrder/ViewModel/workordertaskclosedetail.viewmodel';
import config from './config';
import {Request, RequestMethod} from './request';
// import { uploadPara, UploadUtil } from './upload';
let upLoadBaseUrl = 'http://localhost:8090/api'
const workHourQuest = new Request(config.mdmBaseUrl);
// const upload = new UploadUtil(upLoadBaseUrl);
// const workHourQuest = new Request('https://www.sanchayou.cn:8070/api/task');
export class WorkOrderService implements WorkOrderInterface {

    public static async GetWorkOrderScheduleList(query: { Range: string, State: number, AcceptManId: number }): Promise<WorkOrderTaskViewmodel[]> {
        let result = await workHourQuest.request('/getWorkOrderScheduleList', RequestMethod.GET, query);
        return result as WorkOrderTaskViewmodel[]
    }

    public static async AddWorkOrder(objWorkOrder: AddWorkOrderTaskDto): Promise<WorkOrderTaskViewmodel> {
        let result = await workHourQuest.request('/addworkordertask', RequestMethod.POST, objWorkOrder);
        return result as WorkOrderTaskViewmodel
    }

    public static async GetWorkOrderTaskbyId(data: { Id: number }): Promise<WorkOrderTaskViewmodel[]> {
        let result = await workHourQuest.request('/GetWorkOrderTaskbyId', RequestMethod.GET, data);
        return result as WorkOrderTaskViewmodel[]
    }

    public static async GetWorkOrderTasksByInitiatorId(data: { InitiatorId: number }): Promise<WorkOrderTaskViewmodel[]> {
        let result = await workHourQuest.request('/getworkordertasksbyinitiatorid', RequestMethod.GET, data);
        return result as WorkOrderTaskViewmodel[]
    }

    public static async GetWorkOrderTasksByAcceptManId(data: { AcceptManId: number }): Promise<WorkOrderTaskViewmodel[]> {
        let result = await workHourQuest.request('/getworkordertasksbyacceptmanid', RequestMethod.GET, data);
        return result as WorkOrderTaskViewmodel[]
    }

    public static async UpdateWorkOrder(updateTask: updateWorkOrderTaskDto): Promise<{ code: number; msg: string; success: string; data: Object; }> {
        let result = await workHourQuest.request('/updateworkorderbyid', RequestMethod.PUT, updateTask);
        return result as { code: number; msg: string; success: string; data: Object; }
    }

    public static async DeleteWorkOrderById(data: { Id: number, force: boolean }): Promise<{ code: number; msg: string; success: string; data: Object; }> {
        console.log(data);
        let result = await workHourQuest.request('/delworkorderbyid', RequestMethod.DEL, data);
        return result as { code: number; msg: string; success: string; data: Object; }
    }

    public static async GetWorkOrderTaskDetailById(data: { Id: number }) {

        let result = await workHourQuest.request('/getworkordertaskDetailbyid', RequestMethod.GET, data);
        return result
    }

    public static async GetWorkOrderTaskNumberById(data: { Id: number }) {
        let result = await workHourQuest.request('/getworkordertasknumberbyid', RequestMethod.GET, data);
        return result
    }

    public static async GetWorkOrderUpTaskById(data: { Id: number }) {
        let result = await workHourQuest.request('/getworkorderuptaskbyid', RequestMethod.GET, data);
        return result
    }

    //上传附件
    public static async UploadFile(filePath: string): Promise<{ FileName: string, MimeType: string, OriginalName: string, Size: number, tempFilePath: string }> {
        // const paras = new uploadPara('/FileDownLoad/UploadFile', filePath)
        // const result : any = await upload.UploadFile(paras)
        // if (result.code == 200) {
        // 	return result.data
        // } else {
        // 	throw new Error(result)
        // }
    }

}

export class WorkOrderExecute implements WorkOrderExecuteInterface {

    public static async AddWorkOrderExecuteByTaskId(objWorkOrder: AddWorkOrderExecuteDto): Promise<WorkOrderExecuteViewModel> {
        let result = await workHourQuest.request('/addworkorderexecutebytaskid', RequestMethod.POST, objWorkOrder);
        return result as WorkOrderExecuteViewModel
    }

    public static async GetWorkOrderExecuteById(Id: number): Promise<WorkOrderExecuteViewModel[]> {
        let data = {Id: Id}
        let result = await workHourQuest.request('/getworkorderexecutebyId', RequestMethod.GET, data);
        return result as WorkOrderExecuteViewModel[]
    }

    public static async GetWorkOrderExecuteByTaskId(TaskId: number): Promise<WorkOrderExecuteViewModel[]> {
        let data = {TaskId: TaskId}
        let result = await workHourQuest.request('/getworkorderexecutebytaskId', RequestMethod.GET, data);
        return result as WorkOrderExecuteViewModel[]
    }

    public static async UpdateWorkOrderExecuteById(updateTask: UpdateWorkOrderExecuteDto): Promise<{ code: number; msg: string; success: string; data: Object; }> {
        let result = await workHourQuest.request('/updateworkorderexecutebyid', RequestMethod.PUT, updateTask);
        return result as { code: number; msg: string; success: string; data: Object; }
    }

    public static async DeleteWorkOrderExecuteById(Id: number, force: boolean): Promise<{ code: number; msg: string; success: string; data: Object; }> {
        let data = {Id: Id, force: force}
        let result = await workHourQuest.request('/delworkorderexecutebyid', RequestMethod.DEL, data);
        return result as { code: number; msg: string; success: string; data: Object; }
    }

    public static async AgreeWorkOrderProcessing(TaskId: number): Promise<{ code: number; msg: string; success: string; data: Object; }> {
        let data = {TaskId: TaskId}
        let result = await workHourQuest.request('/agreeworkorderprocessing', RequestMethod.GET, data);
        return result as { code: number; msg: string; success: string; data: Object; }
    }

}

export class WorkOrderTaskCloseDetail implements WorkOrderTaskCloseDetailInterface {
    public static async addworkordertaskclosedetail(objWorkOrder: AddWorkOrderTaskCloseDetailDto): Promise<WorkOrderTaskCloseDetailViewModel> {
        let result = await workHourQuest.request('/addworkordertaskclosedetail', RequestMethod.POST, objWorkOrder);
        return result as WorkOrderTaskCloseDetailViewModel
    }

    public static async GetWorkOrderTaskCloseDetailById(Id: number): Promise<WorkOrderTaskCloseDetailViewModel[]> {
        let data = {Id: Id}
        let result = await workHourQuest.request('/getworkordertaskclosedetailbyId', RequestMethod.POST, data);
        return result as WorkOrderTaskCloseDetailViewModel[]
    }

    public static async UpdateWorkOrderTaskCloseDetailById(updateTask: UpdateWorkOrderTaskCloseDetailDto): Promise<{ code: number; msg: string; success: string; data: Object; }> {
        let result = await workHourQuest.request('/updateworkordertaskclosedetailbyid', RequestMethod.POST, updateTask);
        return result as { code: number; msg: string; success: string; data: Object; }
    }

    public static async DeleteWorkOrderTaskCloseDetailById(Id: number, force: boolean): Promise<{ code: number; msg: string; success: string; data: Object; }> {
        let data = {Id: Id, force: force}
        let result = await workHourQuest.request('/delworkordertaskclosedetailbyid', RequestMethod.POST, data);
        return result as { code: number; msg: string; success: string; data: Object; }
    }

    public static async GetWorkOrderTaskCloseDetailByTaskId(TaskId: number): Promise<WorkOrderTaskCloseDetailViewModel[]> {
        let data = {TaskId: TaskId}
        let result = await workHourQuest.request('/getworkordertaskclosedetailbytaskId', RequestMethod.GET, data);
        return result as WorkOrderTaskCloseDetailViewModel[]
    }

}

export class WorkOrderHistory {
    public static async AddWorkOrderHistory(data: any) {
        let result = await workHourQuest.request('/addworkorderhistory', RequestMethod.POST, data);
        return result
    }

    public static async GetWorkOrderHistoryById(data: { WorkOrderId: number }) {
        let result = await workHourQuest.request('/getworkorderhistorybyId', RequestMethod.GET, data);
        return result as WorkOrderTaskCloseDetailViewModel[]
    }


}
