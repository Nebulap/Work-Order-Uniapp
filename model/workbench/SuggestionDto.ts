export class SuggestionSubmitDto {
	TypeId : number;
	Title : string;
	Content : string;
	AttachIds ?: string;
	UserId : number;
	PublicDeadline ?: Date;
	deletedAt ?: Date;
	createdAt ?: Date;
	updatedAt ?: Date;

	public constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!obj.TypeId) {
			throw new Error('创建SuggestionSubmitDto对象失败：TypeId不能为空')
		}
		if (!obj.Title) {
			throw new Error('创建SuggestionSubmitDto对象失败：Title不能为空')
		}
		if (!obj.Content) {
			throw new Error('创建SuggestionSubmitDto对象失败：Content不能为空')
		}
		this.TypeId = obj.TypeId
		this.Title = obj.Title
		this.Content = obj.Content
		this.AttachIds = obj.AttachIds
		this.UserId = obj.UserId
		this.PublicDeadline = obj.PublicDeadline
	}
}


export class UpdataSuggestionByIdDto {
	PublicDeadline : string;
	Id : string
	constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!obj.PublicDeadline) {
			throw new Error('创建UpdataSuggestionByIdDto对象失败：PublicDeadline不能为空')
		}
		if (!obj.Id) {
			throw new Error('创建UpdataSuggestionByIdDto对象失败：Id不能为空')
		}
		this.PublicDeadline = obj.PublicDeadline
		this.Id = obj.Id
	}
}

export class GetSuggestionByUserIdDto {
	UserId : string;
	constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!obj.UserId) {
			throw new Error('创建GetSuggestionByUserIdDto对象失败：UserId不能为空')
		}
		this.UserId = obj.UserId
	}
}


export class GetApprovalBySuggestionIdDto {
	Id : number;
	constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!obj.Id) {
			throw new Error('创建GetApprovalBySuggestionIdDto对象失败：Id不能为空')
		}
		this.Id = obj.Id
	}
}
export class GetSuggestionExecuteByUserIdDto {
	Id : number;
	constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!obj.Id) {
			throw new Error('创建GetSuggestionExecuteByUserIdDto对象失败：Id不能为空')
		}
		this.Id = obj.Id
	}
}

export class DeleteSuggestionDto {
	Id : number;
	constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!obj.Id) {
			throw new Error('创建DeleteSuggestion对象失败：Id不能为空')
		}
		this.Id = obj.Id
	}
}
//#region SuggestionType
export class SuggestionTypeAddDto {
	TypeName : string;
	constructor(obj : any) {
		this.TypeName = obj.TypeName
	}
}


export class SuggestionTypeDto {
	Id : number;
	TypeName : string;
	constructor(obj : any) {
		this.Id = obj.Id
		this.TypeName = obj.TypeName
	}
}

export class SuggestionTypeDeleteDto {
	Id : number;
	mode : string;
	constructor(obj : any) {
		this.Id = obj.Id
		this.mode = obj.mode
	}
}

//#endregion

export class SuggestionCommentsAddDto {
	Star ?: number;
	Comments ?: string;
	UserId ?: number;
	SuggestionId ?: number;
	constructor(obj : any) {
		if (!!!obj) {
			throw new Error(`创建${this.constructor.name.toString()}对象失败：未携带任何参数`)
		}
		if (!obj.Star) {
			throw new Error('创建SuggestionCommentsAddDto对象失败：Star不能为空')
		} if (!obj.Comments) {
			throw new Error('创建SuggestionCommentsAddDto对象失败：Comments不能为空')
		} if (!obj.SuggestionId) {
			throw new Error('创建SuggestionCommentsAddDto对象失败：SuggestionId不能为空')
		}
		this.Star = obj.Star
		this.Comments = obj.Comments
		this.UserId = obj.UserId
		this.SuggestionId = obj.SuggestionId
	}
}/*  */

//#region 意见评论

//#endregion

//#region 意见审批
export class SuggestionProcessingResultDto {
	SuggestionId : number;
	State ?: number;
	SuggestionResultId ?: number;
	UserId ?: number;
	IsPublic ?: number;
	Star ?: number;
	Comment ?: string;
	ExecuteUserId ?: number;
	createdAt ?: Date;
	deletedAt ?: Date;
	updatedAt ?: Date;

	constructor(obj : any) {
		this.SuggestionId = obj.SuggestionId;
		this.State = obj.State;
		this.SuggestionResultId = obj.SuggestionResultId;
		this.UserId = obj.UserId;
		this.IsPublic = obj.IsPublic;
		this.Star = obj.Star;
		this.Comment = obj.Comment;
		this.ExecuteUserId = obj.ExecuteUserId;
	}
}

//#endregion


export class SuggestionResultDto {
	SuggestionResults : string;

	constructor(obj : any) {
		this.SuggestionResults = obj.SuggestionResults;
	}
}


export class SuggestionExecuteDto {
	SuggestionId : number;
	Content ?: string;
	ExecuteUserId : number
	AttachIds ?: string;

	constructor(obj : any) {
		this.SuggestionId = obj.SuggestionId;
		this.Content = obj.Content;
		this.ExecuteUserId = obj.ExecuteUserId;
		this.AttachIds = obj.AttachIds;
	}
}

export class SuggestionExecuteCommentDto {
	Comment ?: string;
	ExecuteId ?: number;
	Star ?: number;
	UserId ?: number;

	constructor(obj : any) {
		this.Comment = obj.Comment
		this.ExecuteId = obj.ExecuteId
		this.Star = obj.Star
		this.UserId = obj.UserId
	}
}



export enum enumSuggestionResultId {
	同意该意见 = 1,
	需进一步商榷 = 2,
}