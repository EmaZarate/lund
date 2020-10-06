import { DocumentEvidence } from './documentEvidence';


export class Document{
    documentId:number;
    personId: number;
    personOrignalId: number;
    logicName: string;
    documentEvidence: DocumentEvidence;
    documentTypeId: number;
    versionId: number;
    comment: string;
    confidential: boolean;
    caseId: number;
    businessUnit: number;
    expiration: string;

    constructor(){
        this.confidential= false;
    }
}