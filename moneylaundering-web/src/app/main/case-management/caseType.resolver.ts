import { CaseManagementService } from './case-management.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CaseType } from './models/caseType';


@Injectable({
    providedIn: 'root',
})
export class CaseTypeResolver implements Resolve<any> {

    constructor(private caseManagementService: CaseManagementService) { }

    resolve(): Observable<CaseType[]> {
        return this.caseManagementService.getCaseType();
    }
}