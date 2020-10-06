export class FilterTableCaseManagement {

    firstname: string;
    surname: string;
    cuit: string;
    numberCase: number;
    analist: number;
    risks: number[];
    statuses: number[];
    caseTypes: number[];
    businessUnitId: number;
    
    constructor(){
        this.risks = [];
        this.statuses = [];
        this.caseTypes = [];
    }
}