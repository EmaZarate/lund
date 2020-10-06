import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalystAssignmentListComponent } from './components/analyst-assignment-list/analyst-assignment-list.component';
import { AnalystAssignmentDetailComponent } from './components/analyst-assignment-detail/analyst-assignment-detail.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '',
    component: AnalystAssignmentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':buid',
    component: AnalystAssignmentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/detail',
    component: AnalystAssignmentDetailComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystAssignmentRoutingModule { }
