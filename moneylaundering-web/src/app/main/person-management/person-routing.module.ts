import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PersonListComponent } from "./components/person-list/person-list.component";
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonEditFormComponent } from './components/person-edit-form/person-edit-form.component';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent
  }
  ,
  {
    path: ':buid',
    component: PersonListComponent
  }
  ,
  {
    path: ':id/detail',
    component: PersonDetailComponent
  }
  ,
  {
    path: ':id/detail2',
    component: PersonDetailComponent
  }
  ,
  {
    path: ':id/detail3',
    component: PersonDetailComponent
  }
  ,
  {
    path: ':id/edit',
    component: PersonEditComponent
  }
  ,
  {
    path: ':personId/detail/:id',
    component: PersonEditFormComponent
  }  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {}
