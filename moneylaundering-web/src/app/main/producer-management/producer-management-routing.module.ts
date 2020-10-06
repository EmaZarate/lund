import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProducerManagementListComponent } from './components/producer-management-list/producer-management-list.component';
import { ProducerManagementDetailComponent } from './components/producer-management-detail/producer-management-detail.component';


const routes: Routes = [
  {
    path:'',
    component:ProducerManagementListComponent
  },
  {
    path:':id',
    component:ProducerManagementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerManagementRoutingModule { }
