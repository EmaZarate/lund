import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CaseInfoRequirementComponent } from './components/case-info-requirement/case-info-requirement.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { 
    path: ':id/detail',
    component: CaseInfoRequirementComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseInfoRequirementRoutingModule { }
