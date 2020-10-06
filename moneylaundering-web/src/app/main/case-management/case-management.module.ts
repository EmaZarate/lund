import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, SelectModule, TitleModule, ButtonModule, CheckboxModule, FilterBoxModule, InputModule, ModalModule } from '@sc/portal.fe.lib.ui-core-components';
import { CaseManagementRoutingModule } from './case-management-routing.module';
import { CaseManagementListComponent } from './components/case-management-list/case-management-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestInformationComponent } from './components/request-information/request-information.component';
import { CaseManagementDetailComponent } from './components/case-management-detail/case-management-detail.component';


@NgModule({
  declarations: [CaseManagementListComponent, RequestInformationComponent, CaseManagementDetailComponent],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    SelectModule,
    CheckboxModule,
    TitleModule,
    ButtonModule,
    FilterBoxModule,
    InputModule,
    SharedModule,  
    ModalModule
  ]
})
export class CaseManagementModule { }
