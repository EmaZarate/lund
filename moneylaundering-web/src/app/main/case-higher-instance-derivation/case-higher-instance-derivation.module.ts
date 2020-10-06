import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaseHigherInstanceDerivationComponent } from './components/case-higher-instance-derivation/case-higher-instance-derivation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseHigherInstanceDerivationRoutingModule } from './case-higher-instance-derivation-routing.module';


@NgModule({
  declarations: [CaseHigherInstanceDerivationComponent],
  imports: [
    CaseHigherInstanceDerivationRoutingModule,
    CommonModule,
    SharedModule,
    ButtonModule
  ],
  exports: [CaseHigherInstanceDerivationComponent]
})
export class CaseHigherInstanceDerivationModule { }
