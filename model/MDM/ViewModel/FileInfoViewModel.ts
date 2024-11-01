export class FileInfoViewModel {
    Id: number;
    OriginalName: string;
    FileName: string;
    MimeType?: string;
    Size?: number;

    public constructor(obj: any) {
        this.Id = obj.Id;
        this.OriginalName = obj.OriginalName;
        this.FileName = obj.FileName;
        this.MimeType = obj.MimeType;
        this.Size = obj.Size;
    }
}
