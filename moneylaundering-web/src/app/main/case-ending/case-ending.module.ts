import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseEndingRoutingModule } from './case-ending-routing.module';
import { CaseEndingComponent } from './components/case-ending/case-ending.component';


@NgModule({
  declarations: [CaseEndingComponent],
  imports: [
    CommonModule,
    CaseEndingRoutingModule,
    SharedModule,
    ButtonModule
  ],
  exports: [
    CaseEndingComponent
  ]
})
export class CaseEndingModule { }
