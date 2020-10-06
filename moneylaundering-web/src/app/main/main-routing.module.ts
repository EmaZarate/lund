import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [

  {
    path: "home-page",
    loadChildren:
      "./home-page/home-page.module#HomePageModule"
  },

  {
    path: "analyst-assignment",
    loadChildren:
      "./analyst-assignment/analyst-assignment.module#AnalystAssignmentModule"
  },
  {
    path: "case-management",
    loadChildren:
      "./case-management/case-management.module#CaseManagementModule"
  }
  ,
  {
    path: "person-management",
    loadChildren:
      "./person-management/person.module#PersonModule"
  },
  {
    path: "analyst-re-assignment",
    loadChildren: "./analyst-re-assignment/analyst-re-assignment.module#AnalystReAssignmentModule"
  },
  {
    path: "change-expiration",
    loadChildren: "./change-expiration/change-expiration.module#ChangeExpirationModule"
  },
  {
    path: "fake-possitive",
    loadChildren: "./fake-possitive/fake-possitive.module#FakePossitiveModule"
  },
  {
    path: "case-underestimating",
    loadChildren: "./case-underestimating/case-underestimating.module#CaseUnderestimatingModule"
  },
  {
    path: "case-higher-instance-derivation",
    loadChildren: "./case-higher-instance-derivation/case-higher-instance-derivation.module#CaseHigherInstanceDerivationModule"
  },
  {
    path: "case-ending",
    loadChildren: "./case-ending/case-ending.module#CaseEndingModule"
  },
  {
    path: "analyst-devolution",
    loadChildren: "./analyst-devolution/analyst-devolution.module#AnalystDevolutionModule"
  },
  {
    path: "inify-people",
    loadChildren: "./inify-people/inify-people.module#InifyPeopleModule"
  },
  {
    path: "case-info-requirement",
    loadChildren: "./case-info-requirement/case-info-requirement.module#CaseInfoRequirementModule"
  },
  {
    path: "home",
    loadChildren: "./home-page/home-page.module#HomePageModule"
  },
  {
    path: "news",
    loadChildren: "./news-detail/news-detail.module#NewsDetailModule"
  },
  {
    path: "gray-list",
    loadChildren: "./gray-list/gray-list.module#GrayListModule"
  },
  {
    path: "link-document",
    loadChildren: "./link-document/link-document.module#LinkDocumentModule"
  },
  {
    path: "producer-management",
    loadChildren: "./producer-management/producer-management.module#ProducerManagementModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
