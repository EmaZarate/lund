import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaseUnderestimatingComponent } from './components/case-underestimating/case-underestimating.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseUnderestimatingRoutingModule } from './case-underestimating-routing.module';


@NgModule({
  declarations: [CaseUnderestimatingComponent],
  imports: [
    CommonModule,
    CaseUnderestimatingRoutingModule,
    SharedModule,
    ButtonModule
  ],
  exports:[CaseUnderestimatingComponent]
})
export class CaseUnderestimatingModule { }
