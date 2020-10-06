
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../person-management/models/person.model';
import { PersonService } from '../person-management/person.service';
import { FilterTablePersonManagement } from '../person-management/models/filterTablePersonManagement';

@Injectable({
    providedIn: 'root',
})
export class PersonByIdResolver implements Resolve<any> {

    constructor(private PersonService: PersonService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Person> {
        return this.PersonService.getById(+route.paramMap.get('id'));
    }
}