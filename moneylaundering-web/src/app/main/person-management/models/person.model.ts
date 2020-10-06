import { PersonBusinessUnit } from 'src/app/main/person-management/models/personBusinessUnits.model';
import { grayList } from 'src/app/main/person-management/models/grayList.model';
import { BusinessUnit } from '../../../shared/models/businessUnit.model';
import { location } from 'src/app/main/person-management/models/location.model';

export class Person {
  id: number;
  personKey: string;
  businessUnitId: number;
  businessUnit: BusinessUnit
  cuit: string;
  lastName: string;
  firstName: string;
  fullName?: string;
  active: boolean;
  creationDate: Date;
  updateDocumentDate: string;
  pep: boolean;
  pepSystem: boolean;
  registerUIF: boolean;
  terrorist: boolean;
  checkListDate: string;
  personType: string;
  mail: string;
  activityId: number;
  locationId: number;
  address: string;
  officialTypeId: string;
  taxId: number;
  nationality: string;
  birthDate: string;
  maritalstatus: string;
  phoneNumber: string;
  thirdParty: boolean;
  groupCode: number;
  group: boolean;
  zipCode: number;
  registrationDate: string;
  registrationNumber: string;
  personBusinessUnits: PersonBusinessUnit[];
  grayLists: grayList[];
  save: boolean;
  location: location;
}



