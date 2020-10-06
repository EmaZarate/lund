import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeExpirationComponent } from './components/change-expiration/change-expiration.component';


const routes: Routes = [
  {
    path: ':id/edit',
    component: ChangeExpirationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeExpirationRoutingModule { }
