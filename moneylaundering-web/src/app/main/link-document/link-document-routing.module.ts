import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkComponentComponent } from './components/link-component/link-component.component';


const routes: Routes = [
  {
    path:':idPerson/:idCase',
    component: LinkComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkDocumentRoutingModule { }
