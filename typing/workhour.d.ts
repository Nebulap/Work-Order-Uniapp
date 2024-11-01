
declare namespace Workhours {

	interface ISubmitWorkhour {
		WHuserID: number,//用户ID
		WHppid: number;//工序ID
		WHbid: number,//批次ID
		WHquantity: number,//产量
		WHworkwaste: number,//工废
		WHmaterialwaste: number,// 料废
		WHpick: number,//挑选
		WHischecked: boolean,//是否审核，默认为不审核
		WHcheckeduserid: number//审核人ID，提交工时，审核ID为用户本人
	}
	interface IUserInfo{
		UserAccount:string,//账户
		UserID:number,//用户Id
		UserLevel:number,//用户等级
		UserName:string,//用户名字
		UserPWD:string,//用户密码
		UserPartment:string//部门
	}
	interface VerifyWorkhour{
		PPprocess: string,
		Pmodelname: string,
		Pname: string,
		UserID: number,
		UserName: string,
		WHcheckeduserid: number,
		WHdate: string,
		WHid: number,
		WHischecked: boolean,
		WHmaterialwaste: number,
		Whppid: number,
		WHquantity: number,
		WHserial: number,
		WHworkwaste: number
	}
}