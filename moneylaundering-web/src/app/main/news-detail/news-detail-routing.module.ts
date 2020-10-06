import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {NewsDetailComponent} from "./components/news-detail.component"
const routes: Routes = [
 
  
  {
    path: ':id/detail',
    component: NewsDetailComponent
  }
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsDetailRoutingModule {}
