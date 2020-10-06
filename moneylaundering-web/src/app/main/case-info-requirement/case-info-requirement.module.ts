import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaseInfoRequirementRoutingModule } from './case-info-requirement-routing.module';
import { CaseInfoRequirementComponent } from './components/case-info-requirement/case-info-requirement.component';



@NgModule({
  declarations: [CaseInfoRequirementComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    CaseInfoRequirementRoutingModule
  ],
  exports:[CaseInfoRequirementComponent]

})
export class CaseInfoRequirementModule { }
