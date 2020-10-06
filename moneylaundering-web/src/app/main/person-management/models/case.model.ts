import { Person } from '../../case-management/models/person.model';
import { BranchOffice } from '../../case-management/models/branchOffice.model';
import { Status } from '../../case-management/models/status';
import { CaseType } from '../../case-management/models/caseType';
import { News } from '../../case-management/models/news';
import { Risk } from '../../case-management/models/risk.model';

export class Case {
    id: number;
    businessUnitId: number;
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
    contactLocationId: number;
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
    expirationDays: expirationDay
}

enum expirationDay {
    white = 0,
    green = 1,
    yellow = 2,
    red = 3
}