
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../person-management/models/person.model';
import { PersonService } from '../person-management/person.service';
import { FilterTablePersonManagement } from '../person-management/models/filterTablePersonManagement';

@Injectable({
    providedIn: 'root',
})
export class PersonResolver implements Resolve<any> {

    constructor(private PersonService: PersonService) { }

    resolve(): Observable<Person[]> {        
        var filter = new FilterTablePersonManagement();
        var buid : number = parseInt(localStorage.getItem('businessUnitId'));
        buid = isNaN(buid) ? 1 : buid;        
        filter = {cuit: '',  fullName: '', riskId: 0, tranBefore: '', tranAfter: '', orderId: 0, businessUnitId: buid, group: false, getWithoutGrouping: true, groupCode:0};
        return this.PersonService.getByFilter(filter);
    }
}