import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalystReAssignmentComponent } from './components/analyst-re-assignment/analyst-re-assignment.component';
import { AnalystReAssignmentRoutingModule } from './analyst-re-assignment-routing.module';



@NgModule({
  declarations: [
    AnalystReAssignmentComponent
  ],
  imports: [
    CommonModule,
    AnalystReAssignmentRoutingModule,
    SharedModule,
    ButtonModule
  ],
  exports: [
    AnalystReAssignmentComponent
  ]
})
export class AnalystReAssignmentModule { }
