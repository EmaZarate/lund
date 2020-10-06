import { Analyst } from './../../case-management/models/analyst.model';
import { Person } from '../../case-management/models/person.model';
import { BranchOffice } from '../../case-management/models/branchOffice.model';
import { Status } from '../../case-management/models/status';
import { CaseType } from '../../case-management/models/caseType';
import { News } from '../../case-management/models/news';
import { Risk } from '../../case-management/models/risk.model';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { CaseDocument } from './caseDocument.model';
import { BusinessUnit } from '../../../shared/models/businessUnit.model';

export interface Case {
    id: number;
    businessUnitId: number;
    businessUnit: BusinessUnit;
    branchOfficeId: number;
    caseTypeId: number;
    actualStageId: number;
    statusId: number;
    risk: Risk;
    analyst: Analyst;
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
   contactProvince: string;
   caseNumber: number;
}

enum expirationDay {
    white = 0,
    green = 1,
    yellow = 2,
    red = 3
}