import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule, FilterBoxModule, InputModule, CheckboxModule, ButtonModule, RadioModule, TitleModule, SelectModule, TextareaModule, PaginationModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrayListRoutingModule } from './gray-list-routing.module';
import { GrayListGridComponent } from './components/gray-list-grid/gray-list-grid.component';
import { GrayListDetailComponent } from './components/gray-list-detail/gray-list-detail.component';


@NgModule({
  declarations: [
    GrayListGridComponent, 
    GrayListDetailComponent
  ],
  imports: [
    CommonModule,
    GrayListRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    FilterBoxModule,
    InputModule,
    RadioModule,
    ButtonModule,
    TitleModule,
    SelectModule,
    TextareaModule,
    PaginationModule
  ]
})
export class GrayListModule { }
