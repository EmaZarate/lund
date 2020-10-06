import { GrayListDocument } from './gray-list-documents.model';
import { Person } from 'src/app/main/person-management/models/person.model';
export class GrayList {
    id: number;
    comments: string;
    active: boolean;
    creationDate: Date;
    personId: number;
    person: Person
    documents: GrayListDocument;
    fullName?: string;
}