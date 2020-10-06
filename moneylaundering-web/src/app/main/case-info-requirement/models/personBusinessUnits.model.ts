import { Risk } from './risk.model';

export class PersonBusinessUnit {
  id: number; 
  personId: number;
  businessUnitId: number;
  financialProfile: number;
  calcRisk: number;
  assignedRisk: number;
  riskId: number;
  risk: Risk;
}

