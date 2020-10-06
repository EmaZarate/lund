import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessUnit } from '../models/businessUnit.model';
import { SelectBusinessuinitService } from './select-businessuinit.service';

@Injectable({
    providedIn: 'root',
})
export class BusinessUnitResolver implements Resolve<any> {

    constructor(private businessUnitService: SelectBusinessuinitService) { }

    resolve(): Observable<BusinessUnit[]> {
        return this.businessUnitService.getBusinessUnit();
    }
}