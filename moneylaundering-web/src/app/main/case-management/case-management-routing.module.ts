import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseManagementListComponent } from './components/case-management-list/case-management-list.component';
import { RiskResolver } from './risk.resolver';
import { CaseGroupResolver } from './caseGroup.resolver';
import { CaseTypeResolver } from './caseType.resolver';
import { StatusResolver } from './status.resolver';
import { PersonResolver } from '../person-management/person.resolver';
import { RequestInformationComponent } from './components/request-information/request-information.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CaseManagementDetailComponent } from './components/case-management-detail/case-management-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CaseManagementListComponent,
    canActivate: [AuthGuard],
    resolve: {
      risks: RiskResolver,
      caseTypes: CaseTypeResolver,
      caseGroup: CaseGroupResolver,
      status: StatusResolver,
      person: PersonResolver  
    }
  },
  {
    path: ':buid',
    component: CaseManagementListComponent,
    canActivate: [AuthGuard],
    resolve: {
      risks: RiskResolver,
      caseTypes: CaseTypeResolver,
      caseGroup: CaseGroupResolver,
      status: StatusResolver,
      person: PersonResolver  
    }
  },
  {
    path: ':id/request-information',
    component: RequestInformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/detail',
    component: CaseManagementDetailComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseManagementRoutingModule { }
