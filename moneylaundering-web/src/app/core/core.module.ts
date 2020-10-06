import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarModule, LateralMenuModule, ScrollService, ScTableModule, ButtonModule, SelectModule } from '@sc/portal.fe.lib.ui-core-components';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorLoginComponent } from './components/error-login/error-login.component';
import { BusinessUnitSelectComponent } from './components/business-unit-select/business-unit-select.component';


@NgModule({
  declarations: [
    FullLayoutComponent, 
    LoginComponent, 
    ErrorLoginComponent, BusinessUnitSelectComponent,
  ],

  imports: [
    RouterModule,
    CommonModule,
    NavbarModule,
    LateralMenuModule,
    ScTableModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ScrollService
  ]
})
export class CoreModule { }
