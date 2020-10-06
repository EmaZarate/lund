export class DocumentAttached {
    documentId: number;
    versionId?: number;
    logicName?: string;
    physicalName?: string;
    documentTypeId?: number;
    documentTypeDescription?: string;
    createDate?: Date;
    expiration?: Date;
    confidential?: boolean;
    comment?:string;
}