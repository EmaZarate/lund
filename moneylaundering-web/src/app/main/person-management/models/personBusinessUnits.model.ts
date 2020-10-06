import { Risk } from './risk.model';
import { BusinessUnit } from 'src/app/shared/models/businessUnit.model';

export class PersonBusinessUnit {
  id: number; 
  personId: number;
  businessUnitId: number;
  financialProfile: number;
  calcRisk: number;
  assignedRisk: number;
  riskId: number;
  risk: Risk;
  businessUnit: BusinessUnit[];
  groupCode: number;
}

