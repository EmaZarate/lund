import { DocumentAttached } from 'src/app/shared/models/document-attached.model';

export class GrayListDocument {
    id: number;
    grayListId: number;
    documentId: number;
    document: DocumentAttached;
}