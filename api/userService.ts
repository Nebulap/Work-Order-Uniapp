import IUserInfo = UserInfo.IUserInfo;
import {BaseSearchIdDto} from "../model/Base/BaseDto";
import {DepartmentViewModel} from "../model/MDM/ViewModel/DepartmentViewModel";
import config from "./config";
import {Request, RequestMethod} from "./request";


const SysQuest = new Request(config.sysBaseUrl);

export class UserService {

    static async SerachAUserbyUserID(userID: { userID: number }): Promise<IUserInfo> {
        return await SysQuest.request('/user/SerachAUserbyUserID', RequestMethod.GET, {Id: userID.userID}) as IUserInfo;
    }

    static async GetSubDepartments(): Promise<DepartmentViewModel[]> {
        const data = await SysQuest.request('/user/GetSubDepartments', RequestMethod.GET, {})
        return data as DepartmentViewModel[]
    }

    static async GetAllUsersByDepartmentId(data: { DepartmentId: number }): Promise<IUserInfo[]> {
        return await SysQuest.request('/user/GetAllUsersByDepartmentId', RequestMethod.GET, data) as IUserInfo[]
    }
}
