import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InifyPeopleListComponent } from './components/inify-people-list/inify-people-list.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PersonResolver } from './inify-people.resolver';
import { InifyPeopleComponent } from './components/inify-people/inify-people.component';
import { AddPersonUnificationComponent } from './components/add-person-unification/add-person-unification.component';
import { PersonByIdResolver } from './getPersonByID.resolver';


const routes: Routes = [
  {
    path:'',
    component: InifyPeopleListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: InifyPeopleComponent,
    canActivate: [AuthGuard],
    resolve:{
      people: PersonResolver 
    }
  },
  {
    path: 'edit-group/:id',
    component: InifyPeopleComponent,
    canActivate: [AuthGuard],
    resolve:{
      person : PersonByIdResolver
    },
    data:{
      read: false,
    }
  },
  {
    path: 'read-group/:id',
    component: InifyPeopleComponent,
    canActivate: [AuthGuard],
    resolve:{
      person : PersonByIdResolver
    },
    data:{
      read: true,
    }
  },
  {
    path: 'add-person',
    component: AddPersonUnificationComponent,
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InifyPeopleRoutingModule { }
