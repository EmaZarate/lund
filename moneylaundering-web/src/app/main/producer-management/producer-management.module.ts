import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducerManagementRoutingModule } from './producer-management-routing.module';
import { ProducerManagementListComponent } from './components/producer-management-list/producer-management-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule, CheckboxModule, TitleModule, FilterBoxModule, InputModule, ButtonModule, ModalModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProducerManagementDetailComponent } from './components/producer-management-detail/producer-management-detail.component';


@NgModule({
  declarations: [ProducerManagementListComponent, ProducerManagementDetailComponent],
  imports: [
    CommonModule,
    ProducerManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    CheckboxModule,
    SharedModule,
    TitleModule,
    FilterBoxModule,
    InputModule,
    ButtonModule,
    ModalModule
  ]
})
export class ProducerManagementModule { }
