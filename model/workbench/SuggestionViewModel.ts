export class SuggestionViewModel {
    Id: number;
    TypeId?: number;
    Title?: string;
    Content?: string;
    AttachIds?: string;
    UserId?: number;
    PublicDeadline?: Date;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    public constructor(obj: any) {
        this.Id = obj.Id
        this.TypeId = obj.TypeId
        this.Title = obj.Title
        this.Content = obj.Content
        this.AttachIds = obj.AttachIds
        this.UserId = obj.UserId
        this.PublicDeadline = obj.PublicDeadline
        this.deletedAt = obj.deletedAt
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}

//#region SuggestionType
export class SuggestionTypeViewModel {
    Id: number;
    TypeName: string;
    constructor(obj: any) {
        this.Id = obj.Id
        this.TypeName = obj.TypeName
    }
}
//#endregion



    //#region 意见评论


    //#endregion
