import { CaseUnderestimatingComponent } from './components/case-underestimating/case-underestimating.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: ':id/detail',
    component: CaseUnderestimatingComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseUnderestimatingRoutingModule { }
