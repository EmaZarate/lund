import { Person } from './person.model';
import { BranchOffice } from './branchOffice.model';
import { Status } from './status.model';
import { CaseType } from './caseType.model';
import { News } from './news.model';
import { Risk } from './risk.model';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { CaseDocument } from './caseDocument.model';
import { BusinessUnit } from './businessUnit.model';

export class Case {
    id: number;
    businessUnitId: number;
    businessUnit: BusinessUnit;
    branchOfficeId: number;
    caseTypeId: number;
    actualStageId: number;
    statusId: number;
    risk: Risk;
    analystId: string;
    createDate: Date;
    comment: string;
    updateFile: boolean;
    contactMail: string;
    contactAddress: string;
    contactZipCode: number;
    contactCity: string;
    contactStateId: number;
    producerId: number;
    personId: number;
    person: Person;
    originalPersonId: number;
    branchOffice: BranchOffice;
    remainingDays: Date;
    value: number;
    status: Status;
    caseType: CaseType;
    news: News;
    newsList: News[];
    expirationDays: expirationDay;
    caseDocuments: CaseDocument[];
}

enum expirationDay {
    white = 0,
    green = 1,
    yellow = 2,
    red = 3
}