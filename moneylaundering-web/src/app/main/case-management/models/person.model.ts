import { PersonBusinessUnit } from './personBusinessUnit.model';
import { GrayList } from './grayList.model';

export class Person {
    id: number;
    personKey: string;
    businessUnitId: number;
    personBusinessUnits: PersonBusinessUnit[];
    cuit: string;
    lastName: string;
    firstName: string;
    active: boolean;
    creationDate: string;
    updateDocumentDate: string;
    pep: boolean;
    pepSystem: boolean;
    registerUIF: boolean;
    terrorist: boolean;
    checkListDate: string;
    grayLists: GrayList[];
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
}