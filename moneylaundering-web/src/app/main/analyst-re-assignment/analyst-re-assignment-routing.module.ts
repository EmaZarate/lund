import { AnalystReAssignmentComponent } from './components/analyst-re-assignment/analyst-re-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: ':id/detail',
    component: AnalystReAssignmentComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystReAssignmentRoutingModule { }
