import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalystDevolutionComponent } from './components/analyst-devolution/analyst-devolution.component';


const routes: Routes = [
  {
    path: ':id/detail',
    component: AnalystDevolutionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystDevolutionRoutingModule { }
