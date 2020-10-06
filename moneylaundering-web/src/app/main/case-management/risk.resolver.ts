import { CaseManagementService } from './case-management.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Risk } from './models/risk.model';
import { RiskService } from '../person-management/risk.service';

@Injectable({
    providedIn: 'root',
})
export class RiskResolver implements Resolve<any> {

    constructor(private riskService: RiskService) { }

    resolve(): Observable<Risk[]> {
        return this.riskService.getAll();
    }
}