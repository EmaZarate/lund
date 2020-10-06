import { BusinessUnit } from '../../case-info-requirement/models/businessUnit.model';
export class Producer{
    id: number;
    businessUnitId: number;
    produceName: string;
    mail: string;
    originCode:string;
    businessUnit: BusinessUnit
}