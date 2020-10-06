import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './core/components/full-layout/full-layout.component';
import { MainMenuResolver } from './main/main-menu.resolver';
import { LoginComponent } from './core/components/login/login.component';
import { BusinessUnitSelectComponent } from './core/components/business-unit-select/business-unit-select.component';
import { ErrorLoginComponent } from './core/components/error-login/error-login.component';
import { UploadNewDocumentComponent } from './shared/components/upload-new-document/upload-new-document.component';
import { BusinessUnitResolver } from './shared/services/businessUnit.resolver';
import { HomeComponent } from './main/home-page/components/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    
    path: '',
    component: FullLayoutComponent,
    resolve: { menu: MainMenuResolver },
    children: [
      {
        path: '',
        loadChildren: './main/main.module#MainModule'
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {businessUnits: BusinessUnitResolver}
  },
  {
    path: 'business-unit-select',
    component: BusinessUnitSelectComponent
  },

  {
    path: 'error-login',
    component: ErrorLoginComponent
  },  
  {
    path: 'document',
    component: UploadNewDocumentComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
