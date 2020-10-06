import { DocumentAttached } from 'src/app/shared/models/document-attached.model';

export class CaseDocument {
    caseId: number;
    documentId: number;
    document: DocumentAttached;
    businessUnitID: number
}
