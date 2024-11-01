export class FileInfoDto {
    OriginalName: string;    //原始名称
    FileName: string;        //上传后，自动修改过的名称
    MimeType?: string;       //类型
    Size?: number;              //大小
    Path: string;              //保存的完整路径
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    fileInfo?:string;
    public constructor(obj: any) {
        this.OriginalName = obj.OriginalName;
        this.FileName = obj.FileName;
        this.MimeType = obj.MimeType;
        this.Size = obj.Size;
        this.Path = obj.Path;
        this.fileInfo =obj.fileInfo;
    }
}
