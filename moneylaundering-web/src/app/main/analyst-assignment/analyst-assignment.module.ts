import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalystAssignmentRoutingModule } from './analyst-assignment-routing.module';
import { AnalystAssignmentListComponent } from './components/analyst-assignment-list/analyst-assignment-list.component';
import { GridModule, SelectModule, TitleModule, ButtonModule, CheckboxModule, FilterBoxModule, InputModule,PendingChangesWarningModalModule, ModalModule } from '@sc/portal.fe.lib.ui-core-components';
import { AnalystAssignmentDetailComponent } from './components/analyst-assignment-detail/analyst-assignment-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AnalystAssignmentListComponent, 
    AnalystAssignmentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnalystAssignmentRoutingModule,
    GridModule,
    SelectModule,
    CheckboxModule,
    TitleModule,
    ButtonModule,
    SharedModule,
    FilterBoxModule,
    InputModule,
    PendingChangesWarningModalModule,
    ModalModule
  ]
})
export class AnalystAssignmentModule { }
