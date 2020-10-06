import { CaseHigherInstanceDerivationComponent } from './components/case-higher-instance-derivation/case-higher-instance-derivation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: ':id/detail',
    component: CaseHigherInstanceDerivationComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseHigherInstanceDerivationRoutingModule { }
