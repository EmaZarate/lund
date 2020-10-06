import { CaseManagementService } from './case-management.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Status } from './models/status';


@Injectable({
    providedIn: 'root',
})
export class StatusResolver implements Resolve<any> {

    constructor(private caseManagementService: CaseManagementService) { }

    resolve(): Observable<Status[]> {
        return this.caseManagementService.getStatus();
    }
}