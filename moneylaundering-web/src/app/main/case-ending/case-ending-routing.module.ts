import { CaseEndingComponent } from './components/case-ending/case-ending.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: ':id/detail',
    component: CaseEndingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseEndingRoutingModule { }
