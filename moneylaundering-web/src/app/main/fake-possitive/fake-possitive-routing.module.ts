import { NgModule } from '@angular/core';
import { FakePossitiveComponent } from './components/fake-possitive/fake-possitive.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id/edit',
    component: FakePossitiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FakePossitiveRoutingModule { }
