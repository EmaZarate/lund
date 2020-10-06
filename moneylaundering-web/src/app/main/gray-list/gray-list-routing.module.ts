import { GrayListDetailComponent } from './components/gray-list-detail/gray-list-detail.component';
import { GrayListGridComponent } from './components/gray-list-grid/gray-list-grid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: GrayListGridComponent
  },
  {
    path: ':id/detail',
    component: GrayListDetailComponent
  },
  {
    path: ':id/edit',
    component: GrayListDetailComponent
  },
  {
    path: 'new',
    component: GrayListDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrayListRoutingModule { }
