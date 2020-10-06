import { CaseManagementService } from './case-management.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CaseGroup } from './models/caseGroup';


@Injectable({
    providedIn: 'root',
})
export class CaseGroupResolver implements Resolve<any> {

    constructor(private caseManagementService: CaseManagementService) { }

    resolve(): Observable<CaseGroup[]> {
        return this.caseManagementService.getCaseGroup();
    }
}